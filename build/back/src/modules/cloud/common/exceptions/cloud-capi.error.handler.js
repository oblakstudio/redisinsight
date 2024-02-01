"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapCloudCapiError = void 0;
const common_1 = require("@nestjs/common");
const cloud_api_error_handler_1 = require("./cloud-api.error.handler");
const cloud_capi_unauthorized_exception_1 = require("./cloud-capi.unauthorized.exception");
const wrapCloudCapiError = (error, message) => {
    var _a, _b;
    if (error instanceof common_1.HttpException) {
        return error;
    }
    if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
        return new cloud_capi_unauthorized_exception_1.CloudCapiUnauthorizedException(message, { cause: new Error((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) });
    }
    return (0, cloud_api_error_handler_1.wrapCloudApiError)(error, message);
};
exports.wrapCloudCapiError = wrapCloudCapiError;
