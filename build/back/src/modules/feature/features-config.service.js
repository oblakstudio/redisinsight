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
exports.FeaturesConfigService = void 0;
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const config_1 = require("../../utils/config");
const features_config_repository_1 = require("./repositories/features-config.repository");
const constants_1 = require("./constants");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const features_config_1 = require("./model/features-config");
const feature_analytics_1 = require("./feature.analytics");
const exceptions_1 = require("./exceptions");
const defaultConfig = require("../../../config/features-config.json");
const FEATURES_CONFIG = config_1.default.get('features_config');
let FeaturesConfigService = class FeaturesConfigService {
    constructor(repository, eventEmitter, analytics) {
        this.repository = repository;
        this.eventEmitter = eventEmitter;
        this.analytics = analytics;
        this.logger = new common_1.Logger('FeaturesConfigService');
        this.validator = new class_validator_1.Validator();
    }
    async onApplicationBootstrap() {
        this.sync().catch();
        if (FEATURES_CONFIG.syncInterval > 0) {
            setInterval(this.sync.bind(this), FEATURES_CONFIG.syncInterval);
        }
    }
    async fetchRemoteConfig() {
        try {
            this.logger.log('Fetching remote config...');
            const { data } = await axios_1.default.get(FEATURES_CONFIG.url);
            return data;
        }
        catch (error) {
            this.logger.error('Unable to fetch remote config', error);
            throw new exceptions_1.UnableToFetchRemoteConfigException();
        }
    }
    async getNewConfig() {
        let remoteConfig;
        let newConfig = {
            data: defaultConfig,
            type: constants_1.FeatureConfigConfigDestination.Default,
        };
        try {
            this.logger.log('Fetching remote config...');
            remoteConfig = await this.fetchRemoteConfig();
            await this.validator.validateOrReject((0, class_transformer_1.plainToClass)(features_config_1.FeaturesConfigData, remoteConfig));
            if ((remoteConfig === null || remoteConfig === void 0 ? void 0 : remoteConfig.version) > (defaultConfig === null || defaultConfig === void 0 ? void 0 : defaultConfig.version)) {
                newConfig = {
                    data: remoteConfig,
                    type: constants_1.FeatureConfigConfigDestination.Remote,
                };
            }
        }
        catch (error) {
            this.analytics.sendFeatureFlagInvalidRemoteConfig({
                configVersion: remoteConfig === null || remoteConfig === void 0 ? void 0 : remoteConfig.version,
                error,
            });
            this.logger.error('Something wrong with remote config', error);
        }
        return newConfig;
    }
    async sync() {
        var _a, _b, _c;
        let newConfig;
        try {
            this.logger.log('Trying to sync features config...');
            const currentConfig = await this.repository.getOrCreate();
            newConfig = await this.getNewConfig();
            if (((_a = newConfig === null || newConfig === void 0 ? void 0 : newConfig.data) === null || _a === void 0 ? void 0 : _a.version) > ((_b = currentConfig === null || currentConfig === void 0 ? void 0 : currentConfig.data) === null || _b === void 0 ? void 0 : _b.version)) {
                await this.repository.update(newConfig.data);
                this.analytics.sendFeatureFlagConfigUpdated({
                    oldVersion: (_c = currentConfig === null || currentConfig === void 0 ? void 0 : currentConfig.data) === null || _c === void 0 ? void 0 : _c.version,
                    configVersion: newConfig.data.version,
                    type: newConfig.type,
                });
            }
            this.logger.log('Successfully updated stored remote config');
            this.eventEmitter.emit(constants_1.FeatureServerEvents.FeaturesRecalculate);
        }
        catch (error) {
            this.analytics.sendFeatureFlagConfigUpdateError({
                configVersion: newConfig === null || newConfig === void 0 ? void 0 : newConfig.version,
                error,
            });
            this.logger.error('Unable to update features config', error);
        }
    }
    async getControlInfo() {
        this.logger.debug('Trying to get controlGroup field');
        const model = await (this.repository.getOrCreate());
        return {
            controlNumber: model.controlNumber,
            controlGroup: parseInt(model.controlNumber.toString(), 10).toFixed(0),
        };
    }
};
FeaturesConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [features_config_repository_1.FeaturesConfigRepository,
        event_emitter_1.EventEmitter2,
        feature_analytics_1.FeatureAnalytics])
], FeaturesConfigService);
exports.FeaturesConfigService = FeaturesConfigService;
