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
exports.WorkbenchController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
const api_redis_params_decorator_1 = require("../../decorators/api-redis-params.decorator");
const workbench_service_1 = require("./workbench.service");
const command_execution_1 = require("./models/command-execution");
const create_command_executions_dto_1 = require("./dto/create-command-executions.dto");
const short_command_execution_1 = require("./models/short-command-execution");
const models_1 = require("../../common/models");
const workbench_client_metadata_decorator_1 = require("./decorators/workbench-client-metadata.decorator");
let WorkbenchController = class WorkbenchController {
    constructor(service) {
        this.service = service;
    }
    async sendCommands(clientMetadata, dto) {
        return this.service.createCommandExecutions(clientMetadata, dto);
    }
    async listCommandExecutions(databaseId) {
        return this.service.listCommandExecutions(databaseId);
    }
    async getCommandExecution(databaseId, id) {
        return this.service.getCommandExecution(databaseId, id);
    }
    async deleteCommandExecution(databaseId, id) {
        return this.service.deleteCommandExecution(databaseId, id);
    }
    async deleteCommandExecutions(databaseId) {
        return this.service.deleteCommandExecutions(databaseId);
    }
};
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Send Redis Batch Commands from the Workbench',
        statusCode: 200,
        responses: [
            {
                status: 200,
                type: command_execution_1.CommandExecution,
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
        create_command_executions_dto_1.CreateCommandExecutionsDto]),
    __metadata("design:returntype", Promise)
], WorkbenchController.prototype, "sendCommands", null);
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'List of command executions',
        statusCode: 200,
        responses: [
            {
                status: 200,
                type: short_command_execution_1.ShortCommandExecution,
                isArray: true,
            },
        ],
    }),
    (0, common_1.Get)('/command-executions'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    __param(0, (0, common_1.Param)('dbInstance')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkbenchController.prototype, "listCommandExecutions", null);
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get command execution details',
        statusCode: 200,
        responses: [
            {
                status: 200,
                type: command_execution_1.CommandExecution,
            },
        ],
    }),
    (0, common_1.Get)('/command-executions/:id'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    __param(0, (0, common_1.Param)('dbInstance')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WorkbenchController.prototype, "getCommandExecution", null);
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Delete command execution',
        statusCode: 200,
    }),
    (0, common_1.Delete)('/command-executions/:id'),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    __param(0, (0, common_1.Param)('dbInstance')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WorkbenchController.prototype, "deleteCommandExecution", null);
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Delete command executions',
        statusCode: 200,
    }),
    (0, common_1.Delete)('/command-executions'),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    __param(0, (0, common_1.Param)('dbInstance')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkbenchController.prototype, "deleteCommandExecutions", null);
WorkbenchController = __decorate([
    (0, swagger_1.ApiTags)('Workbench'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.Controller)('workbench'),
    __metadata("design:paramtypes", [workbench_service_1.WorkbenchService])
], WorkbenchController);
exports.WorkbenchController = WorkbenchController;
