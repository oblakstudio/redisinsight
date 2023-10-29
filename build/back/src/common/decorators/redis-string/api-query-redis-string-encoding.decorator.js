"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiQueryRedisStringEncoding = void 0;
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../constants");
const ApiQueryRedisStringEncoding = () => (0, swagger_1.ApiQuery)({
    name: constants_1.REDIS_STRING_ENCODING_QUERY_PARAM_NAME,
    enum: constants_1.RedisStringResponseEncoding,
});
exports.ApiQueryRedisStringEncoding = ApiQueryRedisStringEncoding;
