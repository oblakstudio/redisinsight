"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractInfoStrategy = void 0;
const utils_1 = require("../../../utils");
const lodash_1 = require("lodash");
const models_1 = require("../models");
const class_transformer_1 = require("class-transformer");
const utils_2 = require("../../redis/utils");
class AbstractInfoStrategy {
    async getClusterDetails(client) {
        let clusterDetails = await AbstractInfoStrategy.getClusterInfo(client);
        const redisClusterNodes = await this.getClusterNodesFromRedis(client);
        const nodes = await this.getClusterNodesInfo(client, redisClusterNodes);
        clusterDetails = {
            ...clusterDetails,
            ...(AbstractInfoStrategy.calculateAdditionalClusterMetrics(client, nodes)),
            nodes: AbstractInfoStrategy.createClusterHierarchy(nodes),
            version: (0, lodash_1.get)(nodes, '0.version'),
            mode: (0, lodash_1.get)(nodes, '0.mode'),
        };
        return (0, class_transformer_1.plainToClass)(models_1.ClusterDetails, clusterDetails);
    }
    async getClusterNodesInfo(client, nodes) {
        const clientNodes = await client.nodes();
        return await Promise.all(nodes.map((node) => {
            const clientNode = clientNodes.find((n) => {
                var _a, _b, _c, _d;
                return (((_a = n.options) === null || _a === void 0 ? void 0 : _a.host) === node.host && ((_b = n.options) === null || _b === void 0 ? void 0 : _b.port) === node.port) || (((_c = n.options) === null || _c === void 0 ? void 0 : _c.natHost) === node.host && ((_d = n.options) === null || _d === void 0 ? void 0 : _d.natPort) === node.port);
            });
            if (clientNode) {
                return this.getClusterNodeInfo(clientNode, node);
            }
            return undefined;
        }).filter((n) => n));
    }
    async getClusterNodeInfo(nodeClient, node) {
        const info = (0, utils_1.convertRedisInfoReplyToObject)(await nodeClient.sendCommand(['info'], { replyEncoding: 'utf8' }));
        return {
            ...node,
            totalKeys: (0, lodash_1.sum)((0, lodash_1.map)((0, lodash_1.get)(info, 'keyspace', {}), (dbKeys) => {
                const { keys } = (0, utils_2.convertMultilineReplyToObject)(dbKeys, ',', '=');
                return parseInt(keys, 10);
            })),
            usedMemory: (0, utils_1.convertStringToNumber)((0, lodash_1.get)(info, 'memory.used_memory')),
            opsPerSecond: (0, utils_1.convertStringToNumber)((0, lodash_1.get)(info, 'stats.instantaneous_ops_per_sec')),
            connectionsReceived: (0, utils_1.convertStringToNumber)((0, lodash_1.get)(info, 'stats.total_connections_received')),
            connectedClients: (0, utils_1.convertStringToNumber)((0, lodash_1.get)(info, 'clients.connected_clients')),
            commandsProcessed: (0, utils_1.convertStringToNumber)((0, lodash_1.get)(info, 'stats.total_commands_processed')),
            networkInKbps: (0, utils_1.convertStringToNumber)((0, lodash_1.get)(info, 'stats.instantaneous_input_kbps')),
            networkOutKbps: (0, utils_1.convertStringToNumber)((0, lodash_1.get)(info, 'stats.instantaneous_output_kbps')),
            cacheHitRatio: AbstractInfoStrategy.calculateCacheHitRatio((0, utils_1.convertStringToNumber)((0, lodash_1.get)(info, 'stats.keyspace_hits'), 0), (0, utils_1.convertStringToNumber)((0, lodash_1.get)(info, 'stats.keyspace_misses'), 0)),
            replicationOffset: (0, utils_1.convertStringToNumber)((0, lodash_1.get)(info, 'replication.master_repl_offset')),
            uptimeSec: (0, utils_1.convertStringToNumber)((0, lodash_1.get)(info, 'server.uptime_in_seconds'), 0),
            version: (0, lodash_1.get)(info, 'server.redis_version'),
            mode: (0, lodash_1.get)(info, 'server.redis_mode'),
        };
    }
    static async getClusterInfo(client) {
        const info = (0, utils_2.convertMultilineReplyToObject)(await client.sendCommand(['cluster', 'info'], { replyEncoding: 'utf8' }));
        const slotsState = {
            slotsAssigned: (0, utils_1.convertStringToNumber)(info.cluster_slots_assigned, 0),
            slotsOk: (0, utils_1.convertStringToNumber)(info.cluster_slots_ok, 0),
            slotsPFail: (0, utils_1.convertStringToNumber)(info.cluster_slots_pfail, 0),
            slotsFail: (0, utils_1.convertStringToNumber)(info.cluster_slots_fail, 0),
        };
        return {
            state: info.cluster_state,
            ...slotsState,
            slotsUnassigned: 16384 - slotsState.slotsAssigned,
            statsMessagesSent: (0, utils_1.convertStringToNumber)(info.cluster_stats_messages_sent, 0),
            statsMessagesReceived: (0, utils_1.convertStringToNumber)(info.cluster_stats_messages_received, 0),
            currentEpoch: (0, utils_1.convertStringToNumber)(info.cluster_current_epoch, 0),
            myEpoch: (0, utils_1.convertStringToNumber)(info.cluster_my_epoch, 0),
            size: (0, utils_1.convertStringToNumber)(info.cluster_size, 0),
            knownNodes: (0, utils_1.convertStringToNumber)(info.cluster_known_nodes, 0),
        };
    }
    static createClusterHierarchy(nodes) {
        const primaryNodes = {};
        nodes.forEach((node) => {
            if (node.role === 'primary') {
                primaryNodes[node.id] = {
                    ...node,
                    replicas: [],
                };
            }
        });
        nodes.forEach((node) => {
            if (node.primary && primaryNodes[node.primary]) {
                const replicationLag = primaryNodes[node.primary].replicationOffset - node.replicationOffset;
                primaryNodes[node.primary].replicas.push({
                    ...node,
                    replicationLag: replicationLag > -1 ? replicationLag : 0,
                });
            }
        });
        return Object.values(primaryNodes);
    }
    static calculateCacheHitRatio(hits, misses) {
        try {
            const cacheHitRate = hits / (hits + misses);
            return cacheHitRate >= 0 ? cacheHitRate : null;
        }
        catch (e) {
        }
        return undefined;
    }
    static calculateAdditionalClusterMetrics(client, nodes) {
        const additionalDetails = {
            user: (0, lodash_1.get)(client, 'options.redisOptions.username'),
            uptimeSec: 0,
        };
        nodes.forEach((node) => {
            if (additionalDetails.uptimeSec < node.uptimeSec) {
                additionalDetails.uptimeSec = node.uptimeSec;
            }
        });
        return additionalDetails;
    }
}
exports.AbstractInfoStrategy = AbstractInfoStrategy;
