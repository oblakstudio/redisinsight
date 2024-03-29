"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettyFormat = exports.jsonFormat = exports.sensitiveDataFormatter = void 0;
const winston_1 = require("winston");
const lodash_1 = require("lodash");
const util_1 = require("util");
const errorWhiteListFields = [
    'message',
    'command.name',
];
const sanitizeStack = (stack) => {
    try {
        let sanitizedStack = stack;
        if (stack && stack.length) {
            sanitizedStack = stack.map((error) => {
                var _a;
                if ((error === null || error === void 0 ? void 0 : error.name) === 'AxiosError') {
                    return {
                        ...(0, lodash_1.pick)(error, ['message', 'name', 'code', 'stack']),
                        response: (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data,
                    };
                }
                return error;
            });
        }
        return (0, util_1.inspect)(sanitizedStack);
    }
    catch (e) {
        return e.stack;
    }
};
exports.sensitiveDataFormatter = (0, winston_1.format)((info, opts = {}) => {
    let stack;
    if (opts === null || opts === void 0 ? void 0 : opts.omitSensitiveData) {
        stack = (0, lodash_1.map)((0, lodash_1.get)(info, 'stack', []), (stackItem) => (0, lodash_1.pick)(stackItem, errorWhiteListFields));
    }
    else {
        stack = (0, lodash_1.map)((0, lodash_1.get)(info, 'stack', []), (stackItem) => {
            if (stackItem === null || stackItem === void 0 ? void 0 : stackItem.stack) {
                return {
                    ...stackItem,
                    stack: stackItem.stack,
                };
            }
            return stackItem;
        });
    }
    return {
        ...info,
        stack: sanitizeStack(stack),
    };
});
exports.jsonFormat = winston_1.format.printf((info) => {
    const logData = {
        level: info.level,
        timestamp: new Date().toLocaleString(),
        context: info.context,
        message: info.message,
        stack: sanitizeStack(info.stack),
    };
    return JSON.stringify(logData);
});
exports.prettyFormat = winston_1.format.printf((info) => {
    const separator = ' | ';
    const timestamp = new Date().toLocaleString();
    const { level, context, message, stack, } = info;
    const logData = [timestamp, `${level}`.toUpperCase(), context, message, { stack: sanitizeStack(stack) }];
    return logData.join(separator);
});
