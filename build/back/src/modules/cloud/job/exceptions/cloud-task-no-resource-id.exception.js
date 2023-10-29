"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudTaskNoResourceIdException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
class CloudTaskNoResourceIdException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_TASK_NO_RESOURCE_ID, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            error: 'CloudTaskNoResourceId',
            errorCode: constants_1.CustomErrorCodes.CloudTaskNoResourceId,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudTaskNoResourceIdException = CloudTaskNoResourceIdException;
