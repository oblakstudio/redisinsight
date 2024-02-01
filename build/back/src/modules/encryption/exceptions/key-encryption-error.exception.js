"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyEncryptionErrorException = void 0;
const encryption_service_error_exception_1 = require("./encryption-service-error.exception");
class KeyEncryptionErrorException extends encryption_service_error_exception_1.EncryptionServiceErrorException {
    constructor(message = 'Unable to encrypt data') {
        super({
            message,
            name: 'KeyEncryptionError',
            statusCode: 500,
        }, 500);
    }
}
exports.KeyEncryptionErrorException = KeyEncryptionErrorException;
