"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudTaskProcessingErrorException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
class CloudTaskProcessingErrorException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_TASK_PROCESSING_ERROR, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'CloudTaskProcessingError',
            errorCode: constants_1.CustomErrorCodes.CloudTaskProcessingError,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudTaskProcessingErrorException = CloudTaskProcessingErrorException;
