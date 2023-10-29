"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBufferFromSafeASCIIString = exports.getUTF8FromRedisString = exports.getUTF8FromBuffer = exports.getASCIISafeStringFromBuffer = exports.multilineCommandToOneLine = exports.getRedisPipelineSummary = exports.parseRedirectionError = exports.checkRedirectionError = exports.checkHumanReadableCommands = exports.decimalToHexString = exports.getBlockingCommands = exports.splitCliCommandLine = exports.convertToStringIfPossible = exports.CliToolHumanReadableCommands = exports.CliToolBlockingCommands = void 0;
const lodash_1 = require("lodash");
const config_1 = require("./config");
const error_messages_1 = require("../constants/error-messages");
const errors_1 = require("../modules/cli/constants/errors");
const constants_1 = require("../constants");
const LOGGER_CONFIG = config_1.default.get('logger');
const BLANK_LINE_REGEX = /^\s*\n/gm;
var CliToolBlockingCommands;
(function (CliToolBlockingCommands) {
    CliToolBlockingCommands["BLPop"] = "blpop";
    CliToolBlockingCommands["BRPop"] = "brpop";
    CliToolBlockingCommands["BLMove"] = "blmove";
    CliToolBlockingCommands["BRPopLPush"] = "brpoplpush";
    CliToolBlockingCommands["BZPopMin"] = "bzpopmin";
    CliToolBlockingCommands["BZPopMax"] = "bzpopmax";
    CliToolBlockingCommands["XRead"] = "xread";
    CliToolBlockingCommands["XReadGroup"] = "xreadgroup";
})(CliToolBlockingCommands = exports.CliToolBlockingCommands || (exports.CliToolBlockingCommands = {}));
var CliToolHumanReadableCommands;
(function (CliToolHumanReadableCommands) {
    CliToolHumanReadableCommands["Info"] = "info";
    CliToolHumanReadableCommands["Lolwut"] = "lolwut";
    CliToolHumanReadableCommands["DebugHStats"] = "debug hstats";
    CliToolHumanReadableCommands["DebugHStatsKey"] = "debug hstats-key";
    CliToolHumanReadableCommands["MemoryDoctor"] = "memory doctor";
    CliToolHumanReadableCommands["MemoryMallocStats"] = "memory malloc-stats";
    CliToolHumanReadableCommands["ClusterNodes"] = "cluster nodes";
    CliToolHumanReadableCommands["ClusterInfo"] = "cluster info";
    CliToolHumanReadableCommands["ClientList"] = "client list";
    CliToolHumanReadableCommands["LatencyGraph"] = "latency graph";
    CliToolHumanReadableCommands["LatencyDoctor"] = "latency doctor";
    CliToolHumanReadableCommands["ProxyInfo"] = "proxy info";
})(CliToolHumanReadableCommands = exports.CliToolHumanReadableCommands || (exports.CliToolHumanReadableCommands = {}));
function isHex(str) {
    return /^[A-F0-9]{1,2}$/i.test(str);
}
function getSpecChar(str) {
    let char;
    switch (str) {
        case 'a':
            char = String.fromCharCode(7);
            break;
        case 'b':
            char = String.fromCharCode(8);
            break;
        case 't':
            char = String.fromCharCode(9);
            break;
        case 'n':
            char = String.fromCharCode(10);
            break;
        case 'r':
            char = String.fromCharCode(13);
            break;
        default:
            char = str;
    }
    return char;
}
const convertToStringIfPossible = (data) => {
    if (data instanceof Buffer) {
        const str = data.toString();
        if (Buffer.compare(data, Buffer.from(str)) === 0) {
            return str;
        }
    }
    return data;
};
exports.convertToStringIfPossible = convertToStringIfPossible;
const splitCliCommandLine = (line) => {
    let i = 0;
    let currentArg = '';
    const args = [];
    while (i < line.length) {
        while (line[i] === ' ')
            i += 1;
        let inq = false;
        let insq = false;
        let done = false;
        while (!done) {
            if (inq) {
                if (i >= line.length) {
                    throw new errors_1.CommandParsingError(error_messages_1.default.CLI_UNTERMINATED_QUOTES());
                }
                else if (line[i] === '\\'
                    && line[i + 1] === 'x'
                    && isHex(`${line[i + 2]}${line[i + 3]}`)) {
                    const charCode = parseInt(`0x${line[i + 2]}${line[i + 3]}`, 16);
                    currentArg = Buffer.concat([
                        currentArg,
                        Buffer.alloc(1, charCode, 'binary'),
                    ]);
                    i += 3;
                }
                else if (line[i] === '\\' && i < line.length) {
                    i += 1;
                    const c = getSpecChar(line[i]);
                    currentArg = Buffer.concat([
                        currentArg,
                        Buffer.alloc(1, c, 'binary'),
                    ]);
                }
                else if (line[i] === '"') {
                    if (i + 1 < line.length && line[i + 1] !== ' ') {
                        throw new errors_1.CommandParsingError(error_messages_1.default.CLI_INVALID_QUOTES_CLOSING());
                    }
                    done = true;
                }
                else {
                    currentArg = Buffer.concat([
                        currentArg,
                        Buffer.from(line[i], 'utf8'),
                    ]);
                }
            }
            else if (insq) {
                if (i >= line.length) {
                    throw new errors_1.CommandParsingError(error_messages_1.default.CLI_UNTERMINATED_QUOTES());
                }
                else if (line[i] === '\\' && line[i + 1] === "'") {
                    i += 1;
                    currentArg += "'";
                }
                else if (line[i] === "'") {
                    if (i + 1 < line.length && line[i + 1] !== ' ') {
                        throw new errors_1.CommandParsingError(error_messages_1.default.CLI_INVALID_QUOTES_CLOSING());
                    }
                    done = true;
                }
                else {
                    currentArg = `${currentArg}${line[i]}`;
                }
            }
            else if (i >= line.length) {
                done = true;
            }
            else if ([' ', '\n', '\r', '\t', '\0'].includes(line[i])) {
                done = true;
            }
            else if (line[i] === '"') {
                currentArg = Buffer.from(currentArg);
                inq = true;
            }
            else if (line[i] === "'") {
                insq = true;
            }
            else {
                currentArg = `${currentArg || ''}${line[i]}`;
            }
            if (i < line.length)
                i += 1;
        }
        args.push((0, exports.convertToStringIfPossible)(currentArg));
        currentArg = '';
    }
    return args;
};
exports.splitCliCommandLine = splitCliCommandLine;
const getBlockingCommands = () => Object.values(CliToolBlockingCommands);
exports.getBlockingCommands = getBlockingCommands;
function decimalToHexString(d, padding = 2) {
    const hex = Number(d).toString(16);
    return '0'.repeat(padding).substr(0, padding - hex.length) + hex;
}
exports.decimalToHexString = decimalToHexString;
function checkHumanReadableCommands(commandLine) {
    return !!Object.values(CliToolHumanReadableCommands)
        .find((command) => commandLine.toLowerCase().startsWith(command));
}
exports.checkHumanReadableCommands = checkHumanReadableCommands;
function checkRedirectionError(error) {
    try {
        return error.message.startsWith('MOVED') || error.message.startsWith('ASK');
    }
    catch (e) {
        return false;
    }
}
exports.checkRedirectionError = checkRedirectionError;
function parseRedirectionError(error) {
    try {
        const [, slot, address] = error.message.split(' ');
        const { port } = new URL(`redis://${address}`);
        if (!port) {
            throw new Error();
        }
        return { slot, address };
    }
    catch (e) {
        throw new errors_1.RedirectionParsingError();
    }
}
exports.parseRedirectionError = parseRedirectionError;
function getRedisPipelineSummary(pipeline, limit = LOGGER_CONFIG.pipelineSummaryLimit) {
    const result = {
        summary: '[]',
        length: 0,
    };
    try {
        const commands = pipeline.reduce((prev, cur) => [...prev, cur[0]], []);
        result.length = commands.length;
        result.summary = commands.length > limit
            ? JSON.stringify([...(0, lodash_1.take)(commands, limit), '...'])
            : JSON.stringify(commands);
    }
    catch (e) {
    }
    return result;
}
exports.getRedisPipelineSummary = getRedisPipelineSummary;
const multilineCommandToOneLine = (text = '') => text
    .split(/(\r\n|\n|\r)+\s+/gm)
    .filter((line) => !(BLANK_LINE_REGEX.test(line) || (0, lodash_1.isEmpty)(line)))
    .join(' ');
exports.multilineCommandToOneLine = multilineCommandToOneLine;
const getASCIISafeStringFromBuffer = (reply) => {
    let result = '';
    reply.forEach((byte) => {
        const char = Buffer.from([byte]).toString();
        if (constants_1.IS_NON_PRINTABLE_ASCII_CHARACTER.test(char)) {
            result += `\\x${decimalToHexString(byte)}`;
        }
        else {
            switch (char) {
                case '\u0007':
                    result += '\\a';
                    break;
                case '"':
                    result += '\\"';
                    break;
                case '\\':
                    result += '\\\\';
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
    return result;
};
exports.getASCIISafeStringFromBuffer = getASCIISafeStringFromBuffer;
const getUTF8FromBuffer = (reply) => reply.toString('utf8');
exports.getUTF8FromBuffer = getUTF8FromBuffer;
const getUTF8FromRedisString = (value) => {
    if (value instanceof Buffer) {
        return value.toString('utf8');
    }
    return value;
};
exports.getUTF8FromRedisString = getUTF8FromRedisString;
const getBufferFromSafeASCIIString = (str) => {
    const bytes = [];
    for (let i = 0; i < str.length; i += 1) {
        if (str[i] === '\\') {
            if (str[i + 1] === 'x') {
                const hexString = str.substr(i + 2, 2);
                if (isHex(hexString)) {
                    bytes.push(Buffer.from(hexString, 'hex'));
                    i += 3;
                    continue;
                }
            }
            if (['a', '"', '\\', 'b', 't', 'n', 'r'].includes(str[i + 1])) {
                switch (str[i + 1]) {
                    case 'a':
                        bytes.push(Buffer.from('\u0007'));
                        break;
                    case 'b':
                        bytes.push(Buffer.from('\b'));
                        break;
                    case 't':
                        bytes.push(Buffer.from('\t'));
                        break;
                    case 'n':
                        bytes.push(Buffer.from('\n'));
                        break;
                    case 'r':
                        bytes.push(Buffer.from('\r'));
                        break;
                    default:
                        bytes.push(Buffer.from(str[i + 1]));
                }
                i += 1;
                continue;
            }
        }
        bytes.push(Buffer.from(str[i]));
    }
    return Buffer.concat(bytes);
};
exports.getBufferFromSafeASCIIString = getBufferFromSafeASCIIString;
