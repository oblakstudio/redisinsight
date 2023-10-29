"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseRecommendationModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseRecommendationModule = void 0;
const common_1 = require("@nestjs/common");
const database_recommendation_controller_1 = require("./database-recommendation.controller");
const database_recommendation_service_1 = require("./database-recommendation.service");
const recommendations_scanner_1 = require("./scanner/recommendations.scanner");
const recommendation_provider_1 = require("./scanner/recommendation.provider");
const database_recommendation_repository_1 = require("./repositories/database-recommendation.repository");
const local_database_recommendation_repository_1 = require("./repositories/local.database.recommendation.repository");
const database_recommendation_gateway_1 = require("./database-recommendation.gateway");
const database_recommendation_emitter_1 = require("./providers/database-recommendation.emitter");
const database_recommendation_analytics_1 = require("./database-recommendation.analytics");
let DatabaseRecommendationModule = DatabaseRecommendationModule_1 = class DatabaseRecommendationModule {
    static register(databaseRecommendationRepository = local_database_recommendation_repository_1.LocalDatabaseRecommendationRepository) {
        return {
            module: DatabaseRecommendationModule_1,
            controllers: [database_recommendation_controller_1.DatabaseRecommendationController],
            providers: [
                database_recommendation_service_1.DatabaseRecommendationService,
                recommendations_scanner_1.RecommendationScanner,
                recommendation_provider_1.RecommendationProvider,
                database_recommendation_gateway_1.DatabaseRecommendationGateway,
                database_recommendation_emitter_1.DatabaseRecommendationEmitter,
                database_recommendation_analytics_1.DatabaseRecommendationAnalytics,
                {
                    provide: database_recommendation_repository_1.DatabaseRecommendationRepository,
                    useClass: databaseRecommendationRepository,
                },
            ],
            exports: [database_recommendation_service_1.DatabaseRecommendationService, recommendations_scanner_1.RecommendationScanner],
        };
    }
};
DatabaseRecommendationModule = DatabaseRecommendationModule_1 = __decorate([
    (0, common_1.Module)({})
], DatabaseRecommendationModule);
exports.DatabaseRecommendationModule = DatabaseRecommendationModule;
