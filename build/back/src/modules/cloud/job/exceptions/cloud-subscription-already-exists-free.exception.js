"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudSubscriptionAlreadyExistsFreeException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
class CloudSubscriptionAlreadyExistsFreeException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_SUBSCRIPTION_ALREADY_EXISTS_FREE, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.CONFLICT,
            error: 'CloudSubscriptionAlreadyExistsFree',
            errorCode: constants_1.CustomErrorCodes.CloudSubscriptionAlreadyExistsFree,
            resource: {
                subscriptionId: options === null || options === void 0 ? void 0 : options.subscriptionId,
            },
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudSubscriptionAlreadyExistsFreeException = CloudSubscriptionAlreadyExistsFreeException;
