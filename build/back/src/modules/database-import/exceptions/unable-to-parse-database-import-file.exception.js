"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnableToParseDatabaseImportFileException = void 0;
const common_1 = require("@nestjs/common");
class UnableToParseDatabaseImportFileException extends common_1.HttpException {
    constructor(message = 'Unable to parse import file') {
        const response = {
            message,
            statusCode: 400,
            error: 'Unable To Parse Database Import File',
        };
        super(response, 400);
    }
}
exports.UnableToParseDatabaseImportFileException = UnableToParseDatabaseImportFileException;
