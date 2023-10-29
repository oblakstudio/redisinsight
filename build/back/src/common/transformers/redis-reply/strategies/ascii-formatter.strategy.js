"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASCIIFormatterStrategy = void 0;
const lodash_1 = require("lodash");
const cli_helper_1 = require("../../../../utils/cli-helper");
class ASCIIFormatterStrategy {
    format(reply) {
        if (reply instanceof Buffer) {
            return (0, cli_helper_1.getASCIISafeStringFromBuffer)(reply);
        }
        if ((0, lodash_1.isArray)(reply)) {
            return this.formatRedisArrayReply(reply);
        }
        if ((0, lodash_1.isObject)(reply)) {
            return this.formatRedisObjectReply(reply);
        }
        return reply;
    }
    formatRedisArrayReply(reply) {
        let result;
        if ((0, lodash_1.isArray)(reply)) {
            if (!reply.length) {
                result = [];
            }
            else {
                result = reply.map((item) => this.formatRedisArrayReply(item));
            }
        }
        else {
            result = this.format(reply);
        }
        return result;
    }
    formatRedisObjectReply(reply) {
        const result = {};
        if (reply instanceof Error) {
            return reply.toString();
        }
        Object.keys(reply).forEach((key) => {
            result[key] = this.format(reply[key]);
        });
        return result;
    }
}
exports.ASCIIFormatterStrategy = ASCIIFormatterStrategy;
