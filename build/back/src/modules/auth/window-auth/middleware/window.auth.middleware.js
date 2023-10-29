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
var WindowAuthMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../common/constants");
const window_auth_service_1 = require("../window-auth.service");
const exceptions_1 = require("../constants/exceptions");
let WindowAuthMiddleware = WindowAuthMiddleware_1 = class WindowAuthMiddleware {
    constructor(windowAuthService) {
        this.windowAuthService = windowAuthService;
        this.logger = new common_1.Logger('WindowAuthMiddleware');
    }
    async use(req, res, next) {
        const { windowId } = WindowAuthMiddleware_1.getWindowIdFromReq(req);
        const isAuthorized = await this.windowAuthService.isAuthorized(windowId);
        if (!isAuthorized) {
            this.throwError(req, error_messages_1.default.UNDEFINED_WINDOW_ID);
        }
        next();
    }
    static getWindowIdFromReq(req) {
        var _a;
        return { windowId: `${(_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a[constants_1.API_HEADER_WINDOW_ID]}` };
    }
    throwError(req, message) {
        const { method, url } = req;
        this.logger.error(`${message} ${method} ${url}`);
        throw new exceptions_1.WindowUnauthorizedException(message);
    }
};
WindowAuthMiddleware = WindowAuthMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [window_auth_service_1.WindowAuthService])
], WindowAuthMiddleware);
exports.WindowAuthMiddleware = WindowAuthMiddleware;
