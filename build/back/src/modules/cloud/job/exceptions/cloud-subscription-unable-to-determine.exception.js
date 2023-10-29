"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudSubscriptionUnableToDetermineException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
class CloudSubscriptionUnableToDetermineException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_SUBSCRIPTION_UNABLE_TO_DETERMINE, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.NOT_FOUND,
            error: 'CloudSubscriptionUnableToDetermine',
            errorCode: constants_1.CustomErrorCodes.CloudSubscriptionUnableToDetermine,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudSubscriptionUnableToDetermineException = CloudSubscriptionUnableToDetermineException;
