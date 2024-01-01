"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudSubscriptionModule = void 0;
const common_1 = require("@nestjs/common");
const cloud_subscription_capi_service_1 = require("./cloud-subscription.capi.service");
const cloud_capi_key_module_1 = require("../capi-key/cloud-capi-key.module");
const cloud_subscription_controller_1 = require("./cloud-subscription.controller");
const cloud_user_module_1 = require("../user/cloud-user.module");
const cloud_subscription_api_service_1 = require("./cloud-subscription.api.service");
const cloud_session_module_1 = require("../session/cloud-session.module");
const cloud_subscription_api_provider_1 = require("./providers/cloud-subscription.api.provider");
const cloud_subscription_capi_provider_1 = require("./providers/cloud-subscription.capi.provider");
let CloudSubscriptionModule = class CloudSubscriptionModule {
};
CloudSubscriptionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cloud_user_module_1.CloudUserModule,
            cloud_session_module_1.CloudSessionModule,
            cloud_capi_key_module_1.CloudCapiKeyModule,
        ],
        providers: [
            cloud_subscription_api_service_1.CloudSubscriptionApiService,
            cloud_subscription_api_provider_1.CloudSubscriptionApiProvider,
            cloud_subscription_capi_provider_1.CloudSubscriptionCapiProvider,
            cloud_subscription_capi_service_1.CloudSubscriptionCapiService,
        ],
        controllers: [
            cloud_subscription_controller_1.CloudSubscriptionController,
        ],
        exports: [
            cloud_subscription_capi_service_1.CloudSubscriptionCapiService,
            cloud_subscription_api_service_1.CloudSubscriptionApiService,
        ],
    })
], CloudSubscriptionModule);
exports.CloudSubscriptionModule = CloudSubscriptionModule;
