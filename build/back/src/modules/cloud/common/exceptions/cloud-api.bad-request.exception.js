"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudApiBadRequestException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const error_messages_1 = require("../../../../constants/error-messages");
class CloudApiBadRequestException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_API_BAD_REQUEST, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            error: 'CloudApiBadRequest',
            errorCode: constants_1.CustomErrorCodes.CloudApiBadRequest,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudApiBadRequestException = CloudApiBadRequestException;
