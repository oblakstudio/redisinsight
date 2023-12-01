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
exports.RedisConnectionFactory = void 0;
const ioredis_1 = require("ioredis");
const common_1 = require("@nestjs/common");
const config_1 = require("../../utils/config");
const lodash_1 = require("lodash");
const utils_1 = require("../../utils");
const database_entity_1 = require("../database/entities/database.entity");
const ssh_tunnel_provider_1 = require("../ssh/ssh-tunnel.provider");
const exceptions_1 = require("../ssh/exceptions");
const error_messages_1 = require("../../constants/error-messages");
const REDIS_CLIENTS_CONFIG = config_1.default.get('redis_clients');
let RedisConnectionFactory = class RedisConnectionFactory {
    constructor(sshTunnelProvider) {
        this.sshTunnelProvider = sshTunnelProvider;
        this.logger = new common_1.Logger('RedisConnectionFactory');
        this.retryStrategy = (times) => {
            if (times < REDIS_CLIENTS_CONFIG.retryTimes) {
                return Math.min(times * REDIS_CLIENTS_CONFIG.retryDelay, 2000);
            }
            return undefined;
        };
        this.dummyFn = () => undefined;
    }
    async getRedisOptions(clientMetadata, database, options) {
        const { host, port, password, username, tls, db, timeout, } = database;
        const redisOptions = {
            host,
            port,
            username,
            password,
            connectTimeout: timeout,
            db: (0, lodash_1.isNumber)(clientMetadata.db) ? clientMetadata.db : db,
            connectionName: (options === null || options === void 0 ? void 0 : options.connectionName)
                || (0, utils_1.generateRedisConnectionName)(clientMetadata.context, clientMetadata.databaseId),
            showFriendlyErrorStack: true,
            maxRetriesPerRequest: REDIS_CLIENTS_CONFIG.maxRetriesPerRequest,
            retryStrategy: (options === null || options === void 0 ? void 0 : options.useRetry) ? this.retryStrategy : this.dummyFn,
        };
        if (tls) {
            redisOptions.tls = await this.getTLSConfig(database);
        }
        return redisOptions;
    }
    async getRedisClusterOptions(clientMetadata, database, options) {
        return {
            clusterRetryStrategy: options.useRetry ? this.retryStrategy : this.dummyFn,
            redisOptions: await this.getRedisOptions(clientMetadata, database, options),
        };
    }
    async getRedisSentinelOptions(clientMetadata, database, options) {
        var _a;
        const { sentinelMaster } = database;
        const baseOptions = await this.getRedisOptions(clientMetadata, database, options);
        return {
            ...baseOptions,
            host: undefined,
            port: undefined,
            sentinels: ((_a = database.nodes) === null || _a === void 0 ? void 0 : _a.length) ? database.nodes : [{ host: database.host, port: database.port }],
            name: sentinelMaster === null || sentinelMaster === void 0 ? void 0 : sentinelMaster.name,
            sentinelUsername: database.username,
            sentinelPassword: database.password,
            username: sentinelMaster === null || sentinelMaster === void 0 ? void 0 : sentinelMaster.username,
            password: sentinelMaster === null || sentinelMaster === void 0 ? void 0 : sentinelMaster.password,
            sentinelTLS: baseOptions.tls,
            enableTLSForSentinelMode: !!baseOptions.tls,
            sentinelRetryStrategy: (options === null || options === void 0 ? void 0 : options.useRetry) ? this.retryStrategy : this.dummyFn,
        };
    }
    async getTLSConfig(database) {
        let config;
        config = {
            rejectUnauthorized: database.verifyServerCert,
            checkServerIdentity: this.dummyFn,
            servername: database.tlsServername || undefined,
        };
        if (database.caCert) {
            config = {
                ...config,
                ca: [database.caCert.certificate],
            };
        }
        if (database.clientCert) {
            config = {
                ...config,
                cert: database.clientCert.certificate,
                key: database.clientCert.key,
            };
        }
        return config;
    }
    async createStandaloneConnection(clientMetadata, database, options) {
        var _a, _b;
        let tnl;
        let connection;
        try {
            const config = await this.getRedisOptions(clientMetadata, database, options);
            const dbIndex = config.db > 0 && !database.sentinelMaster ? config.db : 0;
            if (database.ssh) {
                tnl = await this.sshTunnelProvider.createTunnel(database);
            }
            return await new Promise((resolve, reject) => {
                try {
                    let lastError;
                    if (tnl) {
                        tnl.on('error', (error) => {
                            reject(error);
                        });
                        tnl.on('close', () => {
                            reject(new exceptions_1.TunnelConnectionLostException());
                        });
                        config.host = tnl.serverAddress.host;
                        config.port = tnl.serverAddress.port;
                    }
                    connection = new ioredis_1.default({
                        ...config,
                        db: 0,
                    });
                    connection.on('error', (e) => {
                        this.logger.error('Failed connection to the redis database.', e);
                        lastError = e;
                    });
                    connection.on('end', () => {
                        this.logger.error(error_messages_1.default.UNABLE_TO_ESTABLISH_CONNECTION, lastError);
                        reject(lastError || new common_1.InternalServerErrorException(error_messages_1.default.SERVER_CLOSED_CONNECTION));
                    });
                    connection.on('ready', () => {
                        lastError = null;
                        this.logger.log('Successfully connected to the redis database');
                        if (dbIndex > 0) {
                            connection.select(dbIndex)
                                .then(() => {
                                (0, lodash_1.set)(connection, ['options', 'db'], dbIndex);
                                resolve(connection);
                            })
                                .catch(reject);
                        }
                        else {
                            resolve(connection);
                        }
                    });
                    connection.on('reconnecting', () => {
                        lastError = null;
                        this.logger.log(error_messages_1.default.RECONNECTING_TO_DATABASE);
                    });
                }
                catch (e) {
                    reject(e);
                }
            });
        }
        catch (e) {
            (_a = connection === null || connection === void 0 ? void 0 : connection.disconnect) === null || _a === void 0 ? void 0 : _a.call(connection);
            (_b = tnl === null || tnl === void 0 ? void 0 : tnl.close) === null || _b === void 0 ? void 0 : _b.call(tnl);
            throw e;
        }
    }
    async createClusterConnection(clientMetadata, database, options) {
        var _a;
        let connection;
        try {
            const config = await this.getRedisClusterOptions(clientMetadata, database, options);
            if (database.ssh) {
                throw new Error('SSH is unsupported for cluster databases.');
            }
            return await (new Promise((resolve, reject) => {
                try {
                    let lastError;
                    connection = new ioredis_1.Cluster([{
                            host: database.host,
                            port: database.port,
                        }].concat(database.nodes), {
                        ...config,
                        redisOptions: {
                            ...config.redisOptions,
                            db: 0,
                        },
                    });
                    connection.on('error', (e) => {
                        this.logger.error('Failed connection to the redis oss cluster', e);
                        lastError = !(0, lodash_1.isEmpty)(e.lastNodeError) ? e.lastNodeError : e;
                    });
                    connection.on('end', () => {
                        this.logger.error(error_messages_1.default.UNABLE_TO_ESTABLISH_CONNECTION, lastError);
                        reject(lastError || new common_1.InternalServerErrorException(error_messages_1.default.SERVER_CLOSED_CONNECTION));
                    });
                    connection.on('ready', () => {
                        lastError = null;
                        this.logger.log('Successfully connected to the redis oss cluster.');
                        if (config.redisOptions.db > 0) {
                            connection.select(config.redisOptions.db)
                                .then(() => {
                                (0, lodash_1.set)(connection, ['options', 'db'], config.redisOptions.db);
                                resolve(connection);
                            })
                                .catch(reject);
                        }
                        else {
                            resolve(connection);
                        }
                    });
                    connection.on('reconnecting', () => {
                        lastError = null;
                        this.logger.log(error_messages_1.default.RECONNECTING_TO_DATABASE);
                    });
                }
                catch (e) {
                    reject(e);
                }
            }));
        }
        catch (e) {
            (_a = connection === null || connection === void 0 ? void 0 : connection.disconnect) === null || _a === void 0 ? void 0 : _a.call(connection);
            throw e;
        }
    }
    async createSentinelConnection(clientMetadata, database, options) {
        var _a;
        let connection;
        try {
            const config = await this.getRedisSentinelOptions(clientMetadata, database, options);
            return await (new Promise((resolve, reject) => {
                try {
                    let lastError;
                    connection = new ioredis_1.default({
                        ...config,
                        db: 0,
                    });
                    connection.on('error', (e) => {
                        this.logger.error('Failed connection to the redis oss sentinel', e);
                        lastError = e;
                    });
                    connection.on('end', () => {
                        this.logger.error(error_messages_1.default.UNABLE_TO_ESTABLISH_CONNECTION, lastError);
                        reject(lastError || new common_1.InternalServerErrorException(error_messages_1.default.SERVER_CLOSED_CONNECTION));
                    });
                    connection.on('ready', () => {
                        lastError = null;
                        this.logger.log('Successfully connected to the redis oss sentinel.');
                        if (config.db > 0) {
                            connection.select(config.db)
                                .then(() => {
                                (0, lodash_1.set)(connection, ['options', 'db'], config.db);
                                resolve(connection);
                            })
                                .catch(reject);
                        }
                        else {
                            resolve(connection);
                        }
                    });
                    connection.on('reconnecting', () => {
                        lastError = null;
                        this.logger.log(error_messages_1.default.RECONNECTING_TO_DATABASE);
                    });
                }
                catch (e) {
                    reject(e);
                }
            }));
        }
        catch (e) {
            (_a = connection === null || connection === void 0 ? void 0 : connection.disconnect) === null || _a === void 0 ? void 0 : _a.call(connection);
            throw e;
        }
    }
    async createClientAutomatically(clientMetadata, database, connectionName) {
        if (database === null || database === void 0 ? void 0 : database.sentinelMaster) {
            try {
                return await this.createSentinelConnection(clientMetadata, database, {
                    useRetry: true,
                    connectionName,
                });
            }
            catch (e) {
            }
        }
        try {
            return await this.createClusterConnection(clientMetadata, database, {
                useRetry: true,
                connectionName,
            });
        }
        catch (e) {
        }
        return this.createStandaloneConnection(clientMetadata, database, {
            useRetry: true,
            connectionName,
        });
    }
    async createRedisConnection(clientMetadata, databaseDto, connectionName) {
        const database = (0, utils_1.cloneClassInstance)(databaseDto);
        Object.keys(database).forEach((key) => {
            if (database[key] === null) {
                delete database[key];
            }
        });
        let client;
        switch (database === null || database === void 0 ? void 0 : database.connectionType) {
            case database_entity_1.ConnectionType.STANDALONE:
                client = await this.createStandaloneConnection(clientMetadata, database, {
                    useRetry: true,
                    connectionName,
                });
                break;
            case database_entity_1.ConnectionType.CLUSTER:
                client = await this.createClusterConnection(clientMetadata, database, {
                    useRetry: true,
                    connectionName,
                });
                break;
            case database_entity_1.ConnectionType.SENTINEL:
                client = await this.createSentinelConnection(clientMetadata, database, {
                    useRetry: true,
                    connectionName,
                });
                break;
            default:
                client = await this.createClientAutomatically(clientMetadata, database, connectionName);
        }
        return client;
    }
};
RedisConnectionFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ssh_tunnel_provider_1.SshTunnelProvider])
], RedisConnectionFactory);
exports.RedisConnectionFactory = RedisConnectionFactory;
