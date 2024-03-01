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
exports.FeatureFlagProvider = void 0;
const common_1 = require("@nestjs/common");
const common_flag_strategy_1 = require("./strategies/common.flag.strategy");
const default_flag_strategy_1 = require("./strategies/default.flag.strategy");
const features_config_service_1 = require("../../features-config.service");
const settings_service_1 = require("../../../settings/settings.service");
const constants_1 = require("../../constants");
const cloud_sso_flag_strategy_1 = require("./strategies/cloud-sso.flag.strategy");
const with_data_flag_strategy_1 = require("./strategies/with-data.flag.strategy");
let FeatureFlagProvider = class FeatureFlagProvider {
    constructor(featuresConfigService, settingsService) {
        this.featuresConfigService = featuresConfigService;
        this.settingsService = settingsService;
        this.strategies = new Map();
        this.strategies.set('default', new default_flag_strategy_1.DefaultFlagStrategy(this.featuresConfigService, this.settingsService));
        this.strategies.set(constants_1.KnownFeatures.InsightsRecommendations, new common_flag_strategy_1.CommonFlagStrategy(this.featuresConfigService, this.settingsService));
        this.strategies.set(constants_1.KnownFeatures.CloudSso, new cloud_sso_flag_strategy_1.CloudSsoFlagStrategy(this.featuresConfigService, this.settingsService));
        this.strategies.set(constants_1.KnownFeatures.CloudSsoRecommendedSettings, new common_flag_strategy_1.CommonFlagStrategy(this.featuresConfigService, this.settingsService));
        this.strategies.set(constants_1.KnownFeatures.RedisModuleFilter, new with_data_flag_strategy_1.WithDataFlagStrategy(this.featuresConfigService, this.settingsService));
        this.strategies.set(constants_1.KnownFeatures.RedisClient, new with_data_flag_strategy_1.WithDataFlagStrategy(this.featuresConfigService, this.settingsService));
    }
    getStrategy(name) {
        return this.strategies.get(name) || this.getStrategy('default');
    }
    calculate(knownFeature, featureConditions) {
        const strategy = this.getStrategy(knownFeature.name);
        return strategy.calculate(knownFeature, featureConditions);
    }
};
FeatureFlagProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [features_config_service_1.FeaturesConfigService,
        settings_service_1.SettingsService])
], FeatureFlagProvider);
exports.FeatureFlagProvider = FeatureFlagProvider;
