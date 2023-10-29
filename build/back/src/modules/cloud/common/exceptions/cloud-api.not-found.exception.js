"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudApiNotFoundException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const error_messages_1 = require("../../../../constants/error-messages");
class CloudApiNotFoundException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_API_NOT_FOUND, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.NOT_FOUND,
            error: 'CloudApiNotFound',
            errorCode: constants_1.CustomErrorCodes.CloudApiNotFound,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudApiNotFoundException = CloudApiNotFoundException;
