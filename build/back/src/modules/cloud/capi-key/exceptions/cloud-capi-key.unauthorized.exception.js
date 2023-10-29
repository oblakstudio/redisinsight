"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudCapiKeyUnauthorizedException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const error_messages_1 = require("../../../../constants/error-messages");
class CloudCapiKeyUnauthorizedException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_CAPI_KEY_UNAUTHORIZED, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
            error: 'CloudCapiKeyUnauthorized',
            errorCode: constants_1.CustomErrorCodes.CloudCapiKeyUnauthorized,
            resourceId: options === null || options === void 0 ? void 0 : options.resourceId,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudCapiKeyUnauthorizedException = CloudCapiKeyUnauthorizedException;
