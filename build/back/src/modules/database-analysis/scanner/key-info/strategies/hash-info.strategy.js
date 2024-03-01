"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashInfoStrategy = void 0;
const abstract_info_strategy_1 = require("./abstract.info.strategy");
class HashInfoStrategy extends abstract_info_strategy_1.AbstractInfoStrategy {
    async getLength(client, key) {
        return await client.sendCommand(['hlen', key]);
    }
}
exports.HashInfoStrategy = HashInfoStrategy;
