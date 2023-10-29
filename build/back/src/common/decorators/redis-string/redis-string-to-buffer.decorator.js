"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStringToBuffer = void 0;
const transformers_1 = require("../../transformers");
const RedisStringToBuffer = (opts) => (0, transformers_1.RedisStringToBufferTransformer)(opts);
exports.RedisStringToBuffer = RedisStringToBuffer;
