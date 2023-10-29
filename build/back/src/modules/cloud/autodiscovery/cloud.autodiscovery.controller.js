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
exports.CloudAutodiscoveryController = void 0;
const common_1 = require("@nestjs/common");
const timeout_interceptor_1 = require("../../../common/interceptors/timeout.interceptor");
const swagger_1 = require("@nestjs/swagger");
const api_endpoint_decorator_1 = require("../../../decorators/api-endpoint.decorator");
const models_1 = require("../../../common/models");
const server_1 = require("../../server/models/server");
const cloud_autodiscovery_service_1 = require("./cloud-autodiscovery.service");
const cloud_auth_decorator_1 = require("../common/decorators/cloud-auth.decorator");
const config_1 = require("../../../utils/config");
const dto_1 = require("../common/dto");
const models_2 = require("../user/models");
const models_3 = require("../subscription/models");
const models_4 = require("./models");
const models_5 = require("../database/models");
const dto_2 = require("./dto");
const cloudConf = config_1.default.get('cloud');
let CloudAutodiscoveryController = class CloudAutodiscoveryController {
    constructor(service) {
        this.service = service;
    }
    async getAccount(authDto) {
        return await this.service.getAccount(authDto);
    }
    async discoverSubscriptions(authDto) {
        return await this.service.discoverSubscriptions(authDto, models_4.CloudAutodiscoveryAuthType.Credentials);
    }
    async discoverDatabases(authDto, dto) {
        return await this.service.discoverDatabases(authDto, dto, models_4.CloudAutodiscoveryAuthType.Credentials);
    }
    async addDiscoveredDatabases(authDto, dto, res) {
        const result = await this.service.addRedisCloudDatabases(authDto, dto.databases);
        const hasSuccessResult = result.some((addResponse) => addResponse.status === models_1.ActionStatus.Success);
        if (!hasSuccessResult) {
            return res.status(200).json(result);
        }
        return res.json(result);
    }
};
__decorate([
    (0, common_1.Get)('account'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get current account',
        statusCode: 200,
        excludeFor: [server_1.BuildType.RedisStack],
        responses: [
            {
                status: 200,
                description: 'Account Details.',
                type: models_2.CloudAccountInfo,
            },
        ],
    }),
    __param(0, (0, cloud_auth_decorator_1.CloudAuthHeaders)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CloudCapiAuthDto]),
    __metadata("design:returntype", Promise)
], CloudAutodiscoveryController.prototype, "getAccount", null);
__decorate([
    (0, common_1.Get)('subscriptions'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get information about current account’s subscriptions.',
        statusCode: 200,
        excludeFor: [server_1.BuildType.RedisStack],
        responses: [
            {
                status: 200,
                description: 'Redis cloud subscription list.',
                type: models_3.CloudSubscription,
                isArray: true,
            },
        ],
    }),
    __param(0, (0, cloud_auth_decorator_1.CloudAuthHeaders)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CloudCapiAuthDto]),
    __metadata("design:returntype", Promise)
], CloudAutodiscoveryController.prototype, "discoverSubscriptions", null);
__decorate([
    (0, common_1.Post)('get-databases'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get databases belonging to subscriptions',
        statusCode: 200,
        excludeFor: [server_1.BuildType.RedisStack],
        responses: [
            {
                status: 200,
                description: 'Databases list.',
                type: models_5.CloudDatabase,
                isArray: true,
            },
        ],
    }),
    __param(0, (0, cloud_auth_decorator_1.CloudAuthHeaders)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CloudCapiAuthDto,
        dto_2.DiscoverCloudDatabasesDto]),
    __metadata("design:returntype", Promise)
], CloudAutodiscoveryController.prototype, "discoverDatabases", null);
__decorate([
    (0, common_1.Post)('databases'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Add databases from Redis Enterprise Cloud Pro account.',
        statusCode: 201,
        excludeFor: [server_1.BuildType.RedisStack],
        responses: [
            {
                status: 201,
                description: 'Added databases list.',
                type: dto_2.ImportCloudDatabaseResponse,
                isArray: true,
            },
        ],
    }),
    __param(0, (0, cloud_auth_decorator_1.CloudAuthHeaders)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CloudCapiAuthDto,
        dto_2.ImportCloudDatabasesDto, Object]),
    __metadata("design:returntype", Promise)
], CloudAutodiscoveryController.prototype, "addDiscoveredDatabases", null);
CloudAutodiscoveryController = __decorate([
    (0, swagger_1.ApiTags)('Cloud Autodiscovery'),
    (0, swagger_1.ApiHeaders)([{
            name: 'x-cloud-api-key',
        }, {
            name: 'x-cloud-api-secret',
        }]),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseInterceptors)(new timeout_interceptor_1.TimeoutInterceptor(undefined, cloudConf.discoveryTimeout)),
    (0, common_1.Controller)('cloud/autodiscovery'),
    __metadata("design:paramtypes", [cloud_autodiscovery_service_1.CloudAutodiscoveryService])
], CloudAutodiscoveryController);
exports.CloudAutodiscoveryController = CloudAutodiscoveryController;
