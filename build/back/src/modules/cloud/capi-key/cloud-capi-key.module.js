"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudCapiKeyModule = void 0;
const common_1 = require("@nestjs/common");
const cloud_capi_key_controller_1 = require("./cloud-capi-key.controller");
const cloud_capi_key_service_1 = require("./cloud-capi-key.service");
const local_cloud_capi_key_repository_1 = require("./repository/local.cloud-capi-key.repository");
const cloud_capi_key_repository_1 = require("./repository/cloud-capi-key.repository");
const cloud_capi_key_api_provider_1 = require("./cloud-capi-key.api.provider");
const cloud_user_module_1 = require("../user/cloud-user.module");
const cloud_session_module_1 = require("../session/cloud-session.module");
const cloud_capi_key_analytics_1 = require("./cloud-capi-key.analytics");
let CloudCapiKeyModule = class CloudCapiKeyModule {
};
CloudCapiKeyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cloud_user_module_1.CloudUserModule,
            cloud_session_module_1.CloudSessionModule,
        ],
        controllers: [cloud_capi_key_controller_1.CloudCapiKeyController],
        providers: [
            cloud_capi_key_api_provider_1.CloudCapiKeyApiProvider,
            cloud_capi_key_service_1.CloudCapiKeyService,
            cloud_capi_key_analytics_1.CloudCapiKeyAnalytics,
            {
                provide: cloud_capi_key_repository_1.CloudCapiKeyRepository,
                useClass: local_cloud_capi_key_repository_1.LocalCloudCapiKeyRepository,
            },
        ],
        exports: [cloud_capi_key_service_1.CloudCapiKeyService],
    })
], CloudCapiKeyModule);
exports.CloudCapiKeyModule = CloudCapiKeyModule;
