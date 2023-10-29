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
exports.DatabaseInfoController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
const timeout_interceptor_1 = require("../../common/interceptors/timeout.interceptor");
const database_info_service_1 = require("./database-info.service");
const database_overview_1 = require("./models/database-overview");
const redis_info_dto_1 = require("./dto/redis-info.dto");
const models_1 = require("../../common/models");
const decorators_1 = require("../../common/decorators");
const pipes_1 = require("../../common/pipes");
let DatabaseInfoController = class DatabaseInfoController {
    constructor(databaseInfoService) {
        this.databaseInfoService = databaseInfoService;
    }
    async getInfo(clientMetadata) {
        return this.databaseInfoService.getInfo(clientMetadata);
    }
    async getDatabaseOverview(clientMetadata) {
        return this.databaseInfoService.getOverview(clientMetadata);
    }
    async getDatabaseIndex(databaseIndexDto, clientMetadata) {
        return this.databaseInfoService.getDatabaseIndex(clientMetadata, databaseIndexDto.db);
    }
};
__decorate([
    (0, common_1.Get)(':id/info'),
    (0, common_1.UseInterceptors)(new timeout_interceptor_1.TimeoutInterceptor()),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get Redis database config info',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Redis database info',
                type: redis_info_dto_1.RedisDatabaseInfoResponse,
            },
        ],
    }),
    __param(0, (0, decorators_1.ClientMetadataParam)({
        databaseIdParam: 'id',
        ignoreDbIndex: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata]),
    __metadata("design:returntype", Promise)
], DatabaseInfoController.prototype, "getInfo", null);
__decorate([
    (0, common_1.Get)(':id/overview'),
    (0, common_1.UseInterceptors)(new timeout_interceptor_1.TimeoutInterceptor()),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get Redis database overview',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Redis database overview',
                type: database_overview_1.DatabaseOverview,
            },
        ],
    }),
    __param(0, (0, decorators_1.ClientMetadataParam)({
        databaseIdParam: 'id',
        ignoreDbIndex: false,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata]),
    __metadata("design:returntype", Promise)
], DatabaseInfoController.prototype, "getDatabaseOverview", null);
__decorate([
    (0, common_1.Get)(':id/db/:index'),
    (0, common_1.UseInterceptors)(new timeout_interceptor_1.TimeoutInterceptor()),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Try to create connection to specified database index',
        statusCode: 200,
        responses: [
            {
                status: 200,
            },
        ],
    }),
    __param(0, (0, common_1.Param)('index', new pipes_1.DbIndexValidationPipe({ transform: true }))),
    __param(1, (0, decorators_1.ClientMetadataParam)({
        databaseIdParam: 'id',
        ignoreDbIndex: false,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.DatabaseIndex,
        models_1.ClientMetadata]),
    __metadata("design:returntype", Promise)
], DatabaseInfoController.prototype, "getDatabaseIndex", null);
DatabaseInfoController = __decorate([
    (0, swagger_1.ApiTags)('Database Instances'),
    (0, common_1.Controller)('databases'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [database_info_service_1.DatabaseInfoService])
], DatabaseInfoController);
exports.DatabaseInfoController = DatabaseInfoController;
