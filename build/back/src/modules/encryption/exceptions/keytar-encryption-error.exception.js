"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeytarEncryptionErrorException = void 0;
const encryption_service_error_exception_1 = require("./encryption-service-error.exception");
class KeytarEncryptionErrorException extends encryption_service_error_exception_1.EncryptionServiceErrorException {
    constructor(message = 'Unable to encrypt data with Keytar') {
        super({
            message,
            name: 'KeytarEncryptionError',
            statusCode: 500,
        }, 500);
    }
}
exports.KeytarEncryptionErrorException = KeytarEncryptionErrorException;
