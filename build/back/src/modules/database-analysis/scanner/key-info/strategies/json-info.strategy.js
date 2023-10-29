"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonInfoStrategy = void 0;
const abstract_info_strategy_1 = require("./abstract.info.strategy");
const ioredis_1 = require("ioredis");
class JsonInfoStrategy extends abstract_info_strategy_1.AbstractInfoStrategy {
    async getLength(client, key) {
        const objectKeyType = await client.sendCommand(new ioredis_1.Command('json.type', [key, '.'], {
            replyEncoding: 'utf8',
        }));
        switch (objectKeyType) {
            case 'object':
                return await client.sendCommand(new ioredis_1.Command('json.objlen', [key, '.'], {
                    replyEncoding: 'utf8',
                }));
            case 'array':
                return await client.sendCommand(new ioredis_1.Command('json.arrlen', [key, '.'], {
                    replyEncoding: 'utf8',
                }));
            case 'string':
                return await client.sendCommand(new ioredis_1.Command('json.strlen', [key, '.'], {
                    replyEncoding: 'utf8',
                }));
            default:
                return null;
        }
    }
}
exports.JsonInfoStrategy = JsonInfoStrategy;
