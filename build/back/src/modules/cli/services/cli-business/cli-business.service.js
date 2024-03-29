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
const getUnsupportedCommands_1 = require("../../utils/getUnsupportedCommands");
const client_not_found_error_exception_1 = require("../../../redis/exceptions/client-not-found-error.exception");
const database_recommendation_service_1 = require("../../../database-recommendation/database-recommendation.service");
const database_client_factory_1 = require("../../../database/providers/database.client.factory");
const uuid_1 = require("uuid");
const utils_1 = require("../../../../utils");
const output_formatter_manager_1 = require("./output-formatter/output-formatter-manager");
const output_formatter_interface_1 = require("./output-formatter/output-formatter.interface");
const text_formatter_strategy_1 = require("./output-formatter/strategies/text-formatter.strategy");
const raw_formatter_strategy_1 = require("./output-formatter/strategies/raw-formatter.strategy");
let CliBusinessService = class CliBusinessService {
    constructor(cliAnalyticsService, recommendationService, commandsService, databaseClientFactory) {
        this.cliAnalyticsService = cliAnalyticsService;
        this.recommendationService = recommendationService;
        this.commandsService = commandsService;
        this.databaseClientFactory = databaseClientFactory;
        this.logger = new common_1.Logger('CliService');
        this.outputFormatterManager = new output_formatter_manager_1.OutputFormatterManager();
        this.outputFormatterManager.addStrategy(output_formatter_interface_1.CliOutputFormatterTypes.Text, new text_formatter_strategy_1.TextFormatterStrategy());
        this.outputFormatterManager.addStrategy(output_formatter_interface_1.CliOutputFormatterTypes.Raw, new raw_formatter_strategy_1.RawFormatterStrategy());
    }
    async getClient(clientMetadata) {
        this.logger.log('Create Redis client for CLI.');
        try {
            const uuid = (0, uuid_1.v4)();
            await this.databaseClientFactory.getOrCreateClient({
                ...clientMetadata,
                uniqueId: uuid,
            });
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
            await this.databaseClientFactory.deleteClient(clientMetadata);
            const uuid = (0, uuid_1.v4)();
            await this.databaseClientFactory.getOrCreateClient({
                ...clientMetadata,
                uniqueId: uuid,
            });
            this.logger.log('Succeed to re-create Redis client for CLI.');
            this.cliAnalyticsService.sendClientRecreatedEvent(clientMetadata.databaseId);
            return { uuid };
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
            const affected = await this.databaseClientFactory.deleteClient(clientMetadata);
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
        const outputFormat = dto.outputFormat || output_formatter_interface_1.CliOutputFormatterTypes.Raw;
        let command = constants_1.unknownCommand;
        let args = [];
        try {
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const formatter = this.outputFormatterManager.getStrategy(outputFormat);
            [command, ...args] = (0, cli_helper_1.splitCliCommandLine)(commandLine);
            const replyEncoding = (0, cli_helper_1.checkHumanReadableCommands)(`${command} ${args[0]}`) ? 'utf8' : undefined;
            this.checkUnsupportedCommands(`${command} ${args[0]}`);
            this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.SEARCH_VISUALIZATION, command);
            const reply = await client.sendCommand([command, ...args], { replyEncoding });
            this.cliAnalyticsService.sendCommandExecutedEvent(clientMetadata.databaseId, {
                command,
                outputFormat,
            });
            if (command.toLowerCase() === 'ft.info') {
                this.cliAnalyticsService.sendIndexInfoEvent(clientMetadata.databaseId, (0, utils_1.getAnalyticsDataFromIndexInfo)(reply));
            }
            this.logger.log('Succeed to execute redis CLI command.');
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
            return { response: error.message, status: cli_dto_1.CommandExecutionStatus.Fail };
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
    __metadata("design:paramtypes", [cli_analytics_service_1.CliAnalyticsService,
        database_recommendation_service_1.DatabaseRecommendationService,
        commands_service_1.CommandsService,
        database_client_factory_1.DatabaseClientFactory])
], CliBusinessService);
exports.CliBusinessService = CliBusinessService;
