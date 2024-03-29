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
const transformers_1 = require("../../../common/transformers");
const utils_1 = require("../../../utils");
const workbench_analytics_service_1 = require("../services/workbench-analytics/workbench-analytics.service");
let WorkbenchCommandsExecutor = class WorkbenchCommandsExecutor {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
        this.logger = new common_1.Logger('WorkbenchCommandsExecutor');
        this.formatterManager = new transformers_1.FormatterManager();
        this.formatterManager.addStrategy(transformers_1.FormatterTypes.UTF8, new transformers_1.UTF8FormatterStrategy());
        this.formatterManager.addStrategy(transformers_1.FormatterTypes.ASCII, new transformers_1.ASCIIFormatterStrategy());
    }
    async sendCommand(client, dto) {
        this.logger.log('Executing workbench command.');
        let command = constants_1.unknownCommand;
        let commandArgs = [];
        try {
            const { command: commandLine, mode } = dto;
            [command, ...commandArgs] = (0, cli_helper_1.splitCliCommandLine)(commandLine);
            const formatter = this.getFormatter(mode);
            const replyEncoding = (0, cli_helper_1.checkHumanReadableCommands)(`${command} ${commandArgs[0]}`) ? 'utf8' : undefined;
            const response = formatter.format(await client.sendCommand([command, ...commandArgs], { replyEncoding }));
            const result = [{ response, status: cli_dto_1.CommandExecutionStatus.Success }];
            this.logger.log('Succeed to execute workbench command.');
            this.analyticsService.sendCommandExecutedEvents(client.clientMetadata.databaseId, result, { command, rawMode: mode === create_command_execution_dto_1.RunQueryMode.Raw });
            if (command.toLowerCase() === 'ft.info') {
                this.analyticsService.sendIndexInfoEvent(client.clientMetadata.databaseId, (0, utils_1.getAnalyticsDataFromIndexInfo)(response));
            }
            return result;
        }
        catch (error) {
            this.logger.error('Failed to execute workbench command.', error);
            const errorResult = { response: error.message, status: cli_dto_1.CommandExecutionStatus.Fail };
            this.analyticsService.sendCommandExecutedEvent(client.clientMetadata.databaseId, { ...errorResult, error }, { command, rawMode: dto.mode === create_command_execution_dto_1.RunQueryMode.Raw });
            if (error instanceof errors_1.CommandParsingError
                || error instanceof errors_1.CommandNotSupportedError
                || error.name === 'ReplyError') {
                return [errorResult];
            }
            if (error instanceof errors_1.WrongDatabaseTypeError || error instanceof errors_1.ClusterNodeNotFoundError) {
                throw new common_1.BadRequestException(error.message);
            }
            return [errorResult];
        }
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
    __metadata("design:paramtypes", [workbench_analytics_service_1.WorkbenchAnalyticsService])
], WorkbenchCommandsExecutor);
exports.WorkbenchCommandsExecutor = WorkbenchCommandsExecutor;
