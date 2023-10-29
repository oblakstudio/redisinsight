"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCLIParams = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function ApiCLIParams(requireClientUuid = true) {
    const decorators = [
        (0, swagger_1.ApiParam)({
            name: 'dbInstance',
            description: 'Database instance id.',
            type: String,
            required: true,
        }),
    ];
    if (requireClientUuid) {
        decorators.push((0, swagger_1.ApiParam)({
            name: 'uuid',
            description: 'CLI client uuid',
            type: String,
            required: true,
        }));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.ApiCLIParams = ApiCLIParams;
