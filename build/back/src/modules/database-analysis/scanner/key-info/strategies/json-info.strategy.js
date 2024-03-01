"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonInfoStrategy = void 0;
const abstract_info_strategy_1 = require("./abstract.info.strategy");
class JsonInfoStrategy extends abstract_info_strategy_1.AbstractInfoStrategy {
    async getLength(client, key) {
        const objectKeyType = await client.sendCommand(['json.type', key, '.'], { replyEncoding: 'utf8' });
        switch (objectKeyType) {
            case 'object':
                return await client.sendCommand(['json.objlen', key, '.'], { replyEncoding: 'utf8' });
            case 'array':
                return await client.sendCommand(['json.arrlen', key, '.'], { replyEncoding: 'utf8' });
            case 'string':
                return await client.sendCommand(['json.strlen', key, '.'], { replyEncoding: 'utf8' });
            default:
                return null;
        }
    }
}
exports.JsonInfoStrategy = JsonInfoStrategy;
