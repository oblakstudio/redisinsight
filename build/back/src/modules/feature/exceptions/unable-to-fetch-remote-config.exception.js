"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnableToFetchRemoteConfigException = void 0;
const common_1 = require("@nestjs/common");
class UnableToFetchRemoteConfigException extends common_1.HttpException {
    constructor(response = {
        message: 'Unable to fetch remote config',
        name: 'UnableToFetchRemoteConfigException',
        statusCode: 500,
    }, status = 500) {
        super(response, status);
    }
}
exports.UnableToFetchRemoteConfigException = UnableToFetchRemoteConfigException;
