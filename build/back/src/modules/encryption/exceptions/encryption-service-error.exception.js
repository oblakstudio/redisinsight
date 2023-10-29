"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionServiceErrorException = void 0;
const common_1 = require("@nestjs/common");
class EncryptionServiceErrorException extends common_1.HttpException {
    constructor(response = {
        message: 'Encryption service error',
        name: 'EncryptionServiceError',
        statusCode: 500,
    }, status = 500) {
        super(response, status);
    }
}
exports.EncryptionServiceErrorException = EncryptionServiceErrorException;
