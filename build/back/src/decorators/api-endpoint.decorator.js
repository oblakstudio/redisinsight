"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiEndpoint = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("../utils/config");
const SERVER_CONFIG = config_1.default.get('server');
function ApiEndpoint(options) {
    const { description, statusCode, responses = [], excludeFor = [], } = options;
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ description }), (0, swagger_1.ApiExcludeEndpoint)(excludeFor.includes(SERVER_CONFIG.buildType)), (0, common_1.HttpCode)(statusCode), ...responses === null || responses === void 0 ? void 0 : responses.map((response) => (0, swagger_1.ApiResponse)(response)));
}
exports.ApiEndpoint = ApiEndpoint;
