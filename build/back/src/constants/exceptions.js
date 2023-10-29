"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerInfoNotFoundException = exports.AgreementIsNotDefinedException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("./error-messages");
class AgreementIsNotDefinedException extends common_1.HttpException {
    constructor(message) {
        super({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message,
            error: 'Bad Request',
        }, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.AgreementIsNotDefinedException = AgreementIsNotDefinedException;
class ServerInfoNotFoundException extends common_1.HttpException {
    constructor(message = error_messages_1.default.SERVER_INFO_NOT_FOUND()) {
        super({
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            message,
            error: 'Internal Server Error',
        }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.ServerInfoNotFoundException = ServerInfoNotFoundException;
