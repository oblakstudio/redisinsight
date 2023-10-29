"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudApiUnauthorizedException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const error_messages_1 = require("../../../../constants/error-messages");
class CloudApiUnauthorizedException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_API_UNAUTHORIZED, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
            error: 'CloudApiUnauthorized',
            errorCode: constants_1.CustomErrorCodes.CloudApiUnauthorized,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudApiUnauthorizedException = CloudApiUnauthorizedException;
