"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapCloudApiError = void 0;
const common_1 = require("@nestjs/common");
const cloud_api_unauthorized_exception_1 = require("./cloud-api.unauthorized.exception");
const cloud_api_forbidden_exception_1 = require("./cloud-api.forbidden.exception");
const cloud_api_bad_request_exception_1 = require("./cloud-api.bad-request.exception");
const cloud_api_not_found_exception_1 = require("./cloud-api.not-found.exception");
const cloud_api_internal_server_error_exception_1 = require("./cloud-api.internal-server-error.exception");
const wrapCloudApiError = (error, message) => {
    if (error instanceof common_1.HttpException) {
        return error;
    }
    const { response } = error;
    if (response) {
        const errorOptions = { cause: new Error(response === null || response === void 0 ? void 0 : response.data) };
        switch (response === null || response === void 0 ? void 0 : response.status) {
            case 401:
                return new cloud_api_unauthorized_exception_1.CloudApiUnauthorizedException(message, errorOptions);
            case 403:
                return new cloud_api_forbidden_exception_1.CloudApiForbiddenException(message, errorOptions);
            case 400:
                return new cloud_api_bad_request_exception_1.CloudApiBadRequestException(message, errorOptions);
            case 404:
                return new cloud_api_not_found_exception_1.CloudApiNotFoundException(message, errorOptions);
            default:
                return new cloud_api_internal_server_error_exception_1.CloudApiInternalServerErrorException(message, errorOptions);
        }
    }
    return new cloud_api_internal_server_error_exception_1.CloudApiInternalServerErrorException(message);
};
exports.wrapCloudApiError = wrapCloudApiError;
