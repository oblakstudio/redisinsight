"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStringToASCII = void 0;
const transformers_1 = require("../../transformers");
const RedisStringToASCII = (opts) => (0, transformers_1.RedisStringToASCIITransformer)(opts);
exports.RedisStringToASCII = RedisStringToASCII;
