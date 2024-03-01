"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsKeyInfoStrategy = void 0;
const dto_1 = require("../../dto");
const browser_tool_commands_1 = require("../../../constants/browser-tool-commands");
const utils_1 = require("../../../../redis/utils");
const key_info_strategy_1 = require("./key-info.strategy");
class TsKeyInfoStrategy extends key_info_strategy_1.KeyInfoStrategy {
    async getTotalSamples(client, key) {
        try {
            const info = await client.sendCommand([browser_tool_commands_1.BrowserToolTSCommands.TSInfo, key], { replyEncoding: 'utf8' });
            return (0, utils_1.convertArrayReplyToObject)(info).totalsamples;
        }
        catch (error) {
            return undefined;
        }
    }
    async getInfo(client, key, type) {
        this.logger.log(`Getting ${dto_1.RedisDataType.TS} type info.`);
        const [[, ttl = null], [, size = null],] = await client.sendPipeline([
            [browser_tool_commands_1.BrowserToolKeysCommands.Ttl, key],
            [browser_tool_commands_1.BrowserToolKeysCommands.MemoryUsage, key, 'samples', '0'],
        ]);
        const length = await this.getTotalSamples(client, key);
        return {
            name: key,
            type,
            ttl,
            size,
            length,
        };
    }
}
exports.TsKeyInfoStrategy = TsKeyInfoStrategy;
