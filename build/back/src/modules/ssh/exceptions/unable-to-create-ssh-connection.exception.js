"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnableToCreateSshConnectionException = void 0;
const common_1 = require("@nestjs/common");
class UnableToCreateSshConnectionException extends common_1.HttpException {
    constructor(message = '') {
        const prepend = 'Unable to create ssh connection.';
        super({
            message: `${prepend} ${message}`,
            name: 'UnableToCreateSshConnectionException',
            statusCode: 503,
        }, 503);
    }
}
exports.UnableToCreateSshConnectionException = UnableToCreateSshConnectionException;
