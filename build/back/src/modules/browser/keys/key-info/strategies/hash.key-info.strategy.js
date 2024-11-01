"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashKeyInfoStrategy = void 0;
const dto_1 = require("../../dto");
const browser_tool_commands_1 = require("../../../constants/browser-tool-commands");
const key_info_strategy_1 = require("./key-info.strategy");
class HashKeyInfoStrategy extends key_info_strategy_1.KeyInfoStrategy {
    async getInfo(client, key, type) {
        this.logger.log(`Getting ${dto_1.RedisDataType.Hash} type info.`);
        const [[, ttl = null], [, size = null], [, length = null],] = await client.sendPipeline([
            [browser_tool_commands_1.BrowserToolKeysCommands.Ttl, key],
            [browser_tool_commands_1.BrowserToolKeysCommands.MemoryUsage, key, 'samples', '0'],
            [browser_tool_commands_1.BrowserToolHashCommands.HLen, key],
        ]);
        return {
            name: key,
            type,
            ttl,
            size,
            length,
        };
    }
}
exports.HashKeyInfoStrategy = HashKeyInfoStrategy;
