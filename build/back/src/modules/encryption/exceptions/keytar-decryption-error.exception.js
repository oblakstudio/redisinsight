"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeytarDecryptionErrorException = void 0;
const encryption_service_error_exception_1 = require("./encryption-service-error.exception");
class KeytarDecryptionErrorException extends encryption_service_error_exception_1.EncryptionServiceErrorException {
    constructor(message = 'Unable to decrypt data with Keytar') {
        super({
            message,
            name: 'KeytarDecryptionError',
            statusCode: 500,
        }, 500);
    }
}
exports.KeytarDecryptionErrorException = KeytarDecryptionErrorException;
