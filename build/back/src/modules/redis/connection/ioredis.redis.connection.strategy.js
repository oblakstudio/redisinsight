"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoredisRedisConnectionStrategy = void 0;
const redis_connection_strategy_1 = require("./redis.connection.strategy");
const config_1 = require("../../../utils/config");
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const lodash_1 = require("lodash");
const error_messages_1 = require("../../../constants/error-messages");
const client_1 = require("../client");
const utils_1 = require("../utils");
const REDIS_CLIENTS_CONFIG = config_1.default.get('redis_clients');
class IoredisRedisConnectionStrategy extends redis_connection_strategy_1.RedisConnectionStrategy {
    constructor() {
        super(...arguments);
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
                || redis_connection_strategy_1.RedisConnectionStrategy.generateRedisConnectionName(clientMetadata),
            showFriendlyErrorStack: true,
            maxRetriesPerRequest: REDIS_CLIENTS_CONFIG.maxRetriesPerRequest,
            retryStrategy: (options === null || options === void 0 ? void 0 : options.useRetry) ? this.retryStrategy.bind(this) : this.dummyFn.bind(this),
        };
        if (tls) {
            redisOptions.tls = await this.getTLSConfig(database);
        }
        return redisOptions;
    }
    async getRedisClusterOptions(clientMetadata, database, options) {
        return {
            clusterRetryStrategy: options.useRetry ? this.retryStrategy.bind(this) : this.dummyFn.bind(this),
            redisOptions: await this.getRedisOptions(clientMetadata, database, options),
        };
    }
    async getRedisSentinelOptions(clientMetadata, database, options) {
        const { sentinelMaster } = database;
        const baseOptions = await this.getRedisOptions(clientMetadata, database, options);
        return {
            ...baseOptions,
            host: undefined,
            port: undefined,
            sentinels: [{ host: database.host, port: database.port, ...(database.nodes || []) }],
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
    async createStandaloneClient(clientMetadata, database, options) {
        var _a;
        this.logger.debug('Creating ioredis standalone client');
        let tnl;
        try {
            const config = await this.getRedisOptions(clientMetadata, database, options);
            if (database.ssh) {
                tnl = await this.sshTunnelProvider.createTunnel(database, database.sshOptions);
                config.host = tnl.serverAddress.host;
                config.port = tnl.serverAddress.port;
            }
            return await new Promise((resolve, reject) => {
                try {
                    const connection = new ioredis_1.default({
                        ...config,
                        db: config.db > 0 && !database.sentinelMaster ? config.db : 0,
                    });
                    connection.on('error', (e) => {
                        this.logger.error('Failed connection to the redis database.', e);
                        reject(e);
                    });
                    connection.on('end', () => {
                        var _a;
                        this.logger.warn(error_messages_1.default.SERVER_CLOSED_CONNECTION);
                        (_a = tnl === null || tnl === void 0 ? void 0 : tnl.close) === null || _a === void 0 ? void 0 : _a.call(tnl);
                        reject(new common_1.InternalServerErrorException(error_messages_1.default.SERVER_CLOSED_CONNECTION));
                    });
                    connection.on('ready', () => {
                        this.logger.log('Successfully connected to the redis database');
                        resolve(new client_1.StandaloneIoredisClient(clientMetadata, connection, {
                            host: database.host,
                            port: database.port,
                        }));
                    });
                    connection.on('reconnecting', () => {
                        this.logger.log('Reconnecting to the redis database');
                    });
                }
                catch (e) {
                    reject(e);
                }
            });
        }
        catch (e) {
            (_a = tnl === null || tnl === void 0 ? void 0 : tnl.close) === null || _a === void 0 ? void 0 : _a.call(tnl);
            throw e;
        }
    }
    async createClusterClient(clientMetadata, database, options) {
        var _a;
        let tnls = [];
        let standaloneClient;
        let rootNodes = [{
                host: database.host,
                port: database.port,
            }];
        try {
            const config = await this.getRedisClusterOptions(clientMetadata, database, options);
            standaloneClient = await this.createStandaloneClient(clientMetadata, database, options);
            rootNodes = await (0, utils_1.discoverClusterNodes)(standaloneClient);
            await standaloneClient.disconnect();
            if (database.ssh) {
                tnls = await Promise.all(rootNodes.map((node) => this.sshTunnelProvider.createTunnel(node, database.sshOptions)));
                config.natMap = {};
                tnls.forEach((tnl) => {
                    config.natMap[`${tnl.options.targetHost}:${tnl.options.targetPort}`] = {
                        host: tnl.serverAddress.host,
                        port: tnl.serverAddress.port,
                    };
                });
                rootNodes = tnls.map((tnl) => tnl.serverAddress);
            }
            return new Promise((resolve, reject) => {
                try {
                    const cluster = new ioredis_1.Cluster(rootNodes, config);
                    cluster.on('error', (e) => {
                        this.logger.error('Failed connection to the redis oss cluster', e);
                        reject(!(0, lodash_1.isEmpty)(e.lastNodeError) ? e.lastNodeError : e);
                    });
                    cluster.on('end', () => {
                        this.logger.warn(error_messages_1.default.SERVER_CLOSED_CONNECTION);
                        tnls.forEach((tnl) => { var _a; return (_a = tnl === null || tnl === void 0 ? void 0 : tnl.close) === null || _a === void 0 ? void 0 : _a.call(tnl); });
                        reject(new common_1.InternalServerErrorException(error_messages_1.default.SERVER_CLOSED_CONNECTION));
                    });
                    cluster.on('ready', () => {
                        this.logger.log('Successfully connected to the redis oss cluster.');
                        resolve(new client_1.ClusterIoredisClient(clientMetadata, cluster, {
                            host: database.host,
                            port: database.port,
                        }));
                    });
                }
                catch (e) {
                    reject(e);
                }
            });
        }
        catch (e) {
            tnls.forEach((tnl) => { var _a; return (_a = tnl === null || tnl === void 0 ? void 0 : tnl.close) === null || _a === void 0 ? void 0 : _a.call(tnl); });
            (_a = standaloneClient === null || standaloneClient === void 0 ? void 0 : standaloneClient.disconnect) === null || _a === void 0 ? void 0 : _a.call(standaloneClient).catch();
            throw e;
        }
    }
    async createSentinelClient(clientMetadata, database, options) {
        const config = await this.getRedisSentinelOptions(clientMetadata, database, options);
        return new Promise((resolve, reject) => {
            try {
                const client = new ioredis_1.default(config);
                client.on('error', (e) => {
                    this.logger.error('Failed connection to the redis oss sentinel', e);
                    reject(e);
                });
                client.on('end', () => {
                    this.logger.error(error_messages_1.default.SERVER_CLOSED_CONNECTION);
                    reject(new common_1.InternalServerErrorException(error_messages_1.default.SERVER_CLOSED_CONNECTION));
                });
                client.on('ready', () => {
                    this.logger.log('Successfully connected to the redis oss sentinel.');
                    resolve(new client_1.SentinelIoredisClient(clientMetadata, client, {
                        host: database.host,
                        port: database.port,
                    }));
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.IoredisRedisConnectionStrategy = IoredisRedisConnectionStrategy;
