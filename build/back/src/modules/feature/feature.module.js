"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FeatureModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureModule = void 0;
const common_1 = require("@nestjs/common");
const feature_controller_1 = require("./feature.controller");
const feature_service_1 = require("./feature.service");
const notification_module_1 = require("../notification/notification.module");
const features_config_repository_1 = require("./repositories/features-config.repository");
const local_features_config_repository_1 = require("./repositories/local.features-config.repository");
const features_config_service_1 = require("./features-config.service");
const feature_repository_1 = require("./repositories/feature.repository");
const local_feature_repository_1 = require("./repositories/local.feature.repository");
const feature_flag_provider_1 = require("./providers/feature-flag/feature-flag.provider");
const feature_gateway_1 = require("./feature.gateway");
const feature_analytics_1 = require("./feature.analytics");
let FeatureModule = FeatureModule_1 = class FeatureModule {
    static register(featureRepository = local_feature_repository_1.LocalFeatureRepository, featuresConfigRepository = local_features_config_repository_1.LocalFeaturesConfigRepository) {
        return {
            module: FeatureModule_1,
            controllers: [feature_controller_1.FeatureController],
            providers: [
                feature_service_1.FeatureService,
                features_config_service_1.FeaturesConfigService,
                feature_flag_provider_1.FeatureFlagProvider,
                feature_gateway_1.FeatureGateway,
                feature_analytics_1.FeatureAnalytics,
                {
                    provide: feature_repository_1.FeatureRepository,
                    useClass: featureRepository,
                },
                {
                    provide: features_config_repository_1.FeaturesConfigRepository,
                    useClass: featuresConfigRepository,
                },
            ],
            exports: [
                feature_service_1.FeatureService,
                features_config_service_1.FeaturesConfigService,
            ],
            imports: [
                notification_module_1.NotificationModule,
            ],
        };
    }
};
FeatureModule = FeatureModule_1 = __decorate([
    (0, common_1.Module)({})
], FeatureModule);
exports.FeatureModule = FeatureModule;
