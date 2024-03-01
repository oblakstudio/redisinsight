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
exports.PluginsService = void 0;
const common_1 = require("@nestjs/common");
const workbench_commands_executor_1 = require("./providers/workbench-commands.executor");
const errors_1 = require("../cli/constants/errors");
const error_messages_1 = require("../../constants/error-messages");
const plugin_command_execution_1 = require("./models/plugin-command-execution");
const class_transformer_1 = require("class-transformer");
const plugin_commands_whitelist_provider_1 = require("./providers/plugin-commands-whitelist.provider");
const cli_dto_1 = require("../cli/dto/cli.dto");
const command_execution_result_1 = require("./models/command-execution-result");
const config_1 = require("../../utils/config");
const plugin_state_repository_1 = require("./repositories/plugin-state.repository");
const database_client_factory_1 = require("../database/providers/database.client.factory");
const PLUGINS_CONFIG = config_1.default.get('plugins');
let PluginsService = class PluginsService {
    constructor(commandsExecutor, pluginStateRepository, whitelistProvider, databaseClientFactory) {
        this.commandsExecutor = commandsExecutor;
        this.pluginStateRepository = pluginStateRepository;
        this.whitelistProvider = whitelistProvider;
        this.databaseClientFactory = databaseClientFactory;
    }
    async sendCommand(clientMetadata, dto) {
        try {
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await this.checkWhitelistedCommands(clientMetadata, dto.command);
            const result = await this.commandsExecutor.sendCommand(client, dto);
            return (0, class_transformer_1.plainToClass)(plugin_command_execution_1.PluginCommandExecution, {
                ...dto,
                databaseId: clientMetadata.databaseId,
                result,
            });
        }
        catch (error) {
            if (error instanceof errors_1.CommandNotSupportedError) {
                return new plugin_command_execution_1.PluginCommandExecution({
                    ...dto,
                    databaseId: clientMetadata.databaseId,
                    result: [new command_execution_result_1.CommandExecutionResult({
                            response: error.message,
                            status: cli_dto_1.CommandExecutionStatus.Fail,
                        })],
                });
            }
            throw error;
        }
    }
    async getWhitelistCommands(clientMetadata) {
        const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
        return await this.whitelistProvider.getWhitelistCommands(client);
    }
    async saveState(visualizationId, commandExecutionId, dto) {
        if (JSON.stringify(dto.state).length > PLUGINS_CONFIG.stateMaxSize) {
            throw new common_1.BadRequestException(error_messages_1.default.PLUGIN_STATE_MAX_SIZE(PLUGINS_CONFIG.stateMaxSize));
        }
        await this.pluginStateRepository.upsert({
            visualizationId,
            commandExecutionId,
            ...dto,
        });
    }
    async getState(visualizationId, commandExecutionId) {
        return this.pluginStateRepository.getOne(visualizationId, commandExecutionId);
    }
    async checkWhitelistedCommands(clientMetadata, commandLine) {
        const targetCommand = commandLine.toLowerCase();
        const whitelist = await this.getWhitelistCommands(clientMetadata);
        if (!whitelist.find((command) => targetCommand.startsWith(command))) {
            throw new errors_1.CommandNotSupportedError(error_messages_1.default.PLUGIN_COMMAND_NOT_SUPPORTED((targetCommand.split(' '))[0].toUpperCase()));
        }
    }
};
PluginsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [workbench_commands_executor_1.WorkbenchCommandsExecutor,
        plugin_state_repository_1.PluginStateRepository,
        plugin_commands_whitelist_provider_1.PluginCommandsWhitelistProvider,
        database_client_factory_1.DatabaseClientFactory])
], PluginsService);
exports.PluginsService = PluginsService;
