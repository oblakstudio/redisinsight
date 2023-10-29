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
exports.WorkbenchCommandsExecutor = void 0;
const common_1 = require("@nestjs/common");
const cli_dto_1 = require("../../cli/dto/cli.dto");
const cli_helper_1 = require("../../../utils/cli-helper");
const errors_1 = require("../../cli/constants/errors");
const constants_1 = require("../../../constants");
const create_command_execution_dto_1 = require("../dto/create-command-execution.dto");
const redis_tool_service_1 = require("../../redis/redis-tool.service");
const transformers_1 = require("../../../common/transformers");
const workbench_analytics_service_1 = require("../services/workbench-analytics/workbench-analytics.service");
let WorkbenchCommandsExecutor = class WorkbenchCommandsExecutor {
    constructor(redisTool, analyticsService) {
        this.redisTool = redisTool;
        this.analyticsService = analyticsService;
        this.logger = new common_1.Logger('WorkbenchCommandsExecutor');
        this.formatterManager = new transformers_1.FormatterManager();
        this.formatterManager.addStrategy(transformers_1.FormatterTypes.UTF8, new transformers_1.UTF8FormatterStrategy());
        this.formatterManager.addStrategy(transformers_1.FormatterTypes.ASCII, new transformers_1.ASCIIFormatterStrategy());
    }
    async sendCommand(clientMetadata, dto) {
        let result;
        let command = constants_1.unknownCommand;
        let commandArgs = [];
        const { command: commandLine, role, nodeOptions, mode, } = dto;
        try {
            [command, ...commandArgs] = (0, cli_helper_1.splitCliCommandLine)(commandLine);
            if (nodeOptions) {
                result = [await this.sendCommandForSingleNode(clientMetadata, command, commandArgs, role, mode, nodeOptions)];
            }
            else if (role) {
                result = await this.sendCommandForNodes(clientMetadata, command, commandArgs, role, mode);
            }
            else {
                result = [await this.sendCommandForStandalone(clientMetadata, command, commandArgs, mode)];
            }
            this.analyticsService.sendCommandExecutedEvents(clientMetadata.databaseId, result, { command, rawMode: mode === create_command_execution_dto_1.RunQueryMode.Raw });
            return result;
        }
        catch (error) {
            this.logger.error('Failed to execute workbench command.', error);
            const errorResult = { response: error.message, status: cli_dto_1.CommandExecutionStatus.Fail };
            this.analyticsService.sendCommandExecutedEvent(clientMetadata.databaseId, { ...errorResult, error }, { command, rawMode: dto.mode === create_command_execution_dto_1.RunQueryMode.Raw });
            if (error instanceof errors_1.CommandParsingError
                || error instanceof errors_1.CommandNotSupportedError
                || error.name === 'ReplyError') {
                return [errorResult];
            }
            if (error instanceof errors_1.WrongDatabaseTypeError || error instanceof errors_1.ClusterNodeNotFoundError) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async sendCommandForStandalone(clientMetadata, command, commandArgs, mode) {
        this.logger.log('Executing workbench command.');
        const formatter = this.getFormatter(mode);
        const replyEncoding = (0, cli_helper_1.checkHumanReadableCommands)(`${command} ${commandArgs[0]}`) ? 'utf8' : undefined;
        const response = formatter.format(await this.redisTool.execCommand(clientMetadata, command, commandArgs, replyEncoding));
        this.logger.log('Succeed to execute workbench command.');
        return { response, status: cli_dto_1.CommandExecutionStatus.Success };
    }
    async sendCommandForSingleNode(clientMetadata, command, commandArgs, role = cli_dto_1.ClusterNodeRole.All, mode = create_command_execution_dto_1.RunQueryMode.ASCII, nodeOptions) {
        this.logger.log(`Executing redis.cluster CLI command for single node ${JSON.stringify(nodeOptions)}`);
        const formatter = this.getFormatter(mode);
        const replyEncoding = (0, cli_helper_1.checkHumanReadableCommands)(`${command} ${commandArgs[0]}`) ? 'utf8' : undefined;
        const nodeAddress = `${nodeOptions.host}:${nodeOptions.port}`;
        let result = await this.redisTool.execCommandForNode(clientMetadata, command, commandArgs, role, nodeAddress, replyEncoding);
        if (result.error && (0, cli_helper_1.checkRedirectionError)(result.error) && nodeOptions.enableRedirection) {
            const { slot, address } = (0, cli_helper_1.parseRedirectionError)(result.error);
            result = await this.redisTool.execCommandForNode(clientMetadata, command, commandArgs, role, address, replyEncoding);
            result.slot = parseInt(slot, 10);
        }
        const { host, port, error, slot, ...rest } = result;
        return {
            ...rest,
            response: formatter.format(rest.response),
            node: { host, port, slot },
        };
    }
    async sendCommandForNodes(clientMetadata, command, commandArgs, role, mode = create_command_execution_dto_1.RunQueryMode.ASCII) {
        this.logger.log(`Executing redis.cluster CLI command for [${role}] nodes.`);
        const formatter = this.getFormatter(mode);
        const replyEncoding = (0, cli_helper_1.checkHumanReadableCommands)(`${command} ${commandArgs[0]}`) ? 'utf8' : undefined;
        return (await this.redisTool.execCommandForNodes(clientMetadata, command, commandArgs, role, replyEncoding)).map((nodeExecReply) => {
            const { response, status, host, port, } = nodeExecReply;
            return {
                response: formatter.format(response),
                status,
                node: { host, port },
            };
        });
    }
    getFormatter(mode) {
        switch (mode) {
            case create_command_execution_dto_1.RunQueryMode.Raw:
                return this.formatterManager.getStrategy(transformers_1.FormatterTypes.UTF8);
            case create_command_execution_dto_1.RunQueryMode.ASCII:
            default: {
                return this.formatterManager.getStrategy(transformers_1.FormatterTypes.ASCII);
            }
        }
    }
};
WorkbenchCommandsExecutor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_tool_service_1.RedisToolService,
        workbench_analytics_service_1.WorkbenchAnalyticsService])
], WorkbenchCommandsExecutor);
exports.WorkbenchCommandsExecutor = WorkbenchCommandsExecutor;
