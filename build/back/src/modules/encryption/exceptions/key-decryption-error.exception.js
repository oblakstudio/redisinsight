"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyDecryptionErrorException = void 0;
const encryption_service_error_exception_1 = require("./encryption-service-error.exception");
class KeyDecryptionErrorException extends encryption_service_error_exception_1.EncryptionServiceErrorException {
    constructor(message = 'Unable to decrypt data') {
        super({
            message,
            name: 'KeyDecryptionError',
            statusCode: 500,
        }, 500);
    }
}
exports.KeyDecryptionErrorException = KeyDecryptionErrorException;
