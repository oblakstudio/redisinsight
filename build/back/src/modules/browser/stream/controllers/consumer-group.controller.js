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
exports.ConsumerGroupController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_redis_instance_operation_decorator_1 = require("../../../../decorators/api-redis-instance-operation.decorator");
const dto_1 = require("../dto");
const consumer_group_service_1 = require("../services/consumer-group.service");
const dto_2 = require("../../keys/dto");
const browser_client_metadata_decorator_1 = require("../../decorators/browser-client-metadata.decorator");
const decorators_1 = require("../../../../common/decorators");
const models_1 = require("../../../../common/models");
const interceptors_1 = require("../../../../common/interceptors");
let ConsumerGroupController = class ConsumerGroupController {
    constructor(service) {
        this.service = service;
    }
    async getGroups(clientMetadata, dto) {
        return this.service.getGroups(clientMetadata, dto);
    }
    async createGroups(clientMetadata, dto) {
        return this.service.createGroups(clientMetadata, dto);
    }
    async updateGroup(clientMetadata, dto) {
        return this.service.updateGroup(clientMetadata, dto);
    }
    async deleteGroup(clientMetadata, dto) {
        return this.service.deleteGroup(clientMetadata, dto);
    }
};
__decorate([
    (0, common_1.Post)('/get'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Get consumer groups list',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Returns stream consumer groups.',
                type: dto_1.ConsumerGroupDto,
                isArray: true,
            },
        ],
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_2.KeyDto]),
    __metadata("design:returntype", Promise)
], ConsumerGroupController.prototype, "getGroups", null);
__decorate([
    (0, common_1.Post)(''),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Create stream consumer group',
        statusCode: 201,
    }),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.CreateConsumerGroupsDto]),
    __metadata("design:returntype", Promise)
], ConsumerGroupController.prototype, "createGroups", null);
__decorate([
    (0, common_1.Patch)(''),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Modify last delivered ID of the Consumer Group',
        statusCode: 200,
    }),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.UpdateConsumerGroupDto]),
    __metadata("design:returntype", Promise)
], ConsumerGroupController.prototype, "updateGroup", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Delete Consumer Group',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Returns number of affected consumer groups.',
                type: dto_1.DeleteConsumerGroupsResponse,
            },
        ],
    }),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.DeleteConsumerGroupsDto]),
    __metadata("design:returntype", Promise)
], ConsumerGroupController.prototype, "deleteGroup", null);
ConsumerGroupController = __decorate([
    (0, swagger_1.ApiTags)('Browser: Streams'),
    (0, common_1.UseInterceptors)(interceptors_1.BrowserSerializeInterceptor),
    (0, common_1.Controller)('streams/consumer-groups'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [consumer_group_service_1.ConsumerGroupService])
], ConsumerGroupController);
exports.ConsumerGroupController = ConsumerGroupController;
