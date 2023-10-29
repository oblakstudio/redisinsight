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
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
const database_repository_1 = require("./repositories/database.repository");
const database_analytics_1 = require("./database.analytics");
const redis_service_1 = require("../redis/redis.service");
const database_service_1 = require("./database.service");
const database_info_provider_1 = require("./providers/database-info.provider");
const database_recommendation_service_1 = require("../database-recommendation/database-recommendation.service");
const database_entity_1 = require("./entities/database.entity");
const redis_connection_factory_1 = require("../redis/redis-connection.factory");
let DatabaseConnectionService = class DatabaseConnectionService {
    constructor(databaseService, databaseInfoProvider, repository, analytics, redisService, redisConnectionFactory, recommendationService) {
        this.databaseService = databaseService;
        this.databaseInfoProvider = databaseInfoProvider;
        this.repository = repository;
        this.analytics = analytics;
        this.redisService = redisService;
        this.redisConnectionFactory = redisConnectionFactory;
        this.recommendationService = recommendationService;
        this.logger = new common_1.Logger('DatabaseConnectionService');
    }
    async connect(clientMetadata) {
        const client = await this.getOrCreateClient(clientMetadata);
        const toUpdate = {
            new: false,
            lastConnection: new Date(),
            timeout: client.options.connectTimeout,
            modules: await this.databaseInfoProvider.determineDatabaseModules(client),
            version: await this.databaseInfoProvider.determineDatabaseServer(client),
        };
        if (client === null || client === void 0 ? void 0 : client.isCluster) {
            const primaryNodeOptions = client.nodes('master')[0].options;
            toUpdate.host = primaryNodeOptions.host;
            toUpdate.port = primaryNodeOptions.port;
            toUpdate.nodes = client.nodes().map(({ options }) => ({
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
    async getOrCreateClient(clientMetadata) {
        var _a, _b;
        this.logger.log('Getting database client.');
        let client = (_a = (await this.redisService.getClientInstance(clientMetadata))) === null || _a === void 0 ? void 0 : _a.client;
        if (client && this.redisService.isClientConnected(client)) {
            return client;
        }
        client = await this.createClient(clientMetadata);
        return (_b = this.redisService.setClientInstance(clientMetadata, client)) === null || _b === void 0 ? void 0 : _b.client;
    }
    async createClient(clientMetadata) {
        var _a, _b;
        this.logger.log('Creating database client.');
        const database = await this.databaseService.get(clientMetadata.databaseId);
        try {
            const client = await this.redisConnectionFactory.createRedisConnection(clientMetadata, database);
            if (database.connectionType === database_entity_1.ConnectionType.NOT_CONNECTED) {
                let connectionType = database_entity_1.ConnectionType.STANDALONE;
                if (client.isCluster) {
                    connectionType = database_entity_1.ConnectionType.CLUSTER;
                }
                if ((_b = (_a = client === null || client === void 0 ? void 0 : client.options) === null || _a === void 0 ? void 0 : _a['sentinels']) === null || _b === void 0 ? void 0 : _b.length) {
                    connectionType = database_entity_1.ConnectionType.SENTINEL;
                }
                await this.repository.update(database.id, { connectionType });
            }
            return client;
        }
        catch (error) {
            this.logger.error('Failed to create database client', error);
            const exception = (0, utils_1.getRedisConnectionException)(error, database, database.name);
            this.analytics.sendConnectionFailedEvent(database, exception);
            throw exception;
        }
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
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        database_info_provider_1.DatabaseInfoProvider,
        database_repository_1.DatabaseRepository,
        database_analytics_1.DatabaseAnalytics,
        redis_service_1.RedisService,
        redis_connection_factory_1.RedisConnectionFactory,
        database_recommendation_service_1.DatabaseRecommendationService])
], DatabaseConnectionService);
exports.DatabaseConnectionService = DatabaseConnectionService;
