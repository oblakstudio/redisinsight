"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkbenchService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const workbench_commands_executor_1 = require("./providers/workbench-commands.executor");
const create_command_execution_dto_1 = require("./dto/create-command-execution.dto");
const cli_helper_1 = require("../../utils/cli-helper");
const error_messages_1 = require("../../constants/error-messages");
const cli_dto_1 = require("../cli/dto/cli.dto");
const command_execution_repository_1 = require("./repositories/command-execution.repository");
const database_client_factory_1 = require("../database/providers/database.client.factory");
const getUnsupportedCommands_1 = require("./utils/getUnsupportedCommands");
const workbench_analytics_service_1 = require("./services/workbench-analytics/workbench-analytics.service");
let WorkbenchService = class WorkbenchService {
    constructor(databaseClientFactory, commandsExecutor, commandExecutionRepository, analyticsService) {
        this.databaseClientFactory = databaseClientFactory;
        this.commandsExecutor = commandsExecutor;
        this.commandExecutionRepository = commandExecutionRepository;
        this.analyticsService = analyticsService;
    }
    async createCommandExecution(client, dto) {
        const commandExecution = {
            ...(0, lodash_1.omit)(dto, 'commands'),
            db: await client.getCurrentDbIndex(),
            databaseId: client.clientMetadata.databaseId,
        };
        const command = (0, cli_helper_1.multilineCommandToOneLine)(dto.command);
        const deprecatedCommand = this.findCommandInBlackList(command);
        if (deprecatedCommand) {
            commandExecution.result = [
                {
                    response: error_messages_1.default.WORKBENCH_COMMAND_NOT_SUPPORTED(deprecatedCommand.toUpperCase()),
                    status: cli_dto_1.CommandExecutionStatus.Fail,
                },
            ];
        }
        else {
            const startCommandExecutionTime = process.hrtime.bigint();
            commandExecution.result = await this.commandsExecutor.sendCommand(client, { ...dto, command });
            const endCommandExecutionTime = process.hrtime.bigint();
            commandExecution.executionTime = Math.round((Number(endCommandExecutionTime - startCommandExecutionTime) / 1000));
        }
        return commandExecution;
    }
    async createCommandsExecution(client, dto, commands, onlyErrorResponse = false) {
        const commandExecution = {
            ...dto,
            db: await client.getCurrentDbIndex(),
            databaseId: client.clientMetadata.databaseId,
        };
        const startCommandExecutionTime = process.hrtime.bigint();
        const executionResults = await Promise.all(commands.map(async (singleCommand) => {
            const command = (0, cli_helper_1.multilineCommandToOneLine)(singleCommand);
            const deprecatedCommand = this.findCommandInBlackList(command);
            if (deprecatedCommand) {
                return ({
                    command,
                    response: error_messages_1.default.WORKBENCH_COMMAND_NOT_SUPPORTED(deprecatedCommand.toUpperCase()),
                    status: cli_dto_1.CommandExecutionStatus.Fail,
                });
            }
            const result = await this.commandsExecutor.sendCommand(client, { ...dto, command });
            return ({ ...result[0], command });
        }));
        const executionTimeInNanoseconds = process.hrtime.bigint() - startCommandExecutionTime;
        if (Number(executionTimeInNanoseconds) !== 0) {
            commandExecution.executionTime = Math.round(Number(executionTimeInNanoseconds) / 1000);
        }
        const successCommands = executionResults.filter((command) => command.status === cli_dto_1.CommandExecutionStatus.Success);
        const failedCommands = executionResults.filter((command) => command.status === cli_dto_1.CommandExecutionStatus.Fail);
        commandExecution.summary = {
            total: executionResults.length,
            success: successCommands.length,
            fail: failedCommands.length,
        };
        commandExecution.command = commands.join('\r\n');
        commandExecution.result = [{
                status: cli_dto_1.CommandExecutionStatus.Success,
                response: onlyErrorResponse ? failedCommands : executionResults,
            }];
        return commandExecution;
    }
    async createCommandExecutions(clientMetadata, dto) {
        const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
        if (dto.resultsMode === create_command_execution_dto_1.ResultsMode.GroupMode || dto.resultsMode === create_command_execution_dto_1.ResultsMode.Silent) {
            return this.commandExecutionRepository.createMany([await this.createCommandsExecution(client, dto, dto.commands, dto.resultsMode === create_command_execution_dto_1.ResultsMode.Silent)]);
        }
        const commandExecutions = await Promise.all(dto.commands.map(async (command) => await this.createCommandExecution(client, { ...dto, command })));
        return this.commandExecutionRepository.createMany(commandExecutions);
    }
    async listCommandExecutions(databaseId) {
        return this.commandExecutionRepository.getList(databaseId);
    }
    async getCommandExecution(databaseId, id) {
        return this.commandExecutionRepository.getOne(databaseId, id);
    }
    async deleteCommandExecution(databaseId, id) {
        await this.commandExecutionRepository.delete(databaseId, id);
        this.analyticsService.sendCommandDeletedEvent(databaseId);
    }
    async deleteCommandExecutions(databaseId) {
        await this.commandExecutionRepository.deleteAll(databaseId);
    }
    findCommandInBlackList(commandLine) {
        const targetCommand = commandLine.toLowerCase();
        return (0, getUnsupportedCommands_1.getUnsupportedCommands)()
            .concat((0, cli_helper_1.getBlockingCommands)())
            .find((command) => targetCommand.startsWith(command));
    }
};
WorkbenchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory,
        workbench_commands_executor_1.WorkbenchCommandsExecutor,
        command_execution_repository_1.CommandExecutionRepository,
        workbench_analytics_service_1.WorkbenchAnalyticsService])
], WorkbenchService);
exports.WorkbenchService = WorkbenchService;
