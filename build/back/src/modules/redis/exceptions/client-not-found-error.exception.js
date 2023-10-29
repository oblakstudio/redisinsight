"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientNotFoundErrorException = void 0;
const common_1 = require("@nestjs/common");
class ClientNotFoundErrorException extends common_1.HttpException {
    constructor(response = {
        message: 'Client not found or it has been disconnected.',
        name: 'ClientNotFoundError',
        statusCode: 404,
    }, status = 404) {
        super(response, status);
    }
}
exports.ClientNotFoundErrorException = ClientNotFoundErrorException;
