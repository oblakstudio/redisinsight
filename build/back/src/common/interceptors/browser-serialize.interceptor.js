"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserSerializeInterceptor = void 0;
const operators_1 = require("rxjs/operators");
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
class BrowserSerializeInterceptor extends common_1.ClassSerializerInterceptor {
    intercept(context, next) {
        var _a, _b;
        const req = context.switchToHttp().getRequest();
        const encoding = ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.encoding) || constants_1.RedisStringResponseEncoding.UTF8;
        const contextOptions = this.getContextOptions(context);
        const options = {
            ...this.defaultOptions,
            ...contextOptions,
        };
        if ((_b = options === null || options === void 0 ? void 0 : options.groups) === null || _b === void 0 ? void 0 : _b.length) {
            options.groups.push(encoding);
        }
        else {
            options.groups = [encoding];
        }
        return next
            .handle()
            .pipe((0, operators_1.map)((res) => this.serialize(res, options)));
    }
}
exports.BrowserSerializeInterceptor = BrowserSerializeInterceptor;
