"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudOauthGithubEmailPermissionException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const error_messages_1 = require("../../../../constants/error-messages");
class CloudOauthGithubEmailPermissionException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_OAUTH_GITHUB_EMAIL_PERMISSION, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            error: 'CloudOauthGithubEmailPermission',
            errorCode: constants_1.CustomErrorCodes.CloudOauthGithubEmailPermission,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudOauthGithubEmailPermissionException = CloudOauthGithubEmailPermissionException;
