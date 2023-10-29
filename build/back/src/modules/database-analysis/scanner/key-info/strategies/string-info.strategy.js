"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringInfoStrategy = void 0;
const abstract_info_strategy_1 = require("./abstract.info.strategy");
const ioredis_1 = require("ioredis");
class StringInfoStrategy extends abstract_info_strategy_1.AbstractInfoStrategy {
    async getLength(client, key) {
        return await client.sendCommand(new ioredis_1.Command('strlen', [key]));
    }
}
exports.StringInfoStrategy = StringInfoStrategy;
