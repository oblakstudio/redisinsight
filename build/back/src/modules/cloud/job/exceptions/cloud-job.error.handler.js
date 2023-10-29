"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapCloudJobError = void 0;
const common_1 = require("@nestjs/common");
const cloud_job_unexpected_error_exception_1 = require("./cloud-job-unexpected-error.exception");
const wrapCloudJobError = (error, message) => {
    if (error instanceof common_1.HttpException) {
        return error;
    }
    if (error instanceof Error) {
        return new cloud_job_unexpected_error_exception_1.CloudJobUnexpectedErrorException(error.message || message, { cause: error });
    }
    return new cloud_job_unexpected_error_exception_1.CloudJobUnexpectedErrorException(message);
};
exports.wrapCloudJobError = wrapCloudJobError;
