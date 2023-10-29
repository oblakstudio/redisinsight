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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseRecommendationService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const class_transformer_1 = require("class-transformer");
const database_recommendation_repository_1 = require("./repositories/database-recommendation.repository");
const models_1 = require("./models");
const recommendations_scanner_1 = require("./scanner/recommendations.scanner");
const database_recommendation_analytics_1 = require("./database-recommendation.analytics");
const database_service_1 = require("../database/database.service");
let DatabaseRecommendationService = class DatabaseRecommendationService {
    constructor(databaseRecommendationRepository, scanner, databaseService, analytics) {
        this.databaseRecommendationRepository = databaseRecommendationRepository;
        this.scanner = scanner;
        this.databaseService = databaseService;
        this.analytics = analytics;
        this.logger = new common_1.Logger('DatabaseRecommendationService');
    }
    async create(clientMetadata, entity) {
        const recommendation = await this.databaseRecommendationRepository.create(entity);
        const database = await this.databaseService.get(clientMetadata === null || clientMetadata === void 0 ? void 0 : clientMetadata.databaseId);
        this.analytics.sendCreatedRecommendationEvent(recommendation, database);
        return recommendation;
    }
    async list(clientMetadata) {
        var _a, _b, _c;
        this.logger.log('Getting database recommendations');
        const db = (_c = (_a = clientMetadata.db) !== null && _a !== void 0 ? _a : (_b = (await this.databaseService.get(clientMetadata.databaseId))) === null || _b === void 0 ? void 0 : _b.db) !== null && _c !== void 0 ? _c : 0;
        return this.databaseRecommendationRepository.list({ ...clientMetadata, db });
    }
    async check(clientMetadata, recommendationName, data) {
        var _a, _b, _c;
        try {
            const newClientMetadata = {
                ...clientMetadata,
                db: (_c = (_a = clientMetadata.db) !== null && _a !== void 0 ? _a : (_b = (await this.databaseService.get(clientMetadata.databaseId))) === null || _b === void 0 ? void 0 : _b.db) !== null && _c !== void 0 ? _c : 0,
            };
            const isRecommendationExist = await this.databaseRecommendationRepository.isExist(newClientMetadata, recommendationName);
            if (!isRecommendationExist) {
                const recommendation = await this.scanner.determineRecommendation(recommendationName, data);
                if (recommendation) {
                    const entity = (0, class_transformer_1.plainToClass)(models_1.DatabaseRecommendation, { databaseId: newClientMetadata === null || newClientMetadata === void 0 ? void 0 : newClientMetadata.databaseId, ...recommendation });
                    return await this.create(newClientMetadata, entity);
                }
            }
            return null;
        }
        catch (e) {
            this.logger.warn('Unable to check recommendation', e);
            return null;
        }
    }
    async read(clientMetadata) {
        this.logger.log('Reading database recommendations');
        return this.databaseRecommendationRepository.read(clientMetadata);
    }
    async update(clientMetadata, id, dto) {
        this.logger.log(`Update database extended recommendations id:${id}`);
        return this.databaseRecommendationRepository.update(clientMetadata, id, dto);
    }
    async sync(clientMetadata, recommendations) {
        return this.databaseRecommendationRepository.sync(clientMetadata, recommendations);
    }
    async delete(clientMetadata, id) {
        this.logger.log(`Deleting recommendation: ${id}`);
        await this.databaseRecommendationRepository.delete(clientMetadata, id);
    }
    async bulkDelete(clientMetadata, ids) {
        this.logger.log(`Deleting many recommendations: ${ids}`);
        return {
            affected: (0, lodash_1.sum)(await Promise.all(ids.map(async (id) => {
                try {
                    await this.delete(clientMetadata, id);
                    return 1;
                }
                catch (e) {
                    return 0;
                }
            }))),
        };
    }
};
DatabaseRecommendationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_recommendation_repository_1.DatabaseRecommendationRepository,
        recommendations_scanner_1.RecommendationScanner,
        database_service_1.DatabaseService,
        database_recommendation_analytics_1.DatabaseRecommendationAnalytics])
], DatabaseRecommendationService);
exports.DatabaseRecommendationService = DatabaseRecommendationService;
