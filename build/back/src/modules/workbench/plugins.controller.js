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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
const api_redis_params_decorator_1 = require("../../decorators/api-redis-params.decorator");
const create_command_execution_dto_1 = require("./dto/create-command-execution.dto");
const plugins_service_1 = require("./plugins.service");
const plugin_command_execution_1 = require("./models/plugin-command-execution");
const create_plugin_state_dto_1 = require("./dto/create-plugin-state.dto");
const plugin_state_1 = require("./models/plugin-state");
const models_1 = require("../../common/models");
const workbench_client_metadata_decorator_1 = require("./decorators/workbench-client-metadata.decorator");
let PluginsController = class PluginsController {
    constructor(service) {
        this.service = service;
    }
    async sendCommand(clientMetadata, dto) {
        return this.service.sendCommand(clientMetadata, dto);
    }
    async getPluginCommands(clientMetadata) {
        return this.service.getWhitelistCommands(clientMetadata);
    }
    async saveState(visualizationId, commandExecutionId, dto) {
        await this.service.saveState(visualizationId, commandExecutionId, dto);
    }
    async getState(visualizationId, commandExecutionId) {
        return this.service.getState(visualizationId, commandExecutionId);
    }
};
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Send Redis Command from the Workbench',
        statusCode: 200,
        responses: [
            {
                status: 200,
                type: plugin_command_execution_1.PluginCommandExecution,
            },
        ],
    }),
    (0, common_1.Post)('/command-executions'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    __param(0, (0, workbench_client_metadata_decorator_1.WorkbenchClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        create_command_execution_dto_1.CreateCommandExecutionDto]),
    __metadata("design:returntype", Promise)
], PluginsController.prototype, "sendCommand", null);
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get Redis whitelist commands available for plugins',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'List of available commands',
                type: [String],
            },
        ],
    }),
    (0, common_1.Get)('/commands'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    __param(0, (0, workbench_client_metadata_decorator_1.WorkbenchClientMetadata)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata]),
    __metadata("design:returntype", Promise)
], PluginsController.prototype, "getPluginCommands", null);
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Save plugin state for particular command execution',
        statusCode: 201,
    }),
    (0, common_1.Post)('/:visualizationId/command-executions/:id/state'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    __param(0, (0, common_1.Param)('visualizationId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_plugin_state_dto_1.CreatePluginStateDto]),
    __metadata("design:returntype", Promise)
], PluginsController.prototype, "saveState", null);
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get previously saved state',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Plugin state',
                type: () => plugin_state_1.PluginState,
            },
        ],
    }),
    (0, common_1.Get)('/:visualizationId/command-executions/:id/state'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    __param(0, (0, common_1.Param)('visualizationId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PluginsController.prototype, "getState", null);
PluginsController = __decorate([
    (0, swagger_1.ApiTags)('Plugins'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.Controller)('plugins'),
    __metadata("design:paramtypes", [plugins_service_1.PluginsService])
], PluginsController);
exports.PluginsController = PluginsController;
