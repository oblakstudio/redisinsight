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
exports.DatabaseAnalysisController = void 0;
const common_1 = require("@nestjs/common");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
const swagger_1 = require("@nestjs/swagger");
const database_analysis_service_1 = require("./database-analysis.service");
const models_1 = require("./models");
const interceptors_1 = require("../../common/interceptors");
const decorators_1 = require("../../common/decorators");
const dto_1 = require("./dto");
const models_2 = require("../../common/models");
let DatabaseAnalysisController = class DatabaseAnalysisController {
    constructor(service) {
        this.service = service;
    }
    async create(clientMetadata, dto) {
        return this.service.create(clientMetadata, dto);
    }
    async get(id) {
        return this.service.get(id);
    }
    async list(databaseId) {
        return this.service.list(databaseId);
    }
    async modify(id, dto) {
        return await this.service.vote(id, dto);
    }
};
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 201,
        description: 'Create new database analysis',
        responses: [
            {
                status: 201,
                type: models_1.DatabaseAnalysis,
            },
        ],
    }),
    (0, common_1.Post)(),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, decorators_1.ClientMetadataParam)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_2.ClientMetadata,
        dto_1.CreateDatabaseAnalysisDto]),
    __metadata("design:returntype", Promise)
], DatabaseAnalysisController.prototype, "create", null);
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 200,
        description: 'Get database analysis',
        responses: [
            {
                status: 200,
                type: models_1.DatabaseAnalysis,
            },
        ],
    }),
    (0, common_1.Get)(':id'),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DatabaseAnalysisController.prototype, "get", null);
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 200,
        description: 'Get database analysis',
        responses: [
            {
                status: 200,
                type: models_1.DatabaseAnalysis,
            },
        ],
    }),
    (0, common_1.Get)(''),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, common_1.Param)('dbInstance')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DatabaseAnalysisController.prototype, "list", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Update database instance by id',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Updated database instance\' response',
                type: models_1.DatabaseAnalysis,
            },
        ],
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.RecommendationVoteDto]),
    __metadata("design:returntype", Promise)
], DatabaseAnalysisController.prototype, "modify", null);
DatabaseAnalysisController = __decorate([
    (0, common_1.UseInterceptors)(interceptors_1.BrowserSerializeInterceptor),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiTags)('Database Analysis'),
    (0, common_1.Controller)('/analysis'),
    __metadata("design:paramtypes", [database_analysis_service_1.DatabaseAnalysisService])
], DatabaseAnalysisController);
exports.DatabaseAnalysisController = DatabaseAnalysisController;
