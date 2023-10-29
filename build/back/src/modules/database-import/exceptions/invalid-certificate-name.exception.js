"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCertificateNameException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../constants/error-messages");
class InvalidCertificateNameException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CERTIFICATE_NAME_IS_NOT_DEFINED) {
        const response = {
            message,
            statusCode: 400,
            error: 'Invalid Certificate Name',
        };
        super(response, 400);
    }
}
exports.InvalidCertificateNameException = InvalidCertificateNameException;
