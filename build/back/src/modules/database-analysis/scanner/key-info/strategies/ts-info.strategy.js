"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsInfoStrategy = void 0;
const abstract_info_strategy_1 = require("./abstract.info.strategy");
const utils_1 = require("../../../../redis/utils");
class TsInfoStrategy extends abstract_info_strategy_1.AbstractInfoStrategy {
    async getLength(client, key) {
        const { totalsamples } = (0, utils_1.convertArrayReplyToObject)(await client.sendCommand(['ts.info', key], { replyEncoding: 'utf8' }));
        return totalsamples;
    }
}
exports.TsInfoStrategy = TsInfoStrategy;
