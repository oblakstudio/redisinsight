"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejsonRlKeyInfoStrategy = void 0;
const dto_1 = require("../../dto");
const browser_tool_commands_1 = require("../../../constants/browser-tool-commands");
const key_info_strategy_1 = require("./key-info.strategy");
class RejsonRlKeyInfoStrategy extends key_info_strategy_1.KeyInfoStrategy {
    async getInfo(client, key, type) {
        this.logger.log(`Getting ${dto_1.RedisDataType.JSON} type info.`);
        const [[, ttl = null], [, size = null],] = await client.sendPipeline([
            [browser_tool_commands_1.BrowserToolKeysCommands.Ttl, key],
            [browser_tool_commands_1.BrowserToolKeysCommands.MemoryUsage, key, 'samples', '0'],
        ]);
        const length = await this.getLength(client, key);
        return {
            name: key,
            type,
            ttl,
            size,
            length,
        };
    }
    async getLength(client, key) {
        try {
            const objectKeyType = await client.sendCommand([browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonType, key, '.'], { replyEncoding: 'utf8' });
            switch (objectKeyType) {
                case 'object':
                    return await client.sendCommand([browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonObjLen, key, '.'], { replyEncoding: 'utf8' });
                case 'array':
                    return await client.sendCommand([browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonArrLen, key, '.'], { replyEncoding: 'utf8' });
                case 'string':
                    return await client.sendCommand([browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonStrLen, key, '.'], { replyEncoding: 'utf8' });
                default:
                    return null;
            }
        }
        catch (error) {
            return null;
        }
    }
}
exports.RejsonRlKeyInfoStrategy = RejsonRlKeyInfoStrategy;
