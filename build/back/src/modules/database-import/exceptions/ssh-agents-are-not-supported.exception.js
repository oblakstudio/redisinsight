"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SshAgentsAreNotSupportedException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../constants/error-messages");
class SshAgentsAreNotSupportedException extends common_1.HttpException {
    constructor(message = error_messages_1.default.SSH_AGENTS_ARE_NOT_SUPPORTED) {
        const response = {
            message,
            statusCode: 400,
            error: 'Ssh Agents Are Not Supported',
        };
        super(response, 400);
    }
}
exports.SshAgentsAreNotSupportedException = SshAgentsAreNotSupportedException;
