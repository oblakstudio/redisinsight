"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalKeys = exports.getTotalKeysFromDBSize = exports.getTotalKeysFromInfo = void 0;
const lodash_1 = require("lodash");
const utils_1 = require("../../../utils");
const reply_util_1 = require("./reply.util");
const getTotalKeysFromInfo = async (client) => {
    try {
        const currentDbIndex = await client.getCurrentDbIndex();
        const info = (0, utils_1.convertRedisInfoReplyToObject)(await client.sendCommand(['info', 'keyspace'], {
            replyEncoding: 'utf8',
        }));
        const dbInfo = (0, lodash_1.get)(info, 'keyspace', {});
        if (!dbInfo[`db${currentDbIndex}`]) {
            return 0;
        }
        const { keys } = (0, reply_util_1.convertMultilineReplyToObject)(dbInfo[`db${currentDbIndex}`], ',', '=');
        return parseInt(keys, 10);
    }
    catch (err) {
        return -1;
    }
};
exports.getTotalKeysFromInfo = getTotalKeysFromInfo;
const getTotalKeysFromDBSize = async (client) => {
    const total = await client.sendCommand(['dbsize'], {
        replyEncoding: 'utf8',
    });
    return parseInt(total, 10);
};
exports.getTotalKeysFromDBSize = getTotalKeysFromDBSize;
const getTotalKeys = async (client) => {
    try {
        return await (0, exports.getTotalKeysFromDBSize)(client);
    }
    catch (err) {
        return await (0, exports.getTotalKeysFromInfo)(client);
    }
};
exports.getTotalKeys = getTotalKeys;
