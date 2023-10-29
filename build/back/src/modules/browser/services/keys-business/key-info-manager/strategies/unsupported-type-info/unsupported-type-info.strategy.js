"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedTypeInfoStrategy = void 0;
const common_1 = require("@nestjs/common");
const browser_tool_commands_1 = require("../../../../../constants/browser-tool-commands");
class UnsupportedTypeInfoStrategy {
    constructor(redisManager) {
        this.logger = new common_1.Logger('UnsupportedTypeInfoStrategy');
        this.redisManager = redisManager;
    }
    async getInfo(clientMetadata, key, type) {
        this.logger.log(`Getting ${type} type info.`);
        const [transactionError, transactionResults,] = await this.redisManager.execPipeline(clientMetadata, [
            [browser_tool_commands_1.BrowserToolKeysCommands.Ttl, key],
            [browser_tool_commands_1.BrowserToolKeysCommands.MemoryUsage, key, 'samples', '0'],
        ]);
        if (transactionError) {
            throw transactionError;
        }
        else {
            const result = transactionResults.map((item) => item[1]);
            const [ttl, size] = result;
            return {
                name: key,
                type,
                ttl,
                size: size || null,
            };
        }
    }
}
exports.UnsupportedTypeInfoStrategy = UnsupportedTypeInfoStrategy;
