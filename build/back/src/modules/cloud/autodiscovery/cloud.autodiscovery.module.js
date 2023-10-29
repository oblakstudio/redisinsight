"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudAutodiscoveryModule = void 0;
const common_1 = require("@nestjs/common");
const cloud_autodiscovery_controller_1 = require("./cloud.autodiscovery.controller");
const cloud_autodiscovery_service_1 = require("./cloud-autodiscovery.service");
const cloud_autodiscovery_analytics_1 = require("./cloud-autodiscovery.analytics");
const cloud_database_module_1 = require("../database/cloud-database.module");
const cloud_subscription_module_1 = require("../subscription/cloud-subscription.module");
const cloud_user_module_1 = require("../user/cloud-user.module");
const me_cloud_autodiscovery_controller_1 = require("./me.cloud.autodiscovery.controller");
const me_cloud_autodiscovery_service_1 = require("./me.cloud-autodiscovery.service");
const cloud_capi_key_module_1 = require("../capi-key/cloud-capi-key.module");
let CloudAutodiscoveryModule = class CloudAutodiscoveryModule {
};
CloudAutodiscoveryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cloud_database_module_1.CloudDatabaseModule,
            cloud_subscription_module_1.CloudSubscriptionModule,
            cloud_user_module_1.CloudUserModule,
            cloud_capi_key_module_1.CloudCapiKeyModule,
        ],
        controllers: [
            cloud_autodiscovery_controller_1.CloudAutodiscoveryController,
            me_cloud_autodiscovery_controller_1.MeCloudAutodiscoveryController,
        ],
        providers: [
            cloud_autodiscovery_service_1.CloudAutodiscoveryService,
            me_cloud_autodiscovery_service_1.MeCloudAutodiscoveryService,
            cloud_autodiscovery_analytics_1.CloudAutodiscoveryAnalytics,
        ],
    })
], CloudAutodiscoveryModule);
exports.CloudAutodiscoveryModule = CloudAutodiscoveryModule;
