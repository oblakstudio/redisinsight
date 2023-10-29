"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeLimitExceededDatabaseImportFileException = void 0;
const common_1 = require("@nestjs/common");
class SizeLimitExceededDatabaseImportFileException extends common_1.HttpException {
    constructor(message = 'Invalid import file') {
        const response = {
            message,
            statusCode: 400,
            error: 'Invalid Database Import File',
        };
        super(response, 400);
    }
}
exports.SizeLimitExceededDatabaseImportFileException = SizeLimitExceededDatabaseImportFileException;
