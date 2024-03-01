"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusterNodesInfoStrategy = void 0;
const abstract_info_strategy_1 = require("./abstract.info.strategy");
const models_1 = require("../models");
class ClusterNodesInfoStrategy extends abstract_info_strategy_1.AbstractInfoStrategy {
    async getClusterNodesFromRedis(client) {
        const resp = await client.sendCommand(['cluster', 'nodes'], { replyEncoding: 'utf8' });
        return resp.split('\n').filter((e) => e).map((nodeString) => {
            const [id, endpoint, flags, primary, , , , , ...slots] = nodeString.split(' ');
            const [host, ports] = endpoint.split(':');
            const [port] = ports.split('@');
            return {
                id,
                host,
                port: parseInt(port, 10),
                role: primary && primary !== '-' ? models_1.NodeRole.Replica : models_1.NodeRole.Primary,
                primary: primary && primary !== '-' ? primary : undefined,
                slots: (slots === null || slots === void 0 ? void 0 : slots.length) ? slots : undefined,
                health: ClusterNodesInfoStrategy.determineNodeHealth(flags),
            };
        })
            .filter((node) => node.role === models_1.NodeRole.Primary);
    }
    static determineNodeHealth(flags) {
        if (flags.indexOf('fail') > -1 && flags.indexOf('pfail') < 0) {
            return models_1.HealthStatus.Offline;
        }
        if (flags.indexOf('master') > -1 || flags.indexOf('slave') > -1) {
            return models_1.HealthStatus.Online;
        }
        return models_1.HealthStatus.Loading;
    }
}
exports.ClusterNodesInfoStrategy = ClusterNodesInfoStrategy;
