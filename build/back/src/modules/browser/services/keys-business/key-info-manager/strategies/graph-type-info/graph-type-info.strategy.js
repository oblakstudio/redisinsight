"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphTypeInfoStrategy = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../../../../../dto");
const browser_tool_commands_1 = require("../../../../../constants/browser-tool-commands");
class GraphTypeInfoStrategy {
    constructor(redisManager) {
        this.logger = new common_1.Logger('GraphTypeInfoStrategy');
        this.redisManager = redisManager;
    }
    async getInfo(clientMetadata, key, type) {
        this.logger.log(`Getting ${dto_1.RedisDataType.Graph} type info.`);
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
            const length = await this.getNodesCount(clientMetadata, key);
            return {
                name: key,
                type,
                ttl,
                size: size || null,
                length,
            };
        }
    }
    async getNodesCount(clientMetadata, key) {
        try {
            const queryReply = await this.redisManager.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolGraphCommands.GraphQuery, [key, 'MATCH (r) RETURN count(r)', '--compact']);
            return queryReply[1][0][0][1];
        }
        catch (error) {
            return undefined;
        }
    }
}
exports.GraphTypeInfoStrategy = GraphTypeInfoStrategy;
