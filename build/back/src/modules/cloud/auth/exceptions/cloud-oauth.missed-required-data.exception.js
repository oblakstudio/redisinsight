"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudOauthMissedRequiredDataException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const error_messages_1 = require("../../../../constants/error-messages");
class CloudOauthMissedRequiredDataException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_OAUTH_MISSED_REQUIRED_DATA, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            error: 'CloudOauthMissedRequiredData',
            errorCode: constants_1.CustomErrorCodes.CloudOauthMissedRequiredData,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudOauthMissedRequiredDataException = CloudOauthMissedRequiredDataException;
