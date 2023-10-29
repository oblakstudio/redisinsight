"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractStrategy = void 0;
const browser_tool_commands_1 = require("../../../../constants/browser-tool-commands");
const ioredis_1 = require("ioredis");
class AbstractStrategy {
    constructor(redisConsumer) {
        this.redisConsumer = redisConsumer;
    }
    async getKeyInfo(client, key, knownType) {
        const options = {
            replyEncoding: 'utf8',
        };
        const size = await client.sendCommand(new ioredis_1.default.Command('memory', ['usage', key, 'samples', '0'], options));
        const type = knownType
            || await client.sendCommand(new ioredis_1.default.Command(browser_tool_commands_1.BrowserToolKeysCommands.Type, [key], options));
        const ttl = await client.sendCommand(new ioredis_1.default.Command(browser_tool_commands_1.BrowserToolKeysCommands.Ttl, [key], options));
        return {
            name: key,
            type,
            ttl,
            size,
        };
    }
    async getKeysInfo(client, keys, filterType) {
        if (client.isCluster) {
            return Promise.all(keys.map(async (key) => {
                let ttl;
                let size;
                let type;
                try {
                    ttl = await client.sendCommand(new ioredis_1.Command(browser_tool_commands_1.BrowserToolKeysCommands.Ttl, [key], { replyEncoding: 'utf8' }));
                }
                catch (e) {
                    ttl = null;
                }
                try {
                    size = await client.sendCommand(new ioredis_1.Command('memory', ['usage', key, 'samples', '0'], { replyEncoding: 'utf8' }));
                }
                catch (e) {
                    size = null;
                }
                try {
                    type = filterType || await client.sendCommand(new ioredis_1.Command(browser_tool_commands_1.BrowserToolKeysCommands.Type, [key], { replyEncoding: 'utf8' }));
                }
                catch (e) {
                    type = null;
                }
                return {
                    name: key,
                    type,
                    ttl,
                    size,
                };
            }));
        }
        const sizeResults = await this.getKeysSize(client, keys);
        const typeResults = filterType
            ? Array(keys.length).fill(filterType)
            : await this.getKeysType(client, keys);
        const ttlResults = await this.getKeysTtl(client, keys);
        return keys.map((key, index) => ({
            name: key,
            type: typeResults[index],
            ttl: ttlResults[index],
            size: sizeResults[index],
        }));
    }
    async getKeysTtl(client, keys) {
        const [transactionError, transactionResults,] = await this.redisConsumer.execPipelineFromClient(client, keys.map((key) => [browser_tool_commands_1.BrowserToolKeysCommands.Ttl, key]));
        if (transactionError) {
            throw transactionError;
        }
        else {
            return transactionResults.map((item) => item[0] ? null : item[1]);
        }
    }
    async getKeysType(client, keys) {
        const [transactionError, transactionResults,] = await this.redisConsumer.execPipelineFromClient(client, keys.map((key) => [browser_tool_commands_1.BrowserToolKeysCommands.Type, key]));
        if (transactionError) {
            throw transactionError;
        }
        else {
            return transactionResults.map((item) => item[0] ? null : item[1]);
        }
    }
    async getKeysSize(client, keys) {
        const [transactionError, transactionResults,] = await this.redisConsumer.execPipelineFromClient(client, keys.map((key) => [
            browser_tool_commands_1.BrowserToolKeysCommands.MemoryUsage,
            key,
            'samples',
            '0',
        ]));
        if (transactionError) {
            throw transactionError;
        }
        else {
            return transactionResults.map((item) => item[0] ? null : item[1]);
        }
    }
}
exports.AbstractStrategy = AbstractStrategy;
