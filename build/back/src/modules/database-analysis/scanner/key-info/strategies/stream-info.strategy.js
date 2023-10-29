"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamInfoStrategy = void 0;
const abstract_info_strategy_1 = require("./abstract.info.strategy");
const ioredis_1 = require("ioredis");
class StreamInfoStrategy extends abstract_info_strategy_1.AbstractInfoStrategy {
    async getLength(client, key) {
        return await client.sendCommand(new ioredis_1.Command('xlen', [key]));
    }
}
exports.StreamInfoStrategy = StreamInfoStrategy;
