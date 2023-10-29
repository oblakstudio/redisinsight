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
exports.RedisearchController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_redis_params_decorator_1 = require("../../../../decorators/api-redis-params.decorator");
const browser_client_metadata_decorator_1 = require("../../decorators/browser-client-metadata.decorator");
const decorators_1 = require("../../../../common/decorators");
const base_controller_1 = require("../base.controller");
const redisearch_1 = require("../../dto/redisearch");
const redisearch_service_1 = require("../../services/redisearch/redisearch.service");
const dto_1 = require("../../dto");
const models_1 = require("../../../../common/models");
let RedisearchController = class RedisearchController extends base_controller_1.BaseController {
    constructor(service) {
        super();
        this.service = service;
    }
    async list(clientMetadata) {
        return this.service.list(clientMetadata);
    }
    async createIndex(clientMetadata, dto) {
        return await this.service.createIndex(clientMetadata, dto);
    }
    async search(clientMetadata, dto) {
        return await this.service.search(clientMetadata, dto);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ description: 'Get list of available indexes' }),
    (0, swagger_1.ApiOkResponse)({ type: redisearch_1.ListRedisearchIndexesResponse }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata]),
    __metadata("design:returntype", Promise)
], RedisearchController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ description: 'Create redisearch index' }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiBody)({ type: redisearch_1.CreateRedisearchIndexDto }),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        redisearch_1.CreateRedisearchIndexDto]),
    __metadata("design:returntype", Promise)
], RedisearchController.prototype, "createIndex", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ description: 'Search for keys in index' }),
    (0, swagger_1.ApiOkResponse)({ type: dto_1.GetKeysWithDetailsResponse }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        redisearch_1.SearchRedisearchDto]),
    __metadata("design:returntype", Promise)
], RedisearchController.prototype, "search", null);
RedisearchController = __decorate([
    (0, swagger_1.ApiTags)('RediSearch'),
    (0, common_1.Controller)('redisearch'),
    __metadata("design:paramtypes", [redisearch_service_1.RedisearchService])
], RedisearchController);
exports.RedisearchController = RedisearchController;
