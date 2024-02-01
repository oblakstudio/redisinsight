"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyUnavailableException = void 0;
const encryption_service_error_exception_1 = require("./encryption-service-error.exception");
class KeyUnavailableException extends encryption_service_error_exception_1.EncryptionServiceErrorException {
    constructor(message = 'Encryption key unavailable') {
        super({
            message,
            name: 'KeyUnavailable',
            statusCode: 503,
        }, 503);
    }
}
exports.KeyUnavailableException = KeyUnavailableException;
