"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamInfoStrategy = void 0;
const abstract_info_strategy_1 = require("./abstract.info.strategy");
class StreamInfoStrategy extends abstract_info_strategy_1.AbstractInfoStrategy {
    async getLength(client, key) {
        return await client.sendCommand(['xlen', key]);
    }
}
exports.StreamInfoStrategy = StreamInfoStrategy;
