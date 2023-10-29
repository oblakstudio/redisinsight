"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudJobAbortedException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
class CloudJobAbortedException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_JOB_ABORTED, options) {
        const response = {
            message,
            statusCode: 499,
            error: 'CloudJobAborted',
            errorCode: constants_1.CustomErrorCodes.CloudJobAborted,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudJobAbortedException = CloudJobAbortedException;
