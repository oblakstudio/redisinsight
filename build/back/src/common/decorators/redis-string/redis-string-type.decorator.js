"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStringType = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("..");
const constants_1 = require("../../constants");
function RedisStringType(opts) {
    return (0, common_1.applyDecorators)((0, decorators_1.RedisStringToASCII)({
        groups: [constants_1.RedisStringResponseEncoding.ASCII],
        toPlainOnly: true,
        ...opts,
    }), (0, decorators_1.RedisStringToUTF8)({
        groups: [constants_1.RedisStringResponseEncoding.UTF8],
        toPlainOnly: true,
        ...opts,
    }), (0, decorators_1.RedisStringToBuffer)({
        groups: [constants_1.RedisStringResponseEncoding.Buffer],
        toPlainOnly: true,
        ...opts,
    }), (0, decorators_1.AnyToRedisString)({
        toClassOnly: true,
        ...opts,
    }));
}
exports.RedisStringType = RedisStringType;
