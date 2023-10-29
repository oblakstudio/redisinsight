"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudJobUnexpectedErrorException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
class CloudJobUnexpectedErrorException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_JOB_UNEXPECTED_ERROR, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'CloudJobUnexpectedError',
            errorCode: constants_1.CustomErrorCodes.CloudJobUnexpectedError,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudJobUnexpectedErrorException = CloudJobUnexpectedErrorException;
