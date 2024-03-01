"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphKeyInfoStrategy = void 0;
const dto_1 = require("../../dto");
const browser_tool_commands_1 = require("../../../constants/browser-tool-commands");
const key_info_strategy_1 = require("./key-info.strategy");
class GraphKeyInfoStrategy extends key_info_strategy_1.KeyInfoStrategy {
    async getInfo(client, key, type) {
        this.logger.log(`Getting ${dto_1.RedisDataType.Graph} type info.`);
        const [[, ttl = null], [, size = null],] = await client.sendPipeline([
            [browser_tool_commands_1.BrowserToolKeysCommands.Ttl, key],
            [browser_tool_commands_1.BrowserToolKeysCommands.MemoryUsage, key, 'samples', '0'],
        ]);
        const length = await this.getNodesCount(client, key);
        return {
            name: key,
            type,
            ttl,
            size,
            length,
        };
    }
    async getNodesCount(client, key) {
        try {
            const queryReply = await client.sendCommand([
                browser_tool_commands_1.BrowserToolGraphCommands.GraphQuery,
                key,
                'MATCH (r) RETURN count(r)',
                '--compact',
            ]);
            return queryReply[1][0][0][1];
        }
        catch (error) {
            return undefined;
        }
    }
}
exports.GraphKeyInfoStrategy = GraphKeyInfoStrategy;
