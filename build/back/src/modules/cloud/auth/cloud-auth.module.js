"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudAuthModule = void 0;
const common_1 = require("@nestjs/common");
const cloud_session_module_1 = require("../session/cloud-session.module");
const google_idp_cloud_auth_strategy_1 = require("./auth-strategy/google-idp.cloud.auth-strategy");
const github_idp_cloud_auth_strategy_1 = require("./auth-strategy/github-idp.cloud.auth-strategy");
const cloud_auth_service_1 = require("./cloud-auth.service");
const cloud_auth_controller_1 = require("./cloud-auth.controller");
const cloud_auth_analytics_1 = require("./cloud-auth.analytics");
let CloudAuthModule = class CloudAuthModule {
};
CloudAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [cloud_session_module_1.CloudSessionModule],
        providers: [
            google_idp_cloud_auth_strategy_1.GoogleIdpCloudAuthStrategy,
            github_idp_cloud_auth_strategy_1.GithubIdpCloudAuthStrategy,
            cloud_auth_service_1.CloudAuthService,
            cloud_auth_analytics_1.CloudAuthAnalytics,
        ],
        controllers: [cloud_auth_controller_1.CloudAuthController],
    })
], CloudAuthModule);
exports.CloudAuthModule = CloudAuthModule;
