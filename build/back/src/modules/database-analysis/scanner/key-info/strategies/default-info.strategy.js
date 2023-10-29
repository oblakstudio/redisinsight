"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultInfoStrategy = void 0;
const abstract_info_strategy_1 = require("./abstract.info.strategy");
class DefaultInfoStrategy extends abstract_info_strategy_1.AbstractInfoStrategy {
    async getLength() {
        return null;
    }
}
exports.DefaultInfoStrategy = DefaultInfoStrategy;
