"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudJobUnsupportedException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
class CloudJobUnsupportedException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_JOB_UNSUPPORTED, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.NOT_IMPLEMENTED,
            error: 'CloudJobUnsupported',
            errorCode: constants_1.CustomErrorCodes.CloudJobUnsupported,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudJobUnsupportedException = CloudJobUnsupportedException;
