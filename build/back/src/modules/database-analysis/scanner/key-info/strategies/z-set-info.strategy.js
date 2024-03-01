"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZSetInfoStrategy = void 0;
const abstract_info_strategy_1 = require("./abstract.info.strategy");
class ZSetInfoStrategy extends abstract_info_strategy_1.AbstractInfoStrategy {
    async getLength(client, key) {
        return await client.sendCommand(['zcard', key]);
    }
}
exports.ZSetInfoStrategy = ZSetInfoStrategy;
