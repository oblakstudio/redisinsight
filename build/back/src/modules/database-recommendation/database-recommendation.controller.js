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
exports.DatabaseRecommendationController = void 0;
const common_1 = require("@nestjs/common");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
const api_redis_params_decorator_1 = require("../../decorators/api-redis-params.decorator");
const swagger_1 = require("@nestjs/swagger");
const database_recommendation_service_1 = require("./database-recommendation.service");
const browser_client_metadata_decorator_1 = require("../browser/decorators/browser-client-metadata.decorator");
const models_1 = require("./models");
const models_2 = require("../../common/models");
const database_recommendations_response_1 = require("./dto/database-recommendations.response");
const dto_1 = require("./dto");
let DatabaseRecommendationController = class DatabaseRecommendationController {
    constructor(service) {
        this.service = service;
    }
    async list(clientMetadata) {
        return this.service.list(clientMetadata);
    }
    async read(clientMetadata) {
        return this.service.read(clientMetadata);
    }
    async modify(id, clientMetadata, dto) {
        return await this.service.update(clientMetadata, id, dto);
    }
    async bulkDeleteDatabaseRecommendation(clientMetadata, dto) {
        return await this.service.bulkDelete(clientMetadata, dto.ids);
    }
};
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 200,
        description: 'Get database recommendations',
        responses: [
            {
                status: 200,
                type: database_recommendations_response_1.DatabaseRecommendationsResponse,
            },
        ],
    }),
    (0, common_1.Get)(''),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_2.ClientMetadata]),
    __metadata("design:returntype", Promise)
], DatabaseRecommendationController.prototype, "list", null);
__decorate([
    (0, common_1.Patch)('/read'),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 200,
        description: 'Mark all database recommendations as read',
        responses: [
            {
                status: 200,
            },
        ],
    }),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_2.ClientMetadata]),
    __metadata("design:returntype", Promise)
], DatabaseRecommendationController.prototype, "read", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Update database recommendation by id',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Updated database recommendation\' response',
                type: models_1.DatabaseRecommendation,
            },
        ],
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_2.ClientMetadata,
        dto_1.ModifyDatabaseRecommendationDto]),
    __metadata("design:returntype", Promise)
], DatabaseRecommendationController.prototype, "modify", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 200,
        description: 'Delete many recommendations by ids',
        responses: [
            {
                status: 200,
                description: 'Delete many recommendations by ids response',
                type: dto_1.DeleteDatabaseRecommendationDto,
            },
        ],
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    })),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_2.ClientMetadata,
        dto_1.DeleteDatabaseRecommendationDto]),
    __metadata("design:returntype", Promise)
], DatabaseRecommendationController.prototype, "bulkDeleteDatabaseRecommendation", null);
DatabaseRecommendationController = __decorate([
    (0, swagger_1.ApiTags)('Database Recommendations'),
    (0, common_1.Controller)('/recommendations'),
    __metadata("design:paramtypes", [database_recommendation_service_1.DatabaseRecommendationService])
], DatabaseRecommendationController);
exports.DatabaseRecommendationController = DatabaseRecommendationController;
