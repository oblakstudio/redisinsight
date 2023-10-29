"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowAuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../../../utils/config");
const window_auth_service_1 = require("./window-auth.service");
const window_auth_middleware_1 = require("./middleware/window.auth.middleware");
const SERVER_CONFIG = config_1.default.get('server');
let WindowAuthModule = class WindowAuthModule {
    configure(consumer) {
        consumer
            .apply(window_auth_middleware_1.WindowAuthMiddleware)
            .exclude(...SERVER_CONFIG.excludeAuthRoutes)
            .forRoutes('*');
    }
};
WindowAuthModule = __decorate([
    (0, common_1.Module)({
        providers: [window_auth_service_1.WindowAuthService],
    })
], WindowAuthModule);
exports.WindowAuthModule = WindowAuthModule;
