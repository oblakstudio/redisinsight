"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTypeInfoStrategy = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../../../../../dto");
const browser_tool_commands_1 = require("../../../../../constants/browser-tool-commands");
class ListTypeInfoStrategy {
    constructor(redisManager) {
        this.logger = new common_1.Logger('ListTypeInfoStrategy');
        this.redisManager = redisManager;
    }
    async getInfo(clientMetadata, key, type) {
        this.logger.log(`Getting ${dto_1.RedisDataType.List} type info.`);
        const [transactionError, transactionResults,] = await this.redisManager.execPipeline(clientMetadata, [
            [browser_tool_commands_1.BrowserToolKeysCommands.Ttl, key],
            [browser_tool_commands_1.BrowserToolKeysCommands.MemoryUsage, key, 'samples', '0'],
            [browser_tool_commands_1.BrowserToolListCommands.LLen, key],
        ]);
        if (transactionError) {
            throw transactionError;
        }
        else {
            const result = transactionResults.map((item) => item[1]);
            const [ttl, size, length] = result;
            return {
                name: key,
                type,
                ttl,
                size: size || null,
                length,
            };
        }
    }
}
exports.ListTypeInfoStrategy = ListTypeInfoStrategy;
