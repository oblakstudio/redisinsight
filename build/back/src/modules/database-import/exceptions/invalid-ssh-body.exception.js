"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidSshBodyException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../constants/error-messages");
class InvalidSshBodyException extends common_1.HttpException {
    constructor(message = error_messages_1.default.INVALID_SSH_BODY) {
        const response = {
            message,
            statusCode: 400,
            error: 'Invalid SSH body',
        };
        super(response, 400);
    }
}
exports.InvalidSshBodyException = InvalidSshBodyException;
