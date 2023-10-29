"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapHttpError = void 0;
const common_1 = require("@nestjs/common");
const wrapHttpError = (error, message) => {
    if (error instanceof common_1.HttpException) {
        return error;
    }
    return new common_1.InternalServerErrorException(error.message || message);
};
exports.wrapHttpError = wrapHttpError;
