"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudSubscriptionInFailedStateException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
class CloudSubscriptionInFailedStateException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_SUBSCRIPTION_IN_FAILED_STATE, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'CloudSubscriptionInFailedState',
            errorCode: constants_1.CustomErrorCodes.CloudSubscriptionIsInTheFailedState,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudSubscriptionInFailedStateException = CloudSubscriptionInFailedStateException;
