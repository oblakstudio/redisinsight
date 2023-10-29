"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TunnelConnectionLostException = void 0;
const common_1 = require("@nestjs/common");
class TunnelConnectionLostException extends common_1.HttpException {
    constructor(message = '') {
        const prepend = 'Tunnel connection was lost.';
        super({
            message: `${prepend} ${message}`,
            name: 'TunnelConnectionLostException',
            statusCode: 500,
        }, 500);
    }
}
exports.TunnelConnectionLostException = TunnelConnectionLostException;
