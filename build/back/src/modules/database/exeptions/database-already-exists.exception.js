"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../constants");
const error_messages_1 = require("../../../constants/error-messages");
class DatabaseAlreadyExistsException extends common_1.HttpException {
    constructor(databaseId, message = error_messages_1.default.DATABASE_ALREADY_EXISTS, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.CONFLICT,
            error: 'DatabaseAlreadyExists',
            errorCode: constants_1.CustomErrorCodes.DatabaseAlreadyExists,
            resource: {
                databaseId,
            },
        };
        super(response, response.statusCode, options);
    }
}
exports.DatabaseAlreadyExistsException = DatabaseAlreadyExistsException;
