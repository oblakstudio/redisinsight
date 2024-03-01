"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeRedisConnectionStrategy = void 0;
const redis_connection_strategy_1 = require("./redis.connection.strategy");
const config_1 = require("../../../utils/config");
const redis_1 = require("redis");
const lodash_1 = require("lodash");
const client_1 = require("../client");
const standalone_node_redis_client_1 = require("../client/node-redis/standalone.node-redis.client");
const utils_1 = require("../utils");
const REDIS_CLIENTS_CONFIG = config_1.default.get('redis_clients');
class NodeRedisConnectionStrategy extends redis_connection_strategy_1.RedisConnectionStrategy {
    constructor() {
        super(...arguments);
        this.retryStrategy = (times) => {
            if (times < REDIS_CLIENTS_CONFIG.retryTimes) {
                return Math.min(times * REDIS_CLIENTS_CONFIG.retryDelay, 2000);
            }
            return false;
        };
        this.dummyFn = () => undefined;
    }
    async getRedisOptions(clientMetadata, database, options) {
        const { host, port, password, username, tls, db, timeout, } = database;
        let tlsOptions = {};
        if (tls) {
            tlsOptions = {
                tls: true,
                ...await this.getTLSConfig(database),
            };
        }
        return {
            socket: {
                host,
                port,
                connectTimeout: timeout,
                ...tlsOptions,
                reconnectStrategy: (options === null || options === void 0 ? void 0 : options.useRetry) ? this.retryStrategy.bind(this) : false,
            },
            username,
            password,
            database: (0, lodash_1.isNumber)(clientMetadata.db) ? clientMetadata.db : db,
            name: (options === null || options === void 0 ? void 0 : options.connectionName)
                || redis_connection_strategy_1.RedisConnectionStrategy.generateRedisConnectionName(clientMetadata),
        };
    }
    async getRedisClusterOptions(clientMetadata, database, options) {
        const config = await this.getRedisOptions(clientMetadata, database, options);
        return {
            rootNodes: [{
                    socket: {
                        host: database.host,
                        port: database.port,
                    },
                }],
            defaults: { ...config },
            maxCommandRedirections: database.nodes ? (database.nodes.length * 16) : 16,
        };
    }
    async getTLSConfig(database) {
        let config;
        config = {
            rejectUnauthorized: database.verifyServerCert,
            checkServerIdentity: this.dummyFn.bind(this),
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
        this.logger.debug('Creating node-redis standalone client');
        let tnl;
        try {
            const config = await this.getRedisOptions(clientMetadata, database, options);
            if (database.ssh) {
                tnl = await this.sshTunnelProvider.createTunnel(database, database.sshOptions);
                config.socket = {
                    ...config.socket,
                    host: tnl.serverAddress.host,
                    port: tnl.serverAddress.port,
                };
            }
            const client = await (0, redis_1.createClient)({
                ...config,
                database: config.database > 0 && !database.sentinelMaster ? config.database : 0,
            })
                .on('error', (e) => {
                this.logger.error('Failed to connect to the redis database.', e);
            })
                .on('end', () => {
                var _a;
                (_a = tnl === null || tnl === void 0 ? void 0 : tnl.close) === null || _a === void 0 ? void 0 : _a.call(tnl);
            })
                .connect();
            return new standalone_node_redis_client_1.StandaloneNodeRedisClient(clientMetadata, client, {
                host: database.host,
                port: database.port,
                connectTimeout: database.timeout,
            });
        }
        catch (e) {
            (_a = tnl === null || tnl === void 0 ? void 0 : tnl.close) === null || _a === void 0 ? void 0 : _a.call(tnl);
            throw e;
        }
    }
    async createClusterClient(clientMetadata, database, options) {
        let tnls = [];
        let standaloneClient;
        try {
            const config = await this.getRedisClusterOptions(clientMetadata, database, options);
            standaloneClient = await this.createStandaloneClient(clientMetadata, database, options);
            config.rootNodes = (await (0, utils_1.discoverClusterNodes)(standaloneClient)).map((rootNode) => ({
                socket: rootNode,
            }));
            await standaloneClient.disconnect();
            if (database.ssh) {
                tnls = await Promise.all(config.rootNodes.map((node) => this.sshTunnelProvider.createTunnel(node.socket, database.sshOptions)));
                config.nodeAddressMap = {};
                tnls.forEach((tnl) => {
                    config.nodeAddressMap[`${tnl.options.targetHost}:${tnl.options.targetPort}`] = {
                        host: tnl.serverAddress.host,
                        port: tnl.serverAddress.port,
                    };
                });
                config.rootNodes = tnls.map((tnl) => ({ socket: tnl.serverAddress }));
            }
            const client = (0, redis_1.createCluster)(config);
            client.on('error', (e) => {
                this.logger.error('Failed connection to the redis oss cluster', e);
            });
            await client.connect();
            return new client_1.ClusterNodeRedisClient(clientMetadata, client, {
                host: database.host,
                port: database.port,
                connectTimeout: database.timeout,
            });
        }
        catch (e) {
            tnls === null || tnls === void 0 ? void 0 : tnls.forEach((tnl) => { var _a; return (_a = tnl === null || tnl === void 0 ? void 0 : tnl.close) === null || _a === void 0 ? void 0 : _a.call(tnl); });
            throw e;
        }
    }
    async createSentinelClient(clientMetadata, database, options) {
        throw new Error('TDB sentinel client');
    }
}
exports.NodeRedisConnectionStrategy = NodeRedisConnectionStrategy;
