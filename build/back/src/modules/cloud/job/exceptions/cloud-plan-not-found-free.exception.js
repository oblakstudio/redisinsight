"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudPlanNotFoundFreeException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
class CloudPlanNotFoundFreeException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_PLAN_NOT_FOUND_FREE, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.NOT_FOUND,
            error: 'CloudPlanNotFoundFree',
            errorCode: constants_1.CustomErrorCodes.CloudPlanUnableToFindFree,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudPlanNotFoundFreeException = CloudPlanNotFoundFreeException;
