"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudOauthMisconfigurationException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const error_messages_1 = require("../../../../constants/error-messages");
class CloudOauthMisconfigurationException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_OAUTH_MISCONFIGURATION, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'CloudOauthMisconfiguration',
            errorCode: constants_1.CustomErrorCodes.CloudOauthMisconfiguration,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudOauthMisconfigurationException = CloudOauthMisconfigurationException;
