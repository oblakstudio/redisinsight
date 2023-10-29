"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRedisParams = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function ApiRedisParams() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiParam)({
        name: 'dbInstance',
        description: 'Database instance id.',
        type: String,
        required: true,
    }));
}
exports.ApiRedisParams = ApiRedisParams;
