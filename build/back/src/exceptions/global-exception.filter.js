"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
class GlobalExceptionFilter extends core_1.BaseExceptionFilter {
    constructor() {
        super(...arguments);
        this.staticServerLogger = new common_1.Logger('StaticServerLogger');
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        if (/^\/(?:plugins|static)\//i.test(request.url)) {
            const response = ctx.getResponse();
            const statusCode = exception['statusCode'] || 500;
            const message = `Error when trying to fetch ${request.url}`;
            this.staticServerLogger.error(message, { ...exception });
            return response.status(statusCode)
                .json({
                statusCode,
                message,
            });
        }
        return super.catch(exception, host);
    }
}
exports.GlobalExceptionFilter = GlobalExceptionFilter;
