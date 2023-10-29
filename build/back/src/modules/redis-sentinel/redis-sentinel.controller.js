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
exports.RedisSentinelController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const timeout_interceptor_1 = require("../../common/interceptors/timeout.interceptor");
const error_messages_1 = require("../../constants/error-messages");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
const discover_sentinel_masters_dto_1 = require("./dto/discover.sentinel-masters.dto");
const sentinel_master_1 = require("./models/sentinel-master");
const models_1 = require("../../common/models");
const redis_sentinel_service_1 = require("./redis-sentinel.service");
const create_sentinel_databases_dto_1 = require("./dto/create.sentinel.databases.dto");
const create_sentinel_database_response_1 = require("./dto/create.sentinel.database.response");
const server_1 = require("../server/models/server");
let RedisSentinelController = class RedisSentinelController {
    constructor(redisSentinelService) {
        this.redisSentinelService = redisSentinelService;
    }
    async getMasters(dto) {
        return await this.redisSentinelService.getSentinelMasters(dto);
    }
    async addSentinelMasters(dto, res) {
        const result = await this.redisSentinelService.createSentinelDatabases(dto);
        const hasSuccessResult = result.some((addResponse) => addResponse.status === models_1.ActionStatus.Success);
        if (!hasSuccessResult) {
            return res.status(200).json(result);
        }
        return res.json(result);
    }
};
__decorate([
    (0, common_1.Post)('get-databases'),
    (0, common_1.UseInterceptors)(new timeout_interceptor_1.TimeoutInterceptor(error_messages_1.default.CONNECTION_TIMEOUT)),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get master groups',
        statusCode: 200,
        responses: [
            {
                status: 200,
                type: sentinel_master_1.SentinelMaster,
                isArray: true,
            },
        ],
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discover_sentinel_masters_dto_1.DiscoverSentinelMastersDto]),
    __metadata("design:returntype", Promise)
], RedisSentinelController.prototype, "getMasters", null);
__decorate([
    (0, common_1.UseInterceptors)(new timeout_interceptor_1.TimeoutInterceptor(error_messages_1.default.CONNECTION_TIMEOUT)),
    (0, common_1.Post)('databases'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 201,
        description: 'Add masters from Redis Sentinel',
        excludeFor: [server_1.BuildType.RedisStack],
        responses: [
            {
                status: 201,
                description: 'Ok',
                type: create_sentinel_database_response_1.CreateSentinelDatabaseResponse,
                isArray: true,
            },
        ],
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sentinel_databases_dto_1.CreateSentinelDatabasesDto, Object]),
    __metadata("design:returntype", Promise)
], RedisSentinelController.prototype, "addSentinelMasters", null);
RedisSentinelController = __decorate([
    (0, swagger_1.ApiTags)('Redis OSS Sentinel'),
    (0, common_1.Controller)('redis-sentinel'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    })),
    __metadata("design:paramtypes", [redis_sentinel_service_1.RedisSentinelService])
], RedisSentinelController);
exports.RedisSentinelController = RedisSentinelController;
