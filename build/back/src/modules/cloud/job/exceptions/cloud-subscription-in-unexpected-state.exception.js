"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudSubscriptionInUnexpectedStateException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
class CloudSubscriptionInUnexpectedStateException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_SUBSCRIPTION_IN_UNEXPECTED_STATE, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'CloudSubscriptionInUnexpectedState',
            errorCode: constants_1.CustomErrorCodes.CloudSubscriptionIsInUnexpectedState,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudSubscriptionInUnexpectedStateException = CloudSubscriptionInUnexpectedStateException;
