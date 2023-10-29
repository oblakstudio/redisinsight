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
exports.ClusterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_endpoint_decorator_1 = require("../../../decorators/api-endpoint.decorator");
const timeout_interceptor_1 = require("../../../common/interceptors/timeout.interceptor");
const redis_enterprise_service_1 = require("../redis-enterprise.service");
const redis_enterprise_cluster_dto_1 = require("../dto/redis-enterprise-cluster.dto");
const models_1 = require("../../../common/models");
const server_1 = require("../../server/models/server");
const cluster_dto_1 = require("../dto/cluster.dto");
let ClusterController = class ClusterController {
    constructor(redisEnterpriseService) {
        this.redisEnterpriseService = redisEnterpriseService;
    }
    async getDatabases(dto) {
        return await this.redisEnterpriseService.getDatabases(dto);
    }
    async addRedisEnterpriseDatabases(dto, res) {
        const { uids, ...connectionDetails } = dto;
        const result = await this.redisEnterpriseService.addRedisEnterpriseDatabases(connectionDetails, uids);
        const hasSuccessResult = result.some((addResponse) => addResponse.status === models_1.ActionStatus.Success);
        if (!hasSuccessResult) {
            return res.status(200).json(result);
        }
        return res.json(result);
    }
};
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Post)('get-databases'),
    (0, common_1.UseInterceptors)(new timeout_interceptor_1.TimeoutInterceptor()),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get all databases in the cluster.',
        statusCode: 200,
        excludeFor: [server_1.BuildType.RedisStack],
        responses: [
            {
                status: 200,
                description: 'All databases in the cluster.',
                isArray: true,
                type: cluster_dto_1.RedisEnterpriseDatabase,
            },
        ],
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cluster_dto_1.ClusterConnectionDetailsDto]),
    __metadata("design:returntype", Promise)
], ClusterController.prototype, "getDatabases", null);
__decorate([
    (0, common_1.Post)('databases'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Add databases from Redis Enterprise cluster',
        statusCode: 201,
        excludeFor: [server_1.BuildType.RedisStack],
        responses: [
            {
                status: 201,
                description: 'Added databases list.',
                type: redis_enterprise_cluster_dto_1.AddRedisEnterpriseDatabaseResponse,
                isArray: true,
            },
        ],
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [redis_enterprise_cluster_dto_1.AddRedisEnterpriseDatabasesDto, Object]),
    __metadata("design:returntype", Promise)
], ClusterController.prototype, "addRedisEnterpriseDatabases", null);
ClusterController = __decorate([
    (0, swagger_1.ApiTags)('Redis Enterprise Cluster'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.Controller)('redis-enterprise/cluster'),
    __metadata("design:paramtypes", [redis_enterprise_service_1.RedisEnterpriseService])
], ClusterController);
exports.ClusterController = ClusterController;
