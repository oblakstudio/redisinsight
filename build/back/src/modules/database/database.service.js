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
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const database_1 = require("./models/database");
const error_messages_1 = require("../../constants/error-messages");
const database_repository_1 = require("./repositories/database.repository");
const database_analytics_1 = require("./database.analytics");
const utils_1 = require("../../utils");
const database_info_provider_1 = require("./providers/database-info.provider");
const database_factory_1 = require("./providers/database.factory");
const constants_1 = require("../../constants");
const event_emitter_1 = require("@nestjs/event-emitter");
const models_1 = require("../../common/models");
const export_database_1 = require("./models/export-database");
const utils_2 = require("../../common/utils");
const redis_client_factory_1 = require("../redis/redis.client.factory");
const redis_client_storage_1 = require("../redis/redis.client.storage");
let DatabaseService = DatabaseService_1 = class DatabaseService {
    constructor(repository, redisClientStorage, redisClientFactory, databaseInfoProvider, databaseFactory, analytics, eventEmitter) {
        this.repository = repository;
        this.redisClientStorage = redisClientStorage;
        this.redisClientFactory = redisClientFactory;
        this.databaseInfoProvider = databaseInfoProvider;
        this.databaseFactory = databaseFactory;
        this.analytics = analytics;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger('DatabaseService');
        this.exportSecurityFields = [
            'password',
            'clientCert.key',
            'sshOptions.password',
            'sshOptions.passphrase',
            'sshOptions.privateKey',
            'sentinelMaster.password',
        ];
    }
    static isConnectionAffected(dto) {
        return Object.keys((0, lodash_1.omitBy)(dto, lodash_1.isUndefined)).some((field) => this.connectionFields.includes(field));
    }
    async merge(database, dto) {
        const updatedDatabase = database;
        if (dto === null || dto === void 0 ? void 0 : dto.caCert) {
            updatedDatabase.caCert = dto.caCert;
        }
        if (dto === null || dto === void 0 ? void 0 : dto.clientCert) {
            updatedDatabase.clientCert = dto.clientCert;
        }
        return (0, utils_2.deepMerge)(updatedDatabase, dto);
    }
    async exists(id) {
        this.logger.log(`Checking if database with ${id} exists.`);
        return this.repository.exists(id);
    }
    async list() {
        try {
            this.logger.log('Getting databases list');
            return await this.repository.list();
        }
        catch (e) {
            this.logger.error('Failed to get database instance list.', e);
            throw new common_1.InternalServerErrorException();
        }
    }
    async get(id, ignoreEncryptionErrors = false, omitFields) {
        this.logger.log(`Getting database ${id}`);
        if (!id) {
            this.logger.error('Database id was not provided');
            throw new common_1.NotFoundException(error_messages_1.default.INVALID_DATABASE_INSTANCE_ID);
        }
        const model = await this.repository.get(id, ignoreEncryptionErrors, omitFields);
        if (!model) {
            this.logger.error(`Database with ${id} was not Found`);
            throw new common_1.NotFoundException(error_messages_1.default.INVALID_DATABASE_INSTANCE_ID);
        }
        return model;
    }
    async create(dto, uniqueCheck = false) {
        try {
            this.logger.log('Creating new database.');
            const database = await this.repository.create({
                ...await this.databaseFactory.createDatabaseModel((0, utils_1.classToClass)(database_1.Database, dto)),
                new: true,
            }, uniqueCheck);
            try {
                const client = await this.redisClientFactory.createClient({
                    sessionMetadata: {},
                    databaseId: database.id,
                    context: models_1.ClientContext.Common,
                }, database);
                const redisInfo = await this.databaseInfoProvider.getRedisGeneralInfo(client);
                this.analytics.sendInstanceAddedEvent(database, redisInfo);
                await client.disconnect();
            }
            catch (e) {
            }
            return database;
        }
        catch (error) {
            this.logger.error('Failed to add database.', error);
            const exception = (0, utils_1.getRedisConnectionException)(error, dto);
            this.analytics.sendInstanceAddFailedEvent(exception);
            throw exception;
        }
    }
    async update(id, dto, manualUpdate = true) {
        this.logger.log(`Updating database: ${id}`);
        const oldDatabase = await this.get(id, true);
        let database;
        try {
            database = await this.merge(oldDatabase, dto);
            if (DatabaseService_1.isConnectionAffected(dto)) {
                database = await this.databaseFactory.createDatabaseModel(database);
                if (manualUpdate) {
                    database.provider = (0, utils_1.getHostingProvider)(database.host);
                }
                await this.redisClientStorage.removeManyByMetadata({ databaseId: id });
            }
            database = await this.repository.update(id, database);
            this.analytics.sendInstanceEditedEvent(oldDatabase, database, manualUpdate);
            return database;
        }
        catch (error) {
            this.logger.error(`Failed to update database instance ${id}`, error);
            throw (0, utils_1.catchRedisConnectionError)(error, database);
        }
    }
    async testConnection(dto, id) {
        let database;
        if (id) {
            this.logger.log('Testing existing database connection');
            database = await this.merge(await this.get(id, false), dto);
        }
        else {
            this.logger.log('Testing new database connection');
            database = (0, utils_1.classToClass)(database_1.Database, dto);
        }
        try {
            await this.databaseFactory.createDatabaseModel(database);
            return;
        }
        catch (error) {
            if (error.message === constants_1.RedisErrorCodes.SentinelParamsRequired) {
                return;
            }
            this.logger.error('Connection test failed', error);
            throw (0, utils_1.catchRedisConnectionError)(error, database);
        }
    }
    async clone(id, dto) {
        this.logger.log('Clone existing database');
        const database = await this.merge(await this.get(id, false, ['id', 'sshOptions.id']), dto);
        if (DatabaseService_1.isConnectionAffected(dto)) {
            return await this.create(database);
        }
        const createdDatabase = await this.repository.create({
            ...(0, utils_1.classToClass)(database_1.Database, database),
            new: true,
        }, false);
        this.analytics.sendInstanceAddedEvent(createdDatabase);
        return createdDatabase;
    }
    async delete(id) {
        this.logger.log(`Deleting database: ${id}`);
        const database = await this.get(id, true);
        try {
            await this.repository.delete(id);
            await this.redisClientStorage.removeManyByMetadata({ databaseId: id });
            this.logger.log('Succeed to delete database instance.');
            this.analytics.sendInstanceDeletedEvent(database);
            this.eventEmitter.emit(constants_1.AppRedisInstanceEvents.Deleted, id);
        }
        catch (error) {
            this.logger.error(`Failed to delete database: ${id}`, error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async bulkDelete(ids) {
        this.logger.log(`Deleting many database: ${ids}`);
        return {
            affected: (0, lodash_1.sum)(await Promise.all(ids.map(async (id) => {
                try {
                    await this.delete(id);
                    return 1;
                }
                catch (e) {
                    return 0;
                }
            }))),
        };
    }
    async export(ids, withSecrets = false) {
        const paths = !withSecrets ? this.exportSecurityFields : [];
        this.logger.log(`Exporting many database: ${ids}`);
        if (!ids.length) {
            this.logger.error('Database ids were not provided');
            throw new common_1.NotFoundException(error_messages_1.default.INVALID_DATABASE_INSTANCE_ID);
        }
        const entities = (0, lodash_1.reject)(await Promise.all(ids.map(async (id) => {
            try {
                return await this.get(id);
            }
            catch (e) {
            }
        })), lodash_1.isEmpty);
        return entities.map((database) => (0, utils_1.classToClass)(export_database_1.ExportDatabase, (0, lodash_1.omit)(database, paths), { groups: ['security'] }));
    }
};
DatabaseService.connectionFields = [
    'host',
    'port',
    'db',
    'username',
    'password',
    'tls',
    'tlsServername',
    'verifyServerCert',
    'sentinelMaster',
    'ssh',
    'sshOptions',
    'caCert',
    'clientCert',
];
DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_repository_1.DatabaseRepository,
        redis_client_storage_1.RedisClientStorage,
        redis_client_factory_1.RedisClientFactory,
        database_info_provider_1.DatabaseInfoProvider,
        database_factory_1.DatabaseFactory,
        database_analytics_1.DatabaseAnalytics,
        event_emitter_1.EventEmitter2])
], DatabaseService);
exports.DatabaseService = DatabaseService;
