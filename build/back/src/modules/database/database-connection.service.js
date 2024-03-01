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
exports.DatabaseConnectionService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const database_repository_1 = require("./repositories/database.repository");
const database_analytics_1 = require("./database.analytics");
const database_info_provider_1 = require("./providers/database-info.provider");
const database_recommendation_service_1 = require("../database-recommendation/database-recommendation.service");
const database_client_factory_1 = require("./providers/database.client.factory");
const client_1 = require("../redis/client");
let DatabaseConnectionService = class DatabaseConnectionService {
    constructor(databaseClientFactory, databaseInfoProvider, repository, analytics, recommendationService) {
        this.databaseClientFactory = databaseClientFactory;
        this.databaseInfoProvider = databaseInfoProvider;
        this.repository = repository;
        this.analytics = analytics;
        this.recommendationService = recommendationService;
        this.logger = new common_1.Logger('DatabaseConnectionService');
    }
    async connect(clientMetadata) {
        const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
        const toUpdate = {
            new: false,
            lastConnection: new Date(),
            modules: await this.databaseInfoProvider.determineDatabaseModules(client),
            version: await this.databaseInfoProvider.determineDatabaseServer(client),
        };
        if ((client === null || client === void 0 ? void 0 : client.getConnectionType()) === client_1.RedisClientConnectionType.CLUSTER) {
            toUpdate.nodes = (await client.nodes()).map(({ options }) => ({
                host: options.host,
                port: options.port,
            }));
        }
        await this.repository.update(clientMetadata.databaseId, toUpdate);
        const generalInfo = await this.databaseInfoProvider.getRedisGeneralInfo(client);
        this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.REDIS_VERSION, generalInfo);
        this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.LUA_SCRIPT, generalInfo);
        this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.BIG_AMOUNT_OF_CONNECTED_CLIENTS, generalInfo);
        this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.LUA_TO_FUNCTIONS, { client, databaseId: clientMetadata.databaseId, info: generalInfo });
        this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.FUNCTIONS_WITH_KEYSPACE, { client, databaseId: clientMetadata.databaseId });
        this.collectClientInfo(clientMetadata, client, generalInfo === null || generalInfo === void 0 ? void 0 : generalInfo.version);
        this.logger.log(`Succeed to connect to database ${clientMetadata.databaseId}`);
    }
    async collectClientInfo(clientMetadata, client, version) {
        try {
            const intVersion = parseInt(version, 10) || 0;
            const clients = await this.databaseInfoProvider.getClientListInfo(client) || [];
            this.analytics.sendDatabaseConnectedClientListEvent(clientMetadata.databaseId, {
                clients: clients.map((c) => ({
                    version: version || 'n/a',
                    resp: intVersion < 7 ? undefined : (c === null || c === void 0 ? void 0 : c['resp']) || 'n/a',
                    libName: intVersion < 7 ? undefined : (c === null || c === void 0 ? void 0 : c['lib-name']) || 'n/a',
                    libVer: intVersion < 7 ? undefined : (c === null || c === void 0 ? void 0 : c['lib-ver']) || 'n/a',
                })),
            });
        }
        catch (error) {
        }
    }
};
DatabaseConnectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory,
        database_info_provider_1.DatabaseInfoProvider,
        database_repository_1.DatabaseRepository,
        database_analytics_1.DatabaseAnalytics,
        database_recommendation_service_1.DatabaseRecommendationService])
], DatabaseConnectionService);
exports.DatabaseConnectionService = DatabaseConnectionService;
