"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnableToCreateLocalServerException = void 0;
const common_1 = require("@nestjs/common");
class UnableToCreateLocalServerException extends common_1.HttpException {
    constructor(message = '') {
        const prepend = 'Unable to create local server.';
        super({
            message: `${prepend} ${message}`,
            name: 'UnableToCreateLocalServerException',
            statusCode: 500,
        }, 500);
    }
}
exports.UnableToCreateLocalServerException = UnableToCreateLocalServerException;
