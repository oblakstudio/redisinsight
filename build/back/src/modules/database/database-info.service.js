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
exports.DatabaseInfoService = void 0;
const common_1 = require("@nestjs/common");
const database_overview_provider_1 = require("./providers/database-overview.provider");
const database_recommendation_service_1 = require("../database-recommendation/database-recommendation.service");
const constants_1 = require("../../constants");
const database_client_factory_1 = require("./providers/database.client.factory");
const database_info_provider_1 = require("./providers/database-info.provider");
const database_service_1 = require("./database.service");
let DatabaseInfoService = class DatabaseInfoService {
    constructor(databaseClientFactory, databaseOverviewProvider, databaseInfoProvider, recommendationService, databaseService) {
        this.databaseClientFactory = databaseClientFactory;
        this.databaseOverviewProvider = databaseOverviewProvider;
        this.databaseInfoProvider = databaseInfoProvider;
        this.recommendationService = recommendationService;
        this.databaseService = databaseService;
        this.logger = new common_1.Logger('DatabaseInfoService');
    }
    async getInfo(clientMetadata) {
        this.logger.log(`Getting database info for: ${clientMetadata.databaseId}`);
        const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
        return this.databaseInfoProvider.getRedisGeneralInfo(client);
    }
    async getOverview(clientMetadata) {
        this.logger.log(`Getting database overview for: ${clientMetadata.databaseId}`);
        const client = await this.databaseClientFactory.getOrCreateClient({
            ...clientMetadata,
            db: undefined,
        });
        return this.databaseOverviewProvider.getOverview(clientMetadata, client);
    }
    async getDatabaseIndex(clientMetadata, db) {
        var _a, _b, _c, _d, _e;
        this.logger.log(`Connection to database index: ${db}`);
        let client;
        const prevDb = (_c = (_a = clientMetadata.db) !== null && _a !== void 0 ? _a : (_b = (await this.databaseService.get(clientMetadata.databaseId))) === null || _b === void 0 ? void 0 : _b.db) !== null && _c !== void 0 ? _c : 0;
        try {
            client = await this.databaseClientFactory.createClient({
                ...clientMetadata,
                db,
            });
            (_d = client === null || client === void 0 ? void 0 : client.disconnect) === null || _d === void 0 ? void 0 : _d.call(client);
            this.recommendationService.check({ ...clientMetadata, db }, constants_1.RECOMMENDATION_NAMES.AVOID_LOGICAL_DATABASES, { db, prevDb });
            return undefined;
        }
        catch (e) {
            this.logger.error(`Unable to connect to logical database: ${db}`, e);
            (_e = client === null || client === void 0 ? void 0 : client.disconnect) === null || _e === void 0 ? void 0 : _e.call(client);
            throw e;
        }
    }
};
DatabaseInfoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory,
        database_overview_provider_1.DatabaseOverviewProvider,
        database_info_provider_1.DatabaseInfoProvider,
        database_recommendation_service_1.DatabaseRecommendationService,
        database_service_1.DatabaseService])
], DatabaseInfoService);
exports.DatabaseInfoService = DatabaseInfoService;
