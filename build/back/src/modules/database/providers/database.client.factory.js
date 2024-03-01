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
exports.DatabaseClientFactory = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../utils");
const database_repository_1 = require("../repositories/database.repository");
const database_analytics_1 = require("../database.analytics");
const database_service_1 = require("../database.service");
const database_entity_1 = require("../entities/database.entity");
const redis_client_factory_1 = require("../../redis/redis.client.factory");
const redis_client_storage_1 = require("../../redis/redis.client.storage");
let DatabaseClientFactory = class DatabaseClientFactory {
    constructor(databaseService, repository, analytics, redisClientStorage, redisClientFactory) {
        this.databaseService = databaseService;
        this.repository = repository;
        this.analytics = analytics;
        this.redisClientStorage = redisClientStorage;
        this.redisClientFactory = redisClientFactory;
        this.logger = new common_1.Logger('DatabaseClientFactory');
    }
    async getOrCreateClient(clientMetadata) {
        this.logger.log('Trying to get existing redis client.');
        const client = await this.redisClientStorage.getByMetadata(clientMetadata);
        if (client) {
            return client;
        }
        return this.redisClientStorage.set(await this.createClient(clientMetadata));
    }
    async createClient(clientMetadata, options) {
        this.logger.log('Creating new redis client.');
        const database = await this.databaseService.get(clientMetadata.databaseId);
        try {
            const client = await this.redisClientFactory.createClient(clientMetadata, database, options);
            if (database.connectionType === database_entity_1.ConnectionType.NOT_CONNECTED) {
                await this.repository.update(database.id, {
                    connectionType: client.getConnectionType(),
                });
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
    async deleteClient(clientMetadata) {
        this.logger.log('Trying to delete existing redis client.');
        const client = await this.redisClientStorage.getByMetadata(clientMetadata);
        return this.redisClientStorage.remove(client === null || client === void 0 ? void 0 : client.id);
    }
};
DatabaseClientFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        database_repository_1.DatabaseRepository,
        database_analytics_1.DatabaseAnalytics,
        redis_client_storage_1.RedisClientStorage,
        redis_client_factory_1.RedisClientFactory])
], DatabaseClientFactory);
exports.DatabaseClientFactory = DatabaseClientFactory;
