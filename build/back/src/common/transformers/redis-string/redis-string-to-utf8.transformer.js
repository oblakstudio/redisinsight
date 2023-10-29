"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStringToUTF8Transformer = void 0;
const lodash_1 = require("lodash");
const class_transformer_1 = require("class-transformer");
const SingleRedisStringToUTF8 = (value) => {
    if (value instanceof Buffer) {
        return value.toString('utf8');
    }
    return value;
};
const ArrayRedisStringToUTF8 = (value) => {
    if ((0, lodash_1.isArray)(value)) {
        return value.map(SingleRedisStringToUTF8);
    }
    return value;
};
const RedisStringToUTF8Transformer = (opts) => {
    if (opts === null || opts === void 0 ? void 0 : opts.each) {
        return (0, class_transformer_1.Transform)(ArrayRedisStringToUTF8, opts);
    }
    return (0, class_transformer_1.Transform)(SingleRedisStringToUTF8, opts);
};
exports.RedisStringToUTF8Transformer = RedisStringToUTF8Transformer;
