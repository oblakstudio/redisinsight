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
exports.DatabaseFactory = void 0;
const common_1 = require("@nestjs/common");
const database_entity_1 = require("../entities/database.entity");
const utils_1 = require("../../../utils");
const models_1 = require("../../../common/models");
const error_messages_1 = require("../../../constants/error-messages");
const redis_service_1 = require("../../redis/redis.service");
const database_info_provider_1 = require("./database-info.provider");
const constants_1 = require("../../../constants");
const ca_certificate_service_1 = require("../../certificate/ca-certificate.service");
const client_certificate_service_1 = require("../../certificate/client-certificate.service");
const redis_connection_factory_1 = require("../../redis/redis-connection.factory");
let DatabaseFactory = class DatabaseFactory {
    constructor(redisService, redisConnectionFactory, databaseInfoProvider, caCertificateService, clientCertificateService) {
        this.redisService = redisService;
        this.redisConnectionFactory = redisConnectionFactory;
        this.databaseInfoProvider = databaseInfoProvider;
        this.caCertificateService = caCertificateService;
        this.clientCertificateService = clientCertificateService;
        this.logger = new common_1.Logger('DatabaseFactory');
    }
    async createDatabaseModel(database) {
        let model = await this.createStandaloneDatabaseModel(database);
        const client = await this.redisConnectionFactory.createStandaloneConnection({
            sessionMetadata: {},
            databaseId: database.id,
            context: models_1.ClientContext.Common,
        }, database, { useRetry: false });
        if (await this.databaseInfoProvider.isSentinel(client)) {
            if (!database.sentinelMaster) {
                throw new Error(constants_1.RedisErrorCodes.SentinelParamsRequired);
            }
            model = await this.createSentinelDatabaseModel(database, client);
        }
        else if (await this.databaseInfoProvider.isCluster(client)) {
            model = await this.createClusterDatabaseModel(database, client);
        }
        model.modules = await this.databaseInfoProvider.determineDatabaseModules(client);
        model.version = await this.databaseInfoProvider.determineDatabaseServer(client);
        model.lastConnection = new Date();
        await client.disconnect();
        return model;
    }
    async createStandaloneDatabaseModel(database) {
        var _a, _b, _c, _d;
        const model = database;
        model.connectionType = database_entity_1.ConnectionType.STANDALONE;
        if (!model.provider) {
            model.provider = (0, utils_1.getHostingProvider)(model.host);
        }
        if ((_a = model.caCert) === null || _a === void 0 ? void 0 : _a.id) {
            model.caCert = await this.caCertificateService.get((_b = model.caCert) === null || _b === void 0 ? void 0 : _b.id);
        }
        if ((_c = model.clientCert) === null || _c === void 0 ? void 0 : _c.id) {
            model.clientCert = await this.clientCertificateService.get((_d = model.clientCert) === null || _d === void 0 ? void 0 : _d.id);
        }
        return model;
    }
    async createClusterDatabaseModel(database, client) {
        try {
            const model = database;
            model.nodes = await this.databaseInfoProvider.determineClusterNodes(client);
            const clusterClient = await this.redisConnectionFactory.createClusterConnection({
                sessionMetadata: {},
                databaseId: model.id,
                context: models_1.ClientContext.Common,
            }, model, { useRetry: false });
            const primaryNodeOptions = clusterClient.nodes('master')[0].options;
            model.host = primaryNodeOptions.host;
            model.port = primaryNodeOptions.port;
            model.connectionType = database_entity_1.ConnectionType.CLUSTER;
            await clusterClient.disconnect();
            return model;
        }
        catch (error) {
            this.logger.error('Failed to add oss cluster.', error);
            throw (0, utils_1.catchRedisConnectionError)(error, database);
        }
    }
    async createSentinelDatabaseModel(database, client) {
        try {
            const model = database;
            const masters = await this.databaseInfoProvider.determineSentinelMasterGroups(client);
            const selectedMaster = masters.find((master) => master.name === model.sentinelMaster.name);
            if (!selectedMaster) {
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.MASTER_GROUP_NOT_EXIST));
            }
            const sentinelClient = await this.redisConnectionFactory.createSentinelConnection({
                sessionMetadata: {},
                databaseId: model.id,
                context: models_1.ClientContext.Common,
            }, model, { useRetry: false });
            model.connectionType = database_entity_1.ConnectionType.SENTINEL;
            model.nodes = selectedMaster.nodes;
            await sentinelClient.disconnect();
            return model;
        }
        catch (error) {
            this.logger.error('Failed to create database sentinel model.', error);
            throw (0, utils_1.catchRedisConnectionError)(error, database);
        }
    }
};
DatabaseFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        redis_connection_factory_1.RedisConnectionFactory,
        database_info_provider_1.DatabaseInfoProvider,
        ca_certificate_service_1.CaCertificateService,
        client_certificate_service_1.ClientCertificateService])
], DatabaseFactory);
exports.DatabaseFactory = DatabaseFactory;
