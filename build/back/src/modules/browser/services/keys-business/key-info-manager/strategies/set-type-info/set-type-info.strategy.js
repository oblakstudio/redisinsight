"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetTypeInfoStrategy = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../../../../../dto");
const browser_tool_commands_1 = require("../../../../../constants/browser-tool-commands");
class SetTypeInfoStrategy {
    constructor(redisManager) {
        this.logger = new common_1.Logger('SetTypeInfoStrategy');
        this.redisManager = redisManager;
    }
    async getInfo(clientMetadata, key, type) {
        this.logger.log(`Getting ${dto_1.RedisDataType.Set} type info.`);
        const [transactionError, transactionResults,] = await this.redisManager.execPipeline(clientMetadata, [
            [browser_tool_commands_1.BrowserToolKeysCommands.Ttl, key],
            [browser_tool_commands_1.BrowserToolKeysCommands.MemoryUsage, key, 'samples', '0'],
            [browser_tool_commands_1.BrowserToolSetCommands.SCard, key],
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
exports.SetTypeInfoStrategy = SetTypeInfoStrategy;
