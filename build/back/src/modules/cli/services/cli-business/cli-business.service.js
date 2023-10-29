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
exports.CliBusinessService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const commands_service_1 = require("../../../commands/commands.service");
const cli_dto_1 = require("../../dto/cli.dto");
const error_messages_1 = require("../../../../constants/error-messages");
const cli_helper_1 = require("../../../../utils/cli-helper");
const errors_1 = require("../../constants/errors");
const cli_analytics_service_1 = require("../cli-analytics/cli-analytics.service");
const exceptions_1 = require("../../../encryption/exceptions");
const redis_tool_service_1 = require("../../../redis/redis-tool.service");
const getUnsupportedCommands_1 = require("../../utils/getUnsupportedCommands");
const client_not_found_error_exception_1 = require("../../../redis/exceptions/client-not-found-error.exception");
const database_recommendation_service_1 = require("../../../database-recommendation/database-recommendation.service");
const output_formatter_manager_1 = require("./output-formatter/output-formatter-manager");
const output_formatter_interface_1 = require("./output-formatter/output-formatter.interface");
const text_formatter_strategy_1 = require("./output-formatter/strategies/text-formatter.strategy");
const raw_formatter_strategy_1 = require("./output-formatter/strategies/raw-formatter.strategy");
let CliBusinessService = class CliBusinessService {
    constructor(cliTool, cliAnalyticsService, recommendationService, commandsService) {
        this.cliTool = cliTool;
        this.cliAnalyticsService = cliAnalyticsService;
        this.recommendationService = recommendationService;
        this.commandsService = commandsService;
        this.logger = new common_1.Logger('CliService');
        this.outputFormatterManager = new output_formatter_manager_1.OutputFormatterManager();
        this.outputFormatterManager.addStrategy(output_formatter_interface_1.CliOutputFormatterTypes.Text, new text_formatter_strategy_1.TextFormatterStrategy());
        this.outputFormatterManager.addStrategy(output_formatter_interface_1.CliOutputFormatterTypes.Raw, new raw_formatter_strategy_1.RawFormatterStrategy());
    }
    async getClient(clientMetadata) {
        this.logger.log('Create Redis client for CLI.');
        try {
            const uuid = await this.cliTool.createNewToolClient(clientMetadata);
            this.logger.log('Succeed to create Redis client for CLI.');
            this.cliAnalyticsService.sendClientCreatedEvent(clientMetadata.databaseId);
            return { uuid };
        }
        catch (error) {
            this.logger.error('Failed to create redis client for CLI.', error);
            this.cliAnalyticsService.sendClientCreationFailedEvent(clientMetadata.databaseId, error);
            throw error;
        }
    }
    async reCreateClient(clientMetadata) {
        this.logger.log('re-create Redis client for CLI.');
        try {
            const clientUuid = await this.cliTool.reCreateToolClient(clientMetadata);
            this.logger.log('Succeed to re-create Redis client for CLI.');
            this.cliAnalyticsService.sendClientRecreatedEvent(clientMetadata.databaseId);
            return { uuid: clientUuid };
        }
        catch (error) {
            this.logger.error('Failed to re-create redis client for CLI.', error);
            this.cliAnalyticsService.sendClientCreationFailedEvent(clientMetadata.databaseId, error);
            throw error;
        }
    }
    async deleteClient(clientMetadata) {
        this.logger.log('Deleting Redis client for CLI.');
        try {
            const affected = await this.cliTool.deleteToolClient(clientMetadata);
            this.logger.log('Succeed to delete Redis client for CLI.');
            if (affected) {
                this.cliAnalyticsService.sendClientDeletedEvent(affected, clientMetadata.databaseId);
            }
            return { affected };
        }
        catch (error) {
            this.logger.error('Failed to delete Redis client for CLI.', error);
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async sendCommand(clientMetadata, dto) {
        this.logger.log('Executing redis CLI command.');
        const { command: commandLine } = dto;
        let command = constants_1.unknownCommand;
        let args = [];
        const outputFormat = dto.outputFormat || output_formatter_interface_1.CliOutputFormatterTypes.Raw;
        try {
            const formatter = this.outputFormatterManager.getStrategy(outputFormat);
            [command, ...args] = (0, cli_helper_1.splitCliCommandLine)(commandLine);
            const replyEncoding = (0, cli_helper_1.checkHumanReadableCommands)(`${command} ${args[0]}`) ? 'utf8' : undefined;
            this.checkUnsupportedCommands(`${command} ${args[0]}`);
            this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.SEARCH_VISUALIZATION, command);
            const reply = await this.cliTool.execCommand(clientMetadata, command, args, replyEncoding);
            this.logger.log('Succeed to execute redis CLI command.');
            this.cliAnalyticsService.sendCommandExecutedEvent(clientMetadata.databaseId, {
                command,
                outputFormat,
            });
            return {
                response: formatter.format(reply),
                status: cli_dto_1.CommandExecutionStatus.Success,
            };
        }
        catch (error) {
            this.logger.error('Failed to execute redis CLI command.', error);
            if (error instanceof errors_1.CommandParsingError
                || error instanceof errors_1.CommandNotSupportedError
                || (error === null || error === void 0 ? void 0 : error.name) === 'ReplyError') {
                this.cliAnalyticsService.sendCommandErrorEvent(clientMetadata.databaseId, error, {
                    command,
                    outputFormat,
                });
                return { response: error.message, status: cli_dto_1.CommandExecutionStatus.Fail };
            }
            this.cliAnalyticsService.sendConnectionErrorEvent(clientMetadata.databaseId, error, {
                command,
                outputFormat,
            });
            if (error instanceof exceptions_1.EncryptionServiceErrorException || error instanceof client_not_found_error_exception_1.ClientNotFoundErrorException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async sendClusterCommand(clientMetadata, dto) {
        this.logger.log('Executing redis.cluster CLI command.');
        const { command, role, nodeOptions, outputFormat, } = dto;
        if (nodeOptions) {
            const result = await this.sendCommandForSingleNode(clientMetadata, command, role, nodeOptions, outputFormat);
            return [result];
        }
        return this.sendCommandForNodes(clientMetadata, command, role, outputFormat);
    }
    async sendCommandForNodes(clientMetadata, commandLine, role, outputFormat = output_formatter_interface_1.CliOutputFormatterTypes.Raw) {
        this.logger.log(`Executing redis.cluster CLI command for [${role}] nodes.`);
        let command = constants_1.unknownCommand;
        let args = [];
        try {
            const formatter = this.outputFormatterManager.getStrategy(outputFormat);
            [command, ...args] = (0, cli_helper_1.splitCliCommandLine)(commandLine);
            const replyEncoding = (0, cli_helper_1.checkHumanReadableCommands)(`${command} ${args[0]}`) ? 'utf8' : undefined;
            this.checkUnsupportedCommands(`${command} ${args[0]}`);
            this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.SEARCH_VISUALIZATION, command);
            const result = await this.cliTool.execCommandForNodes(clientMetadata, command, args, role, replyEncoding);
            return result.map((nodeExecReply) => {
                this.cliAnalyticsService.sendClusterCommandExecutedEvent(clientMetadata.databaseId, nodeExecReply, { command, outputFormat });
                const { response, status, host, port, } = nodeExecReply;
                return {
                    response: formatter.format(response),
                    status,
                    node: { host, port },
                };
            });
        }
        catch (error) {
            this.logger.error('Failed to execute redis.cluster CLI command.', error);
            if (error instanceof errors_1.CommandParsingError || error instanceof errors_1.CommandNotSupportedError) {
                this.cliAnalyticsService.sendCommandErrorEvent(clientMetadata.databaseId, error, {
                    command,
                    outputFormat,
                });
                return [
                    { response: error.message, status: cli_dto_1.CommandExecutionStatus.Fail },
                ];
            }
            this.cliAnalyticsService.sendConnectionErrorEvent(clientMetadata.databaseId, error, {
                command,
                outputFormat,
            });
            if (error instanceof exceptions_1.EncryptionServiceErrorException || error instanceof client_not_found_error_exception_1.ClientNotFoundErrorException) {
                throw error;
            }
            if (error instanceof errors_1.WrongDatabaseTypeError) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async sendCommandForSingleNode(clientMetadata, commandLine, role, nodeOptions, outputFormat = output_formatter_interface_1.CliOutputFormatterTypes.Raw) {
        this.logger.log(`Executing redis.cluster CLI command for single node ${JSON.stringify(nodeOptions)}`);
        let command = constants_1.unknownCommand;
        let args = [];
        try {
            const formatter = this.outputFormatterManager.getStrategy(outputFormat);
            [command, ...args] = (0, cli_helper_1.splitCliCommandLine)(commandLine);
            const replyEncoding = (0, cli_helper_1.checkHumanReadableCommands)(`${command} ${args[0]}`) ? 'utf8' : undefined;
            this.checkUnsupportedCommands(`${command} ${args[0]}`);
            const nodeAddress = `${nodeOptions.host}:${nodeOptions.port}`;
            this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.SEARCH_VISUALIZATION, command);
            let result = await this.cliTool.execCommandForNode(clientMetadata, command, args, role, nodeAddress, replyEncoding);
            if ((result === null || result === void 0 ? void 0 : result.error) && (0, cli_helper_1.checkRedirectionError)(result.error) && nodeOptions.enableRedirection) {
                const { slot, address } = (0, cli_helper_1.parseRedirectionError)(result.error);
                result = await this.cliTool.execCommandForNode(clientMetadata, command, args, role, address, replyEncoding);
                result.response = formatter.format(result.response, { slot, address });
                result.slot = parseInt(slot, 10);
            }
            else {
                result.response = formatter.format(result.response);
            }
            this.cliAnalyticsService.sendClusterCommandExecutedEvent(clientMetadata.databaseId, result, { command, outputFormat });
            const { host, port, error, slot, ...rest } = result;
            return { ...rest, node: { host, port, slot } };
        }
        catch (error) {
            this.logger.error('Failed to execute redis.cluster CLI command.', error);
            if (error instanceof errors_1.CommandParsingError || error instanceof errors_1.CommandNotSupportedError) {
                this.cliAnalyticsService.sendCommandErrorEvent(clientMetadata.databaseId, error, {
                    command,
                    outputFormat,
                });
                return { response: error.message, status: cli_dto_1.CommandExecutionStatus.Fail };
            }
            this.cliAnalyticsService.sendConnectionErrorEvent(clientMetadata.databaseId, error, {
                command,
                outputFormat,
            });
            if (error instanceof exceptions_1.EncryptionServiceErrorException || error instanceof client_not_found_error_exception_1.ClientNotFoundErrorException) {
                throw error;
            }
            if (error instanceof errors_1.WrongDatabaseTypeError || error instanceof errors_1.ClusterNodeNotFoundError) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    checkUnsupportedCommands(commandLine) {
        const unsupportedCommand = (0, getUnsupportedCommands_1.getUnsupportedCommands)()
            .find((command) => commandLine.toLowerCase().startsWith(command));
        if (unsupportedCommand) {
            throw new errors_1.CommandNotSupportedError(error_messages_1.default.CLI_COMMAND_NOT_SUPPORTED(unsupportedCommand.toUpperCase()));
        }
    }
};
CliBusinessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_tool_service_1.RedisToolService,
        cli_analytics_service_1.CliAnalyticsService,
        database_recommendation_service_1.DatabaseRecommendationService,
        commands_service_1.CommandsService])
], CliBusinessService);
exports.CliBusinessService = CliBusinessService;
