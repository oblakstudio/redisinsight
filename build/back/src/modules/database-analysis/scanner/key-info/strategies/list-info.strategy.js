"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListInfoStrategy = void 0;
const abstract_info_strategy_1 = require("./abstract.info.strategy");
class ListInfoStrategy extends abstract_info_strategy_1.AbstractInfoStrategy {
    async getLength(client, key) {
        return await client.sendCommand(['llen', key]);
    }
}
exports.ListInfoStrategy = ListInfoStrategy;
