"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../../utils/config");
const window_auth_module_1 = require("./window-auth/window-auth.module");
const server_1 = require("../server/models/server");
const SERVER_CONFIG = config_1.default.get('server');
let AuthModule = AuthModule_1 = class AuthModule {
    static register() {
        const imports = [];
        if (SERVER_CONFIG.buildType === server_1.BuildType.Electron) {
            imports.push(window_auth_module_1.WindowAuthModule);
        }
        return {
            module: AuthModule_1,
            imports,
        };
    }
};
AuthModule = AuthModule_1 = __decorate([
    (0, common_1.Module)({})
], AuthModule);
exports.AuthModule = AuthModule;
