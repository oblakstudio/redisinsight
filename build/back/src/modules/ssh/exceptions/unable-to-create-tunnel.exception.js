"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnableToCreateTunnelException = void 0;
const common_1 = require("@nestjs/common");
class UnableToCreateTunnelException extends common_1.HttpException {
    constructor(message = '') {
        const prepend = 'Unable to create tunnel.';
        let msg = message;
        if (message.includes('Cannot parse privateKey')) {
            msg = 'Cannot parse privateKey';
        }
        super({
            message: `${prepend} ${msg}`,
            name: 'UnableToCreateTunnelException',
            statusCode: 500,
        }, 500);
    }
}
exports.UnableToCreateTunnelException = UnableToCreateTunnelException;
