"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusterShardsInfoStrategy = void 0;
const lodash_1 = require("lodash");
const abstract_info_strategy_1 = require("./abstract.info.strategy");
const models_1 = require("../models");
const utils_1 = require("../../redis/utils");
class ClusterShardsInfoStrategy extends abstract_info_strategy_1.AbstractInfoStrategy {
    async getClusterNodesFromRedis(client) {
        const resp = await client.sendCommand(['cluster', 'shards'], { replyEncoding: 'utf8' });
        return [].concat(...resp.map((shardArray) => {
            const shard = (0, utils_1.convertArrayReplyToObject)(shardArray);
            const slots = ClusterShardsInfoStrategy.calculateSlots(shard.slots);
            return ClusterShardsInfoStrategy.processShardNodes(shard.nodes, slots);
        }));
    }
    static calculateSlots(slots) {
        return (0, lodash_1.chunk)(slots, 2).map(([slot1, slot2]) => {
            if (slot1 === slot2) {
                return `${slot1}`;
            }
            return `${slot1}-${slot2}`;
        });
    }
    static processShardNodes(shardNodes, slots) {
        let primary;
        const nodes = shardNodes.map((nodeArray) => {
            const nodeObj = (0, utils_1.convertArrayReplyToObject)(nodeArray);
            const node = {
                id: nodeObj.id,
                host: nodeObj.ip,
                port: nodeObj.port,
                role: nodeObj.role === 'master' ? models_1.NodeRole.Primary : models_1.NodeRole.Replica,
                health: nodeObj.health,
            };
            if (node.role === 'primary') {
                primary = node.id;
                node['slots'] = slots;
            }
            return node;
        });
        return nodes.map((node) => {
            if (node.role !== models_1.NodeRole.Primary) {
                return {
                    ...node,
                    primary,
                };
            }
            return node;
        })
            .filter((node) => node.role === models_1.NodeRole.Primary);
    }
}
exports.ClusterShardsInfoStrategy = ClusterShardsInfoStrategy;
