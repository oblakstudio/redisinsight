"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCaCertificateBodyException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../constants/error-messages");
class InvalidCaCertificateBodyException extends common_1.HttpException {
    constructor(message = error_messages_1.default.INVALID_CA_BODY) {
        const response = {
            message,
            statusCode: 400,
            error: 'Invalid Ca Certificate Body',
        };
        super(response, 400);
    }
}
exports.InvalidCaCertificateBodyException = InvalidCaCertificateBodyException;
