"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotal = void 0;
const ioredis_1 = require("ioredis");
const lodash_1 = require("lodash");
const utils_1 = require("../../../utils");
const getTotalFromInfo = async (client) => {
    try {
        const currentDbIndex = (0, lodash_1.get)(client, ['options', 'db'], 0);
        const info = (0, utils_1.convertRedisInfoReplyToObject)(await client.sendCommand(new ioredis_1.Command('info', ['keyspace'], {
            replyEncoding: 'utf8',
        })));
        const dbInfo = (0, lodash_1.get)(info, 'keyspace', {});
        if (!dbInfo[`db${currentDbIndex}`]) {
            return 0;
        }
        const { keys } = (0, utils_1.convertBulkStringsToObject)(dbInfo[`db${currentDbIndex}`], ',', '=');
        return parseInt(keys, 10);
    }
    catch (err) {
        return -1;
    }
};
const getTotalFromDBSize = async (client) => {
    const dbsize = await client.sendCommand(new ioredis_1.Command('dbsize', [], {
        replyEncoding: 'utf8',
    }));
    return parseInt(dbsize, 10);
};
const getTotal = async (client) => {
    try {
        return await getTotalFromDBSize(client);
    }
    catch (err) {
        return await getTotalFromInfo(client);
    }
};
exports.getTotal = getTotal;
