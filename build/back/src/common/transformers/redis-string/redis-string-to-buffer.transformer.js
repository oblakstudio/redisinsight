"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStringToBufferTransformer = void 0;
const lodash_1 = require("lodash");
const class_transformer_1 = require("class-transformer");
const SingleRedisStringToBuffer = (value) => {
    if (value instanceof Buffer) {
        return value;
    }
    return Buffer.from(value);
};
const ArrayRedisStringToBuffer = (value) => {
    if ((0, lodash_1.isArray)(value)) {
        return value.map(SingleRedisStringToBuffer);
    }
    return Buffer.from(value);
};
const RedisStringToBufferTransformer = (opts) => {
    if ((opts === null || opts === void 0 ? void 0 : opts.each) === true) {
        return (0, class_transformer_1.Transform)(ArrayRedisStringToBuffer, opts);
    }
    return (0, class_transformer_1.Transform)(SingleRedisStringToBuffer, opts);
};
exports.RedisStringToBufferTransformer = RedisStringToBufferTransformer;
