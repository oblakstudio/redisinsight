"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidSshPrivateKeyBodyException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../constants/error-messages");
class InvalidSshPrivateKeyBodyException extends common_1.HttpException {
    constructor(message = error_messages_1.default.INVALID_SSH_PRIVATE_KEY_BODY) {
        const response = {
            message,
            statusCode: 400,
            error: 'Invalid SSH Private Key Body',
        };
        super(response, 400);
    }
}
exports.InvalidSshPrivateKeyBodyException = InvalidSshPrivateKeyBodyException;
