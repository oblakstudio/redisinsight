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
var RedisClientFactory_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClientFactory = exports.RedisClientLib = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../utils");
const database_entity_1 = require("../database/entities/database.entity");
const ioredis_redis_connection_strategy_1 = require("./connection/ioredis.redis.connection.strategy");
const feature_service_1 = require("../feature/feature.service");
const node_redis_connection_strategy_1 = require("./connection/node.redis.connection.strategy");
const constants_1 = require("../feature/constants");
const config_1 = require("../../utils/config");
const REDIS_CLIENTS_CONFIG = config_1.default.get('redis_clients');
var RedisClientLib;
(function (RedisClientLib) {
    RedisClientLib["IOREDIS"] = "ioredis";
    RedisClientLib["NODE_REDIS"] = "node-redis";
})(RedisClientLib = exports.RedisClientLib || (exports.RedisClientLib = {}));
let RedisClientFactory = RedisClientFactory_1 = class RedisClientFactory {
    constructor(ioredisConnectionStrategy, nodeRedisConnectionStrategy, featureService) {
        this.ioredisConnectionStrategy = ioredisConnectionStrategy;
        this.nodeRedisConnectionStrategy = nodeRedisConnectionStrategy;
        this.featureService = featureService;
        this.logger = new common_1.Logger('RedisClientFactory');
        this.defaultConnectionStrategy = ioredisConnectionStrategy;
    }
    async onModuleInit() {
        var _a;
        try {
            const feature = await this.featureService.getByName(constants_1.KnownFeatures.RedisClient);
            this.defaultConnectionStrategy = this.getConnectionStrategy((_a = feature === null || feature === void 0 ? void 0 : feature.data) === null || _a === void 0 ? void 0 : _a.strategy);
        }
        catch (e) {
            this.logger.warn('Unable to setup default strategy from the feature config');
        }
    }
    getConnectionStrategy(strategy) {
        switch (strategy || REDIS_CLIENTS_CONFIG.forceStrategy) {
            case RedisClientLib.NODE_REDIS:
                return this.nodeRedisConnectionStrategy;
            case RedisClientLib.IOREDIS:
                return this.ioredisConnectionStrategy;
            default:
                return this.defaultConnectionStrategy;
        }
    }
    async createClientAutomatically(clientMetadata, database, options = {}) {
        const opts = RedisClientFactory_1.prepareConnectionOptions(options);
        const connectionStrategy = this.getConnectionStrategy(opts.clientLib);
        if (database.sentinelMaster) {
            try {
                return connectionStrategy.createSentinelClient(clientMetadata, database, opts);
            }
            catch (e) {
            }
        }
        try {
            return await connectionStrategy.createClusterClient(clientMetadata, database, opts);
        }
        catch (e) {
        }
        return connectionStrategy.createStandaloneClient(clientMetadata, database, opts);
    }
    async createClient(clientMetadata, db, options = {}) {
        const database = (0, utils_1.cloneClassInstance)(db);
        Object.keys(database).forEach((key) => {
            if (database[key] === null) {
                delete database[key];
            }
        });
        const opts = RedisClientFactory_1.prepareConnectionOptions(options);
        const connectionStrategy = this.getConnectionStrategy(opts.clientLib);
        let client;
        switch (database.connectionType) {
            case database_entity_1.ConnectionType.STANDALONE:
                client = await connectionStrategy.createStandaloneClient(clientMetadata, database, opts);
                break;
            case database_entity_1.ConnectionType.CLUSTER:
                client = await connectionStrategy.createClusterClient(clientMetadata, database, opts);
                break;
            case database_entity_1.ConnectionType.SENTINEL:
                client = await connectionStrategy.createSentinelClient(clientMetadata, database, opts);
                break;
            default:
                client = await this.createClientAutomatically(clientMetadata, database, opts);
        }
        return client;
    }
    static prepareConnectionOptions(options = {}) {
        return {
            useRetry: true,
            ...options,
        };
    }
};
RedisClientFactory = RedisClientFactory_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ioredis_redis_connection_strategy_1.IoredisRedisConnectionStrategy,
        node_redis_connection_strategy_1.NodeRedisConnectionStrategy,
        feature_service_1.FeatureService])
], RedisClientFactory);
exports.RedisClientFactory = RedisClientFactory;
