"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSTypeInfoStrategy = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../../../../../utils");
const dto_1 = require("../../../../../dto");
const browser_tool_commands_1 = require("../../../../../constants/browser-tool-commands");
class TSTypeInfoStrategy {
    constructor(redisManager) {
        this.logger = new common_1.Logger('TSTypeInfoStrategy');
        this.redisManager = redisManager;
    }
    async getInfo(clientMetadata, key, type) {
        this.logger.log(`Getting ${dto_1.RedisDataType.TS} type info.`);
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
            const length = await this.getTotalSamples(clientMetadata, key);
            return {
                name: key,
                type,
                ttl,
                size: size || null,
                length,
            };
        }
    }
    async getTotalSamples(clientMetadata, key) {
        try {
            const info = await this.redisManager.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolTSCommands.TSInfo, [key], 'utf8');
            const { totalsamples } = (0, utils_1.convertStringsArrayToObject)(info);
            return totalsamples;
        }
        catch (error) {
            return undefined;
        }
    }
}
exports.TSTypeInfoStrategy = TSTypeInfoStrategy;
