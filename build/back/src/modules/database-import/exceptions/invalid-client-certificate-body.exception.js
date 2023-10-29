"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidClientCertificateBodyException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../constants/error-messages");
class InvalidClientCertificateBodyException extends common_1.HttpException {
    constructor(message = error_messages_1.default.INVALID_CERTIFICATE_BODY) {
        const response = {
            message,
            statusCode: 400,
            error: 'Invalid Client Certificate Body',
        };
        super(response, 400);
    }
}
exports.InvalidClientCertificateBodyException = InvalidClientCertificateBodyException;
