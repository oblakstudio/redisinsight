"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudApiInternalServerErrorException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const error_messages_1 = require("../../../../constants/error-messages");
class CloudApiInternalServerErrorException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_API_INTERNAL_SERVER_ERROR, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'CloudApiInternalServerError',
            errorCode: constants_1.CustomErrorCodes.CloudApiInternalServerError,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudApiInternalServerErrorException = CloudApiInternalServerErrorException;
