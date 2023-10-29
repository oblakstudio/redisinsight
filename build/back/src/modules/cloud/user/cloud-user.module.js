"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudUserModule = void 0;
const common_1 = require("@nestjs/common");
const cloud_session_module_1 = require("../session/cloud-session.module");
const cloud_user_repository_1 = require("./repositories/cloud-user.repository");
const in_session_cloud_user_repository_1 = require("./repositories/in-session.cloud-user.repository");
const cloud_user_controller_1 = require("./cloud-user.controller");
const cloud_user_capi_service_1 = require("./cloud-user.capi.service");
const cloud_user_capi_provider_1 = require("./providers/cloud-user.capi.provider");
const cloud_user_api_provider_1 = require("./providers/cloud-user.api.provider");
const cloud_user_api_service_1 = require("./cloud-user.api.service");
let CloudUserModule = class CloudUserModule {
};
CloudUserModule = __decorate([
    (0, common_1.Module)({
        imports: [cloud_session_module_1.CloudSessionModule],
        providers: [
            cloud_user_api_provider_1.CloudUserApiProvider,
            cloud_user_capi_provider_1.CloudUserCapiProvider,
            cloud_user_api_service_1.CloudUserApiService,
            cloud_user_capi_service_1.CloudUserCapiService,
            {
                provide: cloud_user_repository_1.CloudUserRepository,
                useClass: in_session_cloud_user_repository_1.InSessionCloudUserRepository,
            },
        ],
        controllers: [cloud_user_controller_1.CloudUserController],
        exports: [
            cloud_user_capi_service_1.CloudUserCapiService,
            cloud_user_api_service_1.CloudUserApiService,
        ],
    })
], CloudUserModule);
exports.CloudUserModule = CloudUserModule;
