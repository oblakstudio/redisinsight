"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedKeyInfoStrategy = void 0;
const browser_tool_commands_1 = require("../../../constants/browser-tool-commands");
const key_info_strategy_1 = require("./key-info.strategy");
class UnsupportedKeyInfoStrategy extends key_info_strategy_1.KeyInfoStrategy {
    async getInfo(client, key, type) {
        this.logger.log(`Getting ${type} type info.`);
        const [[, ttl = null], [, size = null],] = await client.sendPipeline([
            [browser_tool_commands_1.BrowserToolKeysCommands.Ttl, key],
            [browser_tool_commands_1.BrowserToolKeysCommands.MemoryUsage, key, 'samples', '0'],
        ]);
        return {
            name: key,
            type,
            ttl,
            size,
        };
    }
}
exports.UnsupportedKeyInfoStrategy = UnsupportedKeyInfoStrategy;
