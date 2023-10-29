"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudDatabaseInUnexpectedStateException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
class CloudDatabaseInUnexpectedStateException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_DATABASE_IN_UNEXPECTED_STATE, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.NOT_IMPLEMENTED,
            error: 'CloudDatabaseInUnexpectedState',
            errorCode: constants_1.CustomErrorCodes.CloudDatabaseIsInUnexpectedState,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudDatabaseInUnexpectedStateException = CloudDatabaseInUnexpectedStateException;
