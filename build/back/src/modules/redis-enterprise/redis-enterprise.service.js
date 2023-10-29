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
exports.RedisEnterpriseService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const https = require("https");
const error_messages_1 = require("../../constants/error-messages");
const redis_enterprise_database_1 = require("./models/redis-enterprise-database");
const cluster_dto_1 = require("./dto/cluster.dto");
const redis_enterprise_converter_1 = require("./utils/redis-enterprise-converter");
const redis_enterprise_analytics_1 = require("./redis-enterprise.analytics");
const database_entity_1 = require("../database/entities/database.entity");
const database_service_1 = require("../database/database.service");
const models_1 = require("../../common/models");
let RedisEnterpriseService = class RedisEnterpriseService {
    constructor(databaseService, analytics) {
        this.databaseService = databaseService;
        this.analytics = analytics;
        this.logger = new common_1.Logger('RedisEnterpriseBusinessService');
        this.api = axios_1.default.create({
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        });
    }
    async getDatabases(dto) {
        this.logger.log('Getting RE cluster databases.');
        const { host, port, username, password, } = dto;
        const auth = { username, password };
        try {
            const { data } = await this.api.get(`https://${host}:${port}/v1/bdbs`, {
                auth,
            });
            this.logger.log('Succeed to get RE cluster databases.');
            const result = this.parseClusterDbsResponse(data);
            this.analytics.sendGetREClusterDbsSucceedEvent(result);
            return result;
        }
        catch (error) {
            const { response } = error;
            let exception;
            this.logger.error(`Failed to get RE cluster databases. ${error.message}`);
            if ((response === null || response === void 0 ? void 0 : response.status) === 401 || (response === null || response === void 0 ? void 0 : response.status) === 403) {
                exception = new common_1.ForbiddenException(error_messages_1.default.INCORRECT_CREDENTIALS(`${host}:${port}`));
            }
            else {
                exception = new common_1.BadRequestException(error_messages_1.default.INCORRECT_DATABASE_URL(`${host}:${port}`));
            }
            this.analytics.sendGetREClusterDbsFailedEvent(exception);
            throw exception;
        }
    }
    parseClusterDbsResponse(databases) {
        const result = [];
        databases.forEach((database) => {
            var _a;
            const { uid, name, crdt, tls_mode, crdt_replica_id, } = database;
            const externalEndpoint = this.getDatabaseExternalEndpoint(database);
            if (!externalEndpoint) {
                return;
            }
            const dbName = crdt ? `${name}-${crdt_replica_id}` : name;
            const dnsName = externalEndpoint.dns_name;
            const address = externalEndpoint.addr[0];
            result.push(new cluster_dto_1.RedisEnterpriseDatabase({
                uid,
                name: dbName,
                dnsName,
                address,
                port: externalEndpoint.port,
                password: database.authentication_redis_pass,
                status: database.status,
                tls: tls_mode === 'enabled',
                modules: database.module_list.map((module) => (0, redis_enterprise_converter_1.convertREClusterModuleName)(module.module_name)),
                options: {
                    enabledDataPersistence: database.data_persistence
                        !== redis_enterprise_database_1.RedisEnterpriseDatabasePersistence.Disabled,
                    persistencePolicy: this.getDatabasePersistencePolicy(database),
                    enabledRedisFlash: database.bigstore,
                    enabledReplication: database.replication,
                    enabledBackup: database.backup,
                    enabledActiveActive: database.crdt,
                    enabledClustering: database.shards_count > 1,
                    isReplicaDestination: !!((_a = database === null || database === void 0 ? void 0 : database.replica_sources) === null || _a === void 0 ? void 0 : _a.length),
                    isReplicaSource: !!this.findReplicasForDatabase(databases, database)
                        .length,
                },
            }));
        });
        return result;
    }
    getDatabaseExternalEndpoint(database) {
        var _a;
        return (_a = database.endpoints) === null || _a === void 0 ? void 0 : _a.filter((endpoint) => endpoint.addr_type === 'external')[0];
    }
    getDatabasePersistencePolicy(database) {
        const { data_persistence, aof_policy, snapshot_policy } = database;
        if (data_persistence === redis_enterprise_database_1.RedisEnterpriseDatabasePersistence.Aof) {
            return aof_policy === redis_enterprise_database_1.RedisEnterpriseDatabaseAofPolicy.AofEveryOneSecond
                ? redis_enterprise_database_1.RedisEnterprisePersistencePolicy.AofEveryOneSecond
                : redis_enterprise_database_1.RedisEnterprisePersistencePolicy.AofEveryWrite;
        }
        if (data_persistence === redis_enterprise_database_1.RedisEnterpriseDatabasePersistence.Snapshot) {
            const { secs } = snapshot_policy.pop();
            if (secs === 3600) {
                return redis_enterprise_database_1.RedisEnterprisePersistencePolicy.SnapshotEveryOneHour;
            }
            if (secs === 21600) {
                return redis_enterprise_database_1.RedisEnterprisePersistencePolicy.SnapshotEverySixHours;
            }
            if (secs === 43200) {
                return redis_enterprise_database_1.RedisEnterprisePersistencePolicy.SnapshotEveryTwelveHours;
            }
        }
        return redis_enterprise_database_1.RedisEnterprisePersistencePolicy.None;
    }
    findReplicasForDatabase(databases, sourceDatabase) {
        const sourceEndpoint = this.getDatabaseExternalEndpoint(sourceDatabase);
        if (!sourceEndpoint) {
            return [];
        }
        return databases.filter((replica) => {
            const replicaSources = replica.replica_sources;
            if (replica.uid === sourceDatabase.uid || !(replicaSources === null || replicaSources === void 0 ? void 0 : replicaSources.length)) {
                return false;
            }
            return replicaSources.some((source) => source.uri.includes(`${sourceEndpoint.dns_name}:${sourceEndpoint.port}`));
        });
    }
    async addRedisEnterpriseDatabases(connectionDetails, uids) {
        this.logger.log('Adding Redis Enterprise databases.');
        let result;
        try {
            const databases = await this.getDatabases(connectionDetails);
            result = await Promise.all(uids.map(async (uid) => {
                const database = databases.find((db) => db.uid === uid);
                if (!database) {
                    const exception = new common_1.NotFoundException();
                    return {
                        uid,
                        status: models_1.ActionStatus.Fail,
                        message: exception.message,
                        error: exception === null || exception === void 0 ? void 0 : exception.getResponse(),
                    };
                }
                try {
                    const { port, name, dnsName, password, } = database;
                    const host = connectionDetails.host === 'localhost' ? 'localhost' : dnsName;
                    delete database.password;
                    await this.databaseService.create({
                        host,
                        port,
                        name,
                        nameFromProvider: name,
                        password,
                        provider: database_entity_1.HostingProvider.RE_CLUSTER,
                    });
                    return {
                        uid,
                        status: models_1.ActionStatus.Success,
                        message: 'Added',
                        databaseDetails: database,
                    };
                }
                catch (error) {
                    return {
                        uid,
                        status: models_1.ActionStatus.Fail,
                        message: error.message,
                        databaseDetails: database,
                        error: error === null || error === void 0 ? void 0 : error.response,
                    };
                }
            }));
        }
        catch (error) {
            this.logger.error('Failed to add Redis Enterprise databases', error);
            throw error;
        }
        return result;
    }
};
RedisEnterpriseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        redis_enterprise_analytics_1.RedisEnterpriseAnalytics])
], RedisEnterpriseService);
exports.RedisEnterpriseService = RedisEnterpriseService;
