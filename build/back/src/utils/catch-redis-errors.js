"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchMultiTransactionError = exports.catchTransactionError = exports.catchAclError = exports.catchRedisConnectionError = exports.getRedisConnectionException = exports.isCertError = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const error_messages_1 = require("../constants/error-messages");
const exceptions_1 = require("../modules/encryption/exceptions");
const isCertError = (error) => {
    var _a;
    try {
        const errorCodesArray = Object.values(constants_1.CertificatesErrorCodes);
        return errorCodesArray.includes(error.code)
            || ((_a = error.code) === null || _a === void 0 ? void 0 : _a.includes(constants_1.CertificatesErrorCodes.OSSLError))
            || error.message.includes('SSL')
            || error.message.includes(constants_1.CertificatesErrorCodes.OSSLError)
            || error.message.includes(constants_1.CertificatesErrorCodes.IncorrectCertificates)
            || error.message.includes('ERR unencrypted connection is prohibited');
    }
    catch (e) {
        return false;
    }
};
exports.isCertError = isCertError;
const getRedisConnectionException = (error, connectionOptions, errorPlaceholder = '') => {
    const { host, port } = connectionOptions;
    if (error instanceof common_1.HttpException) {
        return error;
    }
    if (error === null || error === void 0 ? void 0 : error.message) {
        if (error.message.includes(constants_1.RedisErrorCodes.SentinelParamsRequired)) {
            return new common_1.HttpException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                error: constants_1.RedisErrorCodes.SentinelParamsRequired,
                message: error_messages_1.default.SENTINEL_MASTER_NAME_REQUIRED,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (error.message.includes(constants_1.RedisErrorCodes.Timeout)
            || error.message.includes('timed out')) {
            return new common_1.GatewayTimeoutException(error_messages_1.default.CONNECTION_TIMEOUT);
        }
        if (error.message.includes(constants_1.RedisErrorCodes.InvalidPassword)
            || error.message.includes(constants_1.RedisErrorCodes.AuthRequired)
            || error.message === 'ERR invalid password') {
            return new common_1.UnauthorizedException(error_messages_1.default.AUTHENTICATION_FAILED());
        }
        if (error.message === "ERR unknown command 'auth'") {
            return new common_1.MethodNotAllowedException(error_messages_1.default.COMMAND_NOT_SUPPORTED('auth'));
        }
        if (error.message.includes(constants_1.RedisErrorCodes.ConnectionRefused)
            || error.message.includes(constants_1.RedisErrorCodes.ConnectionNotFound)
            || error.message.includes(constants_1.RedisErrorCodes.DNSTimeoutError)
            || error.message.includes('Failed to refresh slots cache')
            || (error === null || error === void 0 ? void 0 : error.code) === constants_1.RedisErrorCodes.ConnectionReset) {
            return new common_1.ServiceUnavailableException(error_messages_1.default.INCORRECT_DATABASE_URL(errorPlaceholder || `${host}:${port}`));
        }
        if ((0, exports.isCertError)(error)) {
            const message = error_messages_1.default.INCORRECT_CERTIFICATES(errorPlaceholder || `${host}:${port}`);
            return new common_1.BadRequestException(message);
        }
    }
    if (error instanceof exceptions_1.EncryptionServiceErrorException) {
        return error;
    }
    if (error === null || error === void 0 ? void 0 : error.message) {
        return new common_1.BadRequestException(error.message);
    }
    return new common_1.InternalServerErrorException();
};
exports.getRedisConnectionException = getRedisConnectionException;
const catchRedisConnectionError = (error, connectionOptions, errorPlaceholder = '') => {
    throw (0, exports.getRedisConnectionException)(error, connectionOptions, errorPlaceholder);
};
exports.catchRedisConnectionError = catchRedisConnectionError;
const catchAclError = (error) => {
    var _a, _b;
    if (error instanceof exceptions_1.EncryptionServiceErrorException
        || error instanceof common_1.NotFoundException
        || error instanceof common_1.ConflictException) {
        throw error;
    }
    if ((_a = error === null || error === void 0 ? void 0 : error.message) === null || _a === void 0 ? void 0 : _a.includes(constants_1.RedisErrorCodes.NoPermission)) {
        throw new common_1.ForbiddenException(error.message);
    }
    if ((_b = error === null || error === void 0 ? void 0 : error.previousErrors) === null || _b === void 0 ? void 0 : _b.length) {
        const noPermError = error.previousErrors.find((errorItem) => { var _a; return (_a = errorItem === null || errorItem === void 0 ? void 0 : errorItem.message) === null || _a === void 0 ? void 0 : _a.includes(constants_1.RedisErrorCodes.NoPermission); });
        if (noPermError) {
            throw new common_1.ForbiddenException(noPermError.message);
        }
    }
    throw new common_1.InternalServerErrorException(error.message);
};
exports.catchAclError = catchAclError;
const catchTransactionError = (transactionError, transactionResults) => {
    if (transactionError) {
        throw transactionError;
    }
    const previousErrors = transactionResults
        .map((item) => item[0])
        .filter((item) => !!item);
    if (previousErrors.length) {
        throw previousErrors[0];
    }
};
exports.catchTransactionError = catchTransactionError;
const catchMultiTransactionError = (transactionResults) => {
    transactionResults.forEach(([err]) => {
        if (err)
            throw err;
    });
};
exports.catchMultiTransactionError = catchMultiTransactionError;
