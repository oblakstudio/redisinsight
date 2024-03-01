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
exports.CliController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cli_dto_1 = require("../dto/cli.dto");
const cli_business_service_1 = require("../services/cli-business/cli-business.service");
const api_endpoint_decorator_1 = require("../../../decorators/api-endpoint.decorator");
const api_cli_params_decorator_1 = require("../decorators/api-cli-params.decorator");
const cli_client_metadata_decorator_1 = require("../decorators/cli-client-metadata.decorator");
const models_1 = require("../../../common/models");
let CliController = class CliController {
    constructor(service) {
        this.service = service;
    }
    async getClient(clientMetadata) {
        return this.service.getClient(clientMetadata);
    }
    async sendCommand(clientMetadata, dto) {
        return this.service.sendCommand(clientMetadata, dto);
    }
    async sendClusterCommand(clientMetadata, dto) {
        return this.service.sendCommand(clientMetadata, dto);
    }
    async deleteClient(clientMetadata) {
        return this.service.deleteClient(clientMetadata);
    }
    async reCreateClient(clientMetadata) {
        return this.service.reCreateClient(clientMetadata);
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, api_cli_params_decorator_1.ApiCLIParams)(false),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Create Redis client for CLI',
        statusCode: 201,
        responses: [
            {
                status: 201,
                description: 'Create Redis client for CLI',
                type: cli_dto_1.CreateCliClientResponse,
            },
        ],
    }),
    __param(0, (0, cli_client_metadata_decorator_1.CliClientMetadata)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata]),
    __metadata("design:returntype", Promise)
], CliController.prototype, "getClient", null);
__decorate([
    (0, common_1.Post)('/:uuid/send-command'),
    (0, api_cli_params_decorator_1.ApiCLIParams)(),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Send Redis CLI command',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Redis CLI command response',
                type: cli_dto_1.SendCommandResponse,
            },
        ],
    }),
    __param(0, (0, cli_client_metadata_decorator_1.CliClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        cli_dto_1.SendCommandDto]),
    __metadata("design:returntype", Promise)
], CliController.prototype, "sendCommand", null);
__decorate([
    (0, common_1.Post)('/:uuid/send-cluster-command'),
    (0, api_cli_params_decorator_1.ApiCLIParams)(),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Send Redis CLI command',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Redis CLI command response',
                type: cli_dto_1.SendCommandResponse,
                isArray: true,
            },
        ],
    }),
    __param(0, (0, cli_client_metadata_decorator_1.CliClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        cli_dto_1.SendCommandDto]),
    __metadata("design:returntype", Promise)
], CliController.prototype, "sendClusterCommand", null);
__decorate([
    (0, common_1.Delete)('/:uuid'),
    (0, api_cli_params_decorator_1.ApiCLIParams)(),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Delete Redis CLI client',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Delete Redis CLI client response',
                type: cli_dto_1.DeleteClientResponse,
            },
        ],
    }),
    __param(0, (0, cli_client_metadata_decorator_1.CliClientMetadata)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata]),
    __metadata("design:returntype", Promise)
], CliController.prototype, "deleteClient", null);
__decorate([
    (0, common_1.Patch)('/:uuid'),
    (0, api_cli_params_decorator_1.ApiCLIParams)(),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Re-create Redis client for CLI',
        statusCode: 200,
    }),
    __param(0, (0, cli_client_metadata_decorator_1.CliClientMetadata)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata]),
    __metadata("design:returntype", Promise)
], CliController.prototype, "reCreateClient", null);
CliController = __decorate([
    (0, swagger_1.ApiTags)('CLI'),
    (0, common_1.Controller)('cli'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [cli_business_service_1.CliBusinessService])
], CliController);
exports.CliController = CliController;
