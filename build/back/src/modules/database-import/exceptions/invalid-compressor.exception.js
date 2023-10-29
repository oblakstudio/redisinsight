"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCompressorException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../constants/error-messages");
class InvalidCompressorException extends common_1.HttpException {
    constructor(message = error_messages_1.default.INVALID_COMPRESSOR) {
        const response = {
            message,
            statusCode: 400,
            error: 'Invalid compressor',
        };
        super(response, 400);
    }
}
exports.InvalidCompressorException = InvalidCompressorException;
