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
exports.SlowLogController = void 0;
const common_1 = require("@nestjs/common");
const slow_log_service_1 = require("./slow-log.service");
const swagger_1 = require("@nestjs/swagger");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
const models_1 = require("./models");
const update_slow_log_config_dto_1 = require("./dto/update-slow-log-config.dto");
const get_slow_logs_dto_1 = require("./dto/get-slow-logs.dto");
const decorators_1 = require("../../common/decorators");
const models_2 = require("../../common/models");
let SlowLogController = class SlowLogController {
    constructor(service) {
        this.service = service;
    }
    async getSlowLogs(clientMetadata, getSlowLogsDto) {
        return this.service.getSlowLogs(clientMetadata, getSlowLogsDto);
    }
    async resetSlowLogs(clientMetadata) {
        return this.service.reset(clientMetadata);
    }
    async getConfig(clientMetadata) {
        return this.service.getConfig(clientMetadata);
    }
    async updateConfig(clientMetadata, dto) {
        return this.service.updateConfig(clientMetadata, dto);
    }
};
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'List of slow logs',
        statusCode: 200,
        responses: [
            {
                status: 200,
                type: models_1.SlowLog,
                isArray: true,
            },
        ],
    }),
    (0, common_1.Get)(''),
    __param(0, (0, decorators_1.ClientMetadataParam)({
        ignoreDbIndex: true,
    })),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_2.ClientMetadata,
        get_slow_logs_dto_1.GetSlowLogsDto]),
    __metadata("design:returntype", Promise)
], SlowLogController.prototype, "getSlowLogs", null);
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Clear slow logs',
        statusCode: 200,
    }),
    (0, common_1.Delete)(''),
    __param(0, (0, decorators_1.ClientMetadataParam)({
        ignoreDbIndex: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_2.ClientMetadata]),
    __metadata("design:returntype", Promise)
], SlowLogController.prototype, "resetSlowLogs", null);
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get slowlog config',
        statusCode: 200,
        responses: [
            {
                status: 200,
                type: models_1.SlowLogConfig,
            },
        ],
    }),
    (0, common_1.Get)('config'),
    __param(0, (0, decorators_1.ClientMetadataParam)({
        ignoreDbIndex: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_2.ClientMetadata]),
    __metadata("design:returntype", Promise)
], SlowLogController.prototype, "getConfig", null);
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Update slowlog config',
        statusCode: 200,
        responses: [
            {
                status: 200,
                type: models_1.SlowLogConfig,
            },
        ],
    }),
    (0, common_1.Patch)('config'),
    __param(0, (0, decorators_1.ClientMetadataParam)({
        ignoreDbIndex: true,
    })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_2.ClientMetadata,
        update_slow_log_config_dto_1.UpdateSlowLogConfigDto]),
    __metadata("design:returntype", Promise)
], SlowLogController.prototype, "updateConfig", null);
SlowLogController = __decorate([
    (0, swagger_1.ApiTags)('Slow Logs'),
    (0, common_1.Controller)('slow-logs'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [slow_log_service_1.SlowLogService])
], SlowLogController);
exports.SlowLogController = SlowLogController;
