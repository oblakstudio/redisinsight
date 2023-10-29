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
exports.StreamController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_redis_instance_operation_decorator_1 = require("../../../../decorators/api-redis-instance-operation.decorator");
const stream_dto_1 = require("../../dto/stream.dto");
const stream_service_1 = require("../../services/stream/stream.service");
const base_controller_1 = require("../base.controller");
const browser_client_metadata_decorator_1 = require("../../decorators/browser-client-metadata.decorator");
const decorators_1 = require("../../../../common/decorators");
const models_1 = require("../../../../common/models");
let StreamController = class StreamController extends base_controller_1.BaseController {
    constructor(service) {
        super();
        this.service = service;
    }
    async createStream(clientMetadata, dto) {
        return this.service.createStream(clientMetadata, dto);
    }
    async addEntries(clientMetadata, dto) {
        return this.service.addEntries(clientMetadata, dto);
    }
    async getEntries(clientMetadata, dto) {
        return this.service.getEntries(clientMetadata, dto);
    }
    async deleteEntries(clientMetadata, dto) {
        return await this.service.deleteEntries(clientMetadata, dto);
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Create stream',
        statusCode: 201,
    }),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        stream_dto_1.CreateStreamDto]),
    __metadata("design:returntype", Promise)
], StreamController.prototype, "createStream", null);
__decorate([
    (0, common_1.Post)('entries'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Add entries to the stream',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Returns entries IDs added',
                type: stream_dto_1.AddStreamEntriesResponse,
            },
        ],
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        stream_dto_1.AddStreamEntriesDto]),
    __metadata("design:returntype", Promise)
], StreamController.prototype, "addEntries", null);
__decorate([
    (0, common_1.Post)('/entries/get'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Get stream entries',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Returns ordered stream entries in defined range.',
                type: stream_dto_1.GetStreamEntriesResponse,
            },
        ],
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        stream_dto_1.GetStreamEntriesDto]),
    __metadata("design:returntype", Promise)
], StreamController.prototype, "getEntries", null);
__decorate([
    (0, common_1.Delete)('/entries'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Remove the specified entries from the Stream stored at key',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Ok',
                type: stream_dto_1.DeleteStreamEntriesResponse,
            },
        ],
    }),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        stream_dto_1.DeleteStreamEntriesDto]),
    __metadata("design:returntype", Promise)
], StreamController.prototype, "deleteEntries", null);
StreamController = __decorate([
    (0, swagger_1.ApiTags)('Streams'),
    (0, common_1.Controller)('streams'),
    __metadata("design:paramtypes", [stream_service_1.StreamService])
], StreamController);
exports.StreamController = StreamController;
