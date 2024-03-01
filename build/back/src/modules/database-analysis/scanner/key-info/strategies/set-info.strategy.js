"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetInfoStrategy = void 0;
const abstract_info_strategy_1 = require("./abstract.info.strategy");
class SetInfoStrategy extends abstract_info_strategy_1.AbstractInfoStrategy {
    async getLength(client, key) {
        return await client.sendCommand(['scard', key]);
    }
}
exports.SetInfoStrategy = SetInfoStrategy;
