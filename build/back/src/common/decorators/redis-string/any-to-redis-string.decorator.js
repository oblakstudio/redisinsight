"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyToRedisString = void 0;
const transformers_1 = require("../../transformers");
const AnyToRedisString = (opts) => (0, transformers_1.AnyToRedisStringTransformer)(opts);
exports.AnyToRedisString = AnyToRedisString;
