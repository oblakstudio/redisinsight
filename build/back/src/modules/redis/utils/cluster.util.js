"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoverClusterNodes = exports.isCluster = void 0;
const reply_util_1 = require("./reply.util");
const models_1 = require("../../../models");
const isCluster = async (client) => {
    try {
        const reply = await client.sendCommand(['cluster', 'info'], { replyEncoding: 'utf8' });
        const clusterInfo = (0, reply_util_1.convertMultilineReplyToObject)(reply);
        return clusterInfo.cluster_state === 'ok';
    }
    catch (e) {
        return false;
    }
};
exports.isCluster = isCluster;
const discoverClusterNodes = async (client) => {
    const nodes = (0, reply_util_1.parseNodesFromClusterInfoReply)(await client.sendCommand(['cluster', 'nodes'], { replyEncoding: 'utf8' }))
        .filter((node) => node.linkState === models_1.RedisClusterNodeLinkState.Connected);
    return nodes.map((node) => ({
        host: node.host,
        port: node.port,
    }));
};
exports.discoverClusterNodes = discoverClusterNodes;
