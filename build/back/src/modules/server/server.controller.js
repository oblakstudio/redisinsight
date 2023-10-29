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
exports.ServerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
const cli_helper_1 = require("../../utils/cli-helper");
const getUnsupportedCommands_1 = require("../cli/utils/getUnsupportedCommands");
const server_service_1 = require("./server.service");
const server_dto_1 = require("./dto/server.dto");
let ServerController = class ServerController {
    constructor(serverService) {
        this.serverService = serverService;
    }
    async getInfo() {
        return this.serverService.getInfo();
    }
    async getCliUnsupportedCommands() {
        return (0, getUnsupportedCommands_1.getUnsupportedCommands)();
    }
    async getCliBlockingCommands() {
        return (0, cli_helper_1.getBlockingCommands)();
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get server info',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Server Info',
                type: server_dto_1.GetServerInfoResponse,
            },
        ],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "getInfo", null);
__decorate([
    (0, common_1.Get)('/cli-unsupported-commands'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get list of unsupported commands in CLI',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Unsupported commands',
                type: String,
                isArray: true,
            },
        ],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "getCliUnsupportedCommands", null);
__decorate([
    (0, common_1.Get)('/cli-blocking-commands'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get list of blocking commands in CLI',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Blocking commands',
                type: String,
                isArray: true,
            },
        ],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "getCliBlockingCommands", null);
ServerController = __decorate([
    (0, swagger_1.ApiTags)('Info'),
    (0, common_1.Controller)('info'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [server_service_1.ServerService])
], ServerController);
exports.ServerController = ServerController;
