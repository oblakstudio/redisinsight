"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudJobNotFoundException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
class CloudJobNotFoundException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_JOB_NOT_FOUND, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.NOT_FOUND,
            error: 'CloudJobNotFound',
            errorCode: constants_1.CustomErrorCodes.CloudJobNotFound,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudJobNotFoundException = CloudJobNotFoundException;
