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
exports.ConsumerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_redis_instance_operation_decorator_1 = require("../../../../decorators/api-redis-instance-operation.decorator");
const dto_1 = require("../dto");
const consumer_service_1 = require("../services/consumer.service");
const browser_client_metadata_decorator_1 = require("../../decorators/browser-client-metadata.decorator");
const decorators_1 = require("../../../../common/decorators");
const models_1 = require("../../../../common/models");
const interceptors_1 = require("../../../../common/interceptors");
let ConsumerController = class ConsumerController {
    constructor(service) {
        this.service = service;
    }
    async getConsumers(clientMetadata, dto) {
        return this.service.getConsumers(clientMetadata, dto);
    }
    async deleteConsumers(clientMetadata, dto) {
        return this.service.deleteConsumers(clientMetadata, dto);
    }
    async getPendingEntries(clientMetadata, dto) {
        return this.service.getPendingEntries(clientMetadata, dto);
    }
    async ackPendingEntries(clientMetadata, dto) {
        return this.service.ackPendingEntries(clientMetadata, dto);
    }
    async claimPendingEntries(clientMetadata, dto) {
        return this.service.claimPendingEntries(clientMetadata, dto);
    }
};
__decorate([
    (0, common_1.Post)('/get'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Get consumers list in the group',
        statusCode: 200,
        responses: [
            {
                status: 200,
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
        dto_1.GetConsumersDto]),
    __metadata("design:returntype", Promise)
], ConsumerController.prototype, "getConsumers", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Delete Consumer(s) from the Consumer Group',
        statusCode: 200,
    }),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.DeleteConsumersDto]),
    __metadata("design:returntype", Promise)
], ConsumerController.prototype, "deleteConsumers", null);
__decorate([
    (0, common_1.Post)('/pending-messages/get'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Get pending entries list',
        statusCode: 200,
        responses: [
            {
                status: 200,
                type: dto_1.PendingEntryDto,
                isArray: true,
            },
        ],
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.GetPendingEntriesDto]),
    __metadata("design:returntype", Promise)
], ConsumerController.prototype, "getPendingEntries", null);
__decorate([
    (0, common_1.Post)('/pending-messages/ack'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Ack pending entries',
        statusCode: 200,
        responses: [
            {
                status: 200,
                type: dto_1.AckPendingEntriesResponse,
            },
        ],
    }),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.AckPendingEntriesDto]),
    __metadata("design:returntype", Promise)
], ConsumerController.prototype, "ackPendingEntries", null);
__decorate([
    (0, common_1.Post)('/pending-messages/claim'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Claim pending entries',
        statusCode: 200,
        responses: [
            {
                status: 200,
                type: dto_1.ClaimPendingEntriesResponse,
            },
        ],
    }),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.ClaimPendingEntryDto]),
    __metadata("design:returntype", Promise)
], ConsumerController.prototype, "claimPendingEntries", null);
ConsumerController = __decorate([
    (0, swagger_1.ApiTags)('Browser: Streams'),
    (0, common_1.UseInterceptors)(interceptors_1.BrowserSerializeInterceptor),
    (0, common_1.Controller)('streams/consumer-groups/consumers'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [consumer_service_1.ConsumerService])
], ConsumerController);
exports.ConsumerController = ConsumerController;
