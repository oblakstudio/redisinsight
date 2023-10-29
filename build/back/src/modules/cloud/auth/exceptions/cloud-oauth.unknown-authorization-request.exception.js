"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudOauthUnknownAuthorizationRequestException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const error_messages_1 = require("../../../../constants/error-messages");
class CloudOauthUnknownAuthorizationRequestException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_OAUTH_GITHUB_UNKNOWN_AUTHORIZATION_REQUEST, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            error: 'CloudOauthUnknownAuthorizationRequest',
            errorCode: constants_1.CustomErrorCodes.CloudOauthUnknownAuthorizationRequest,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudOauthUnknownAuthorizationRequestException = CloudOauthUnknownAuthorizationRequestException;
