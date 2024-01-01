"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudDatabaseAlreadyExistsFreeException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
class CloudDatabaseAlreadyExistsFreeException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_DATABASE_ALREADY_EXISTS_FREE, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.CONFLICT,
            error: 'CloudDatabaseAlreadyExistsFree',
            errorCode: constants_1.CustomErrorCodes.CloudDatabaseAlreadyExistsFree,
            resource: {
                subscriptionId: options === null || options === void 0 ? void 0 : options.subscriptionId,
                databaseId: options === null || options === void 0 ? void 0 : options.databaseId,
                region: options === null || options === void 0 ? void 0 : options.region,
                provider: options === null || options === void 0 ? void 0 : options.provider,
            },
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudDatabaseAlreadyExistsFreeException = CloudDatabaseAlreadyExistsFreeException;
