"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoverSentinelMasterGroups = exports.discoverOtherSentinels = exports.isSentinel = void 0;
const sentinel_master_1 = require("../../redis-sentinel/models/sentinel-master");
const utils_1 = require("../../../utils");
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../constants/error-messages");
const reply_util_1 = require("./reply.util");
const isSentinel = async (client) => {
    try {
        await client.sendCommand(['sentinel', 'masters']);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.isSentinel = isSentinel;
const discoverOtherSentinels = async (client, masterGroup) => {
    let result;
    try {
        const reply = await client.sendCommand([
            'sentinel',
            'sentinels',
            masterGroup,
        ], { replyEncoding: 'utf8' });
        result = reply.map((item) => {
            const { ip, port } = (0, reply_util_1.convertArrayReplyToObject)(item);
            return { host: ip, port: parseInt(port, 10) };
        });
        return [
            ...result,
        ];
    }
    catch (error) {
        if (error.message.includes('unknown command `sentinel`')) {
            throw new common_1.BadRequestException(error_messages_1.default.WRONG_DATABASE_TYPE);
        }
        throw (0, utils_1.catchAclError)(error);
    }
};
exports.discoverOtherSentinels = discoverOtherSentinels;
const discoverSentinelMasterGroups = async (client) => {
    let result;
    try {
        const reply = await client.sendCommand(['sentinel', 'masters'], { replyEncoding: 'utf8' });
        result = reply.map((item) => {
            const { ip, port, name, 'num-slaves': numberOfSlaves, flags, } = (0, reply_util_1.convertArrayReplyToObject)(item);
            return {
                host: ip,
                port: parseInt(port, 10),
                name,
                status: flags.includes('down') ? sentinel_master_1.SentinelMasterStatus.Down : sentinel_master_1.SentinelMasterStatus.Active,
                numberOfSlaves: parseInt(numberOfSlaves, 10),
            };
        });
        await Promise.all(result.map(async (master, index) => {
            const nodes = await (0, exports.discoverOtherSentinels)(client, master.name);
            result[index] = {
                ...master,
                nodes,
            };
        }));
        return result;
    }
    catch (error) {
        if (error.message.includes('unknown command `sentinel`')) {
            throw new common_1.BadRequestException(error_messages_1.default.WRONG_DISCOVERY_TOOL());
        }
        throw (0, utils_1.catchAclError)(error);
    }
};
exports.discoverSentinelMasterGroups = discoverSentinelMasterGroups;
