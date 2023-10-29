"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const config_1 = require("../../utils/config");
const serverConfig = config_1.default.get('server');
let TimeoutInterceptor = class TimeoutInterceptor {
    constructor(message = 'Request timeout', timeoutMs) {
        this.logger = new common_1.Logger('TimeoutInterceptor');
        this.message = message;
        this.timeout = timeoutMs !== null && timeoutMs !== void 0 ? timeoutMs : serverConfig.requestTimeout;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.timeout)(this.timeout), (0, operators_1.catchError)((err) => {
            if (err instanceof rxjs_1.TimeoutError) {
                const { method, url } = context.switchToHttp().getRequest();
                this.logger.error(`Request Timeout. ${method} ${url}`);
                return (0, rxjs_1.throwError)(() => new common_1.BadGatewayException(this.message));
            }
            return (0, rxjs_1.throwError)(() => err);
        }));
    }
};
TimeoutInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String, Number])
], TimeoutInterceptor);
exports.TimeoutInterceptor = TimeoutInterceptor;
