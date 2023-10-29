"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphInfoStrategy = void 0;
const abstract_info_strategy_1 = require("./abstract.info.strategy");
const ioredis_1 = require("ioredis");
class GraphInfoStrategy extends abstract_info_strategy_1.AbstractInfoStrategy {
    async getLength(client, key) {
        const resp = await client.sendCommand(new ioredis_1.Command('graph.query', [key, 'MATCH (r) RETURN count(r)', '--compact'], {
            replyEncoding: 'utf8',
        }));
        return resp[1][0][0][1];
    }
}
exports.GraphInfoStrategy = GraphInfoStrategy;
