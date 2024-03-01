"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFormatterStrategy = void 0;
const lodash_1 = require("lodash");
const constants_1 = require("../../../../../../constants");
const cli_helper_1 = require("../../../../../../utils/cli-helper");
class TextFormatterStrategy {
    format(reply) {
        let result;
        if ((0, lodash_1.isNull)(reply)) {
            result = '(nil)';
        }
        else if ((0, lodash_1.isInteger)(reply)) {
            result = `(integer) ${reply}`;
        }
        else if (reply instanceof Buffer) {
            result = this.formatRedisBufferReply(reply);
        }
        else if ((0, lodash_1.isArray)(reply)) {
            result = this.formatRedisArrayReply(reply);
        }
        else if ((0, lodash_1.isObject)(reply)) {
            result = this.formatRedisArrayReply((0, lodash_1.flattenDeep)(Object.entries(reply)));
        }
        else {
            result = reply;
        }
        return result;
    }
    formatRedisArrayReply(reply, level = 0) {
        let result;
        if ((0, lodash_1.isArray)(reply)) {
            if (!reply.length) {
                result = '(empty list or set)';
            }
            else {
                result = reply
                    .map((item, index) => {
                    const leftMargin = index > 0 ? '   '.repeat(level) : '';
                    const lineIndex = `${leftMargin}${index + 1})`;
                    const value = this.formatRedisArrayReply(item, level + 1);
                    return `${lineIndex} ${value}`;
                })
                    .join('\n');
            }
        }
        else {
            result = reply instanceof Buffer
                ? this.formatRedisBufferReply(reply)
                : JSON.stringify(reply);
        }
        return result;
    }
    formatRedisBufferReply(reply) {
        let result = '"';
        reply.forEach((byte) => {
            const char = Buffer.from([byte]).toString();
            if (constants_1.IS_NON_PRINTABLE_ASCII_CHARACTER.test(char)) {
                result += `\\x${(0, cli_helper_1.decimalToHexString)(byte)}`;
            }
            else {
                switch (char) {
                    case '\\':
                        result += `\\${char}`;
                        break;
                    case '\u0007':
                        result += '\\a';
                        break;
                    case '"':
                        result += `\\${char}`;
                        break;
                    case '\b':
                        result += '\\b';
                        break;
                    case '\t':
                        result += '\\t';
                        break;
                    case '\n':
                        result += '\\n';
                        break;
                    case '\r':
                        result += '\\r';
                        break;
                    default:
                        result += char;
                }
            }
        });
        result += '"';
        return result;
    }
}
exports.TextFormatterStrategy = TextFormatterStrategy;
