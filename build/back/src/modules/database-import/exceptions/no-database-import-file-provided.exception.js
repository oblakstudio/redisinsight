"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoDatabaseImportFileProvidedException = void 0;
const common_1 = require("@nestjs/common");
class NoDatabaseImportFileProvidedException extends common_1.HttpException {
    constructor(message = 'No import file provided') {
        const response = {
            message,
            statusCode: 400,
            error: 'No Database Import File Provided',
        };
        super(response, 400);
    }
}
exports.NoDatabaseImportFileProvidedException = NoDatabaseImportFileProvidedException;
