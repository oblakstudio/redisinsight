"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudApiForbiddenException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const error_messages_1 = require("../../../../constants/error-messages");
class CloudApiForbiddenException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_API_FORBIDDEN, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.FORBIDDEN,
            error: 'CloudApiForbidden',
            errorCode: constants_1.CustomErrorCodes.CloudApiForbidden,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudApiForbiddenException = CloudApiForbiddenException;
