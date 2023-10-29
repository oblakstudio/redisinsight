"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowUnauthorizedException = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
class WindowUnauthorizedException extends common_1.HttpException {
    constructor(message) {
        super({
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
            errorCode: constants_1.CustomErrorCodes.WindowUnauthorized,
            message,
            error: 'Window Unauthorized',
        }, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.WindowUnauthorizedException = WindowUnauthorizedException;
