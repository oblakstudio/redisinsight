"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRedisInstanceOperation = void 0;
const common_1 = require("@nestjs/common");
const api_redis_params_decorator_1 = require("./api-redis-params.decorator");
const api_endpoint_decorator_1 = require("./api-endpoint.decorator");
function ApiRedisInstanceOperation(options) {
    return (0, common_1.applyDecorators)((0, api_redis_params_decorator_1.ApiRedisParams)(), (0, api_endpoint_decorator_1.ApiEndpoint)(options));
}
exports.ApiRedisInstanceOperation = ApiRedisInstanceOperation;
