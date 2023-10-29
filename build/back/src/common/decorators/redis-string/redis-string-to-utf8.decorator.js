"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStringToUTF8 = void 0;
const transformers_1 = require("../../transformers");
const RedisStringToUTF8 = (opts) => (0, transformers_1.RedisStringToUTF8Transformer)(opts);
exports.RedisStringToUTF8 = RedisStringToUTF8;
