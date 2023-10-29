"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubWsException = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
class PubSubWsException extends Error {
    constructor(err) {
        super();
        this.status = 500;
        this.message = 'Internal server error';
        this.name = this.constructor.name;
        if ((0, lodash_1.isString)(err)) {
            this.message = err;
        }
        else if (err instanceof common_1.HttpException) {
            this.message = (err.getResponse())['message'];
            this.status = err.getStatus();
            this.name = err.constructor.name;
        }
        else if (err instanceof Error) {
            this.message = err.message;
            this.name = 'Error';
        }
    }
}
exports.PubSubWsException = PubSubWsException;
