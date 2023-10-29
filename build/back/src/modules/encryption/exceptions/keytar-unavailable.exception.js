"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeytarUnavailableException = void 0;
const encryption_service_error_exception_1 = require("./encryption-service-error.exception");
class KeytarUnavailableException extends encryption_service_error_exception_1.EncryptionServiceErrorException {
    constructor(message = 'Keytar unavailable') {
        super({
            message,
            name: 'KeytarUnavailable',
            statusCode: 503,
        }, 503);
    }
}
exports.KeytarUnavailableException = KeytarUnavailableException;
