"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyToRedisStringTransformer = void 0;
const lodash_1 = require("lodash");
const cli_helper_1 = require("../../../utils/cli-helper");
const class_transformer_1 = require("class-transformer");
const SingleToRedisStringTransformer = (value) => {
    if ((value === null || value === void 0 ? void 0 : value.type) === 'Buffer') {
        if ((0, lodash_1.isArray)(value.data)) {
            return Buffer.from(value);
        }
        if ((0, lodash_1.isObject)(value.data)) {
            return Buffer.from(Object.values(value.data));
        }
    }
    if ((0, lodash_1.isString)(value)) {
        return (0, cli_helper_1.getBufferFromSafeASCIIString)(value);
    }
    return value;
};
const ArrayToRedisStringTransformer = (value) => {
    if ((0, lodash_1.isArray)(value)) {
        return value.map(SingleToRedisStringTransformer);
    }
    return value;
};
const AnyToRedisStringTransformer = (opts) => {
    if ((opts === null || opts === void 0 ? void 0 : opts.each) === true) {
        return (0, class_transformer_1.Transform)(ArrayToRedisStringTransformer, opts);
    }
    return (0, class_transformer_1.Transform)(SingleToRedisStringTransformer, opts);
};
exports.AnyToRedisStringTransformer = AnyToRedisStringTransformer;
