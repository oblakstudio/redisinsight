"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashInfoStrategy = void 0;
const abstract_info_strategy_1 = require("./abstract.info.strategy");
const ioredis_1 = require("ioredis");
class HashInfoStrategy extends abstract_info_strategy_1.AbstractInfoStrategy {
    async getLength(client, key) {
        return await client.sendCommand(new ioredis_1.Command('hlen', [key]));
    }
}
exports.HashInfoStrategy = HashInfoStrategy;