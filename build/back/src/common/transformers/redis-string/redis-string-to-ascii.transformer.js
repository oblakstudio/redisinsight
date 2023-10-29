"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStringToASCIITransformer = void 0;
const lodash_1 = require("lodash");
const cli_helper_1 = require("../../../utils/cli-helper");
const class_transformer_1 = require("class-transformer");
const SingleRedisStringToASCII = (value) => {
    if (value instanceof Buffer) {
        return (0, cli_helper_1.getASCIISafeStringFromBuffer)(value);
    }
    return value;
};
const ArrayRedisStringToASCII = (value) => {
    if ((0, lodash_1.isArray)(value)) {
        return value.map(SingleRedisStringToASCII);
    }
    return value;
};
const RedisStringToASCIITransformer = (opts) => {
    if ((opts === null || opts === void 0 ? void 0 : opts.each) === true) {
        return (0, class_transformer_1.Transform)(ArrayRedisStringToASCII, opts);
    }
    return (0, class_transformer_1.Transform)(SingleRedisStringToASCII, opts);
};
exports.RedisStringToASCIITransformer = RedisStringToASCIITransformer;
