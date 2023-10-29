"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedEncryptionStrategyException = void 0;
const encryption_service_error_exception_1 = require("./encryption-service-error.exception");
class UnsupportedEncryptionStrategyException extends encryption_service_error_exception_1.EncryptionServiceErrorException {
    constructor(message = 'Unsupported encryption strategy') {
        super({
            message,
            name: 'UnsupportedEncryptionStrategy',
            statusCode: 500,
        }, 500);
    }
}
exports.UnsupportedEncryptionStrategyException = UnsupportedEncryptionStrategyException;
