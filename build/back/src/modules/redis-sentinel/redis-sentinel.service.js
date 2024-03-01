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
exports.RedisSentinelService = void 0;
const common_1 = require("@nestjs/common");
const models_1 = require("../../common/models");
const database_service_1 = require("../database/database.service");
const utils_1 = require("../../utils");
const redis_sentinel_analytics_1 = require("./redis-sentinel.analytics");
const database_factory_1 = require("../database/providers/database.factory");
const utils_2 = require("../redis/utils");
const redis_client_factory_1 = require("../redis/redis.client.factory");
let RedisSentinelService = class RedisSentinelService {
    constructor(redisClientFactory, databaseService, databaseFactory, redisSentinelAnalytics) {
        this.redisClientFactory = redisClientFactory;
        this.databaseService = databaseService;
        this.databaseFactory = databaseFactory;
        this.redisSentinelAnalytics = redisSentinelAnalytics;
        this.logger = new common_1.Logger('RedisSentinelService');
    }
    async createSentinelDatabases(dto) {
        this.logger.log('Adding Sentinel masters.');
        const result = [];
        const { masters, ...connectionOptions } = dto;
        try {
            await Promise.all(masters.map(async (master) => {
                var _a;
                const { alias, name, password, username, db, } = master;
                try {
                    const model = await this.databaseService.create({
                        ...connectionOptions,
                        name: alias,
                        db,
                        sentinelMaster: {
                            name,
                            username,
                            password,
                        },
                    });
                    result.push({
                        id: model.id,
                        name,
                        status: models_1.ActionStatus.Success,
                        message: 'Added',
                    });
                }
                catch (error) {
                    result.push({
                        name,
                        status: models_1.ActionStatus.Fail,
                        message: (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.message,
                        error: error === null || error === void 0 ? void 0 : error.response,
                    });
                }
            }));
            return result;
        }
        catch (error) {
            this.logger.error('Failed to add Sentinel masters.', error);
            throw (0, utils_1.getRedisConnectionException)(error, connectionOptions);
        }
    }
    async getSentinelMasters(dto) {
        this.logger.log('Connection and getting sentinel masters.');
        let result;
        try {
            const database = await this.databaseFactory.createStandaloneDatabaseModel(dto);
            const client = await this.redisClientFactory.getConnectionStrategy().createStandaloneClient({
                sessionMetadata: {},
                databaseId: database.id,
                context: models_1.ClientContext.Common,
            }, database, { useRetry: false });
            result = await (0, utils_2.discoverSentinelMasterGroups)(client);
            this.redisSentinelAnalytics.sendGetSentinelMastersSucceedEvent(result);
            await client.disconnect();
        }
        catch (error) {
            const exception = (0, utils_1.getRedisConnectionException)(error, dto);
            this.redisSentinelAnalytics.sendGetSentinelMastersFailedEvent(exception);
            throw exception;
        }
        return result;
    }
};
RedisSentinelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_client_factory_1.RedisClientFactory,
        database_service_1.DatabaseService,
        database_factory_1.DatabaseFactory,
        redis_sentinel_analytics_1.RedisSentinelAnalytics])
], RedisSentinelService);
exports.RedisSentinelService = RedisSentinelService;
