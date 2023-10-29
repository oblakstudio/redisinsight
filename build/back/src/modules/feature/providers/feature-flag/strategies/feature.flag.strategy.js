"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlagStrategy = void 0;
const lodash_1 = require("lodash");
const features_config_1 = require("../../../model/features-config");
const config_1 = require("../../../../../utils/config");
class FeatureFlagStrategy {
    constructor(featuresConfigService, settingsService) {
        this.featuresConfigService = featuresConfigService;
        this.settingsService = settingsService;
    }
    async isInTargetRange(perc = [[-1]]) {
        try {
            const { controlNumber } = await this.featuresConfigService.getControlInfo();
            return !!perc.find((range) => controlNumber >= range[0] && controlNumber < range[1]);
        }
        catch (e) {
            return false;
        }
    }
    async getServerState() {
        const state = {
            config: config_1.default.get(),
            env: process.env,
            agreements: null,
            settings: null,
        };
        try {
            const appSettings = await this.settingsService.getAppSettings('1').catch(null);
            state.agreements = appSettings === null || appSettings === void 0 ? void 0 : appSettings.agreements;
            state.settings = appSettings;
        }
        catch (e) {
        }
        return state;
    }
    async filter(filters) {
        try {
            const serverState = await this.getServerState();
            return this.checkAndFilters(filters, serverState);
        }
        catch (e) {
            return false;
        }
    }
    checkFilter(filter, serverState) {
        try {
            if (filter instanceof features_config_1.FeatureConfigFilterAnd) {
                return this.checkAndFilters(filter.and, serverState);
            }
            if (filter instanceof features_config_1.FeatureConfigFilterOr) {
                return this.checkOrFilters(filter.or, serverState);
            }
            if (filter instanceof features_config_1.FeatureConfigFilter) {
                const value = (0, lodash_1.get)(serverState, filter === null || filter === void 0 ? void 0 : filter.name);
                switch (filter === null || filter === void 0 ? void 0 : filter.cond) {
                    case features_config_1.FeatureConfigFilterCondition.Eq:
                        return value === (filter === null || filter === void 0 ? void 0 : filter.value);
                    case features_config_1.FeatureConfigFilterCondition.Neq:
                        return value !== (filter === null || filter === void 0 ? void 0 : filter.value);
                    case features_config_1.FeatureConfigFilterCondition.Gt:
                        return value > (filter === null || filter === void 0 ? void 0 : filter.value);
                    case features_config_1.FeatureConfigFilterCondition.Gte:
                        return value >= (filter === null || filter === void 0 ? void 0 : filter.value);
                    case features_config_1.FeatureConfigFilterCondition.Lt:
                        return value < (filter === null || filter === void 0 ? void 0 : filter.value);
                    case features_config_1.FeatureConfigFilterCondition.Lte:
                        return value <= (filter === null || filter === void 0 ? void 0 : filter.value);
                    default:
                        return false;
                }
            }
        }
        catch (e) {
        }
        return false;
    }
    checkAndFilters(filters, serverState) {
        try {
            return !!filters.every((filter) => this.checkFilter(filter, serverState));
        }
        catch (e) {
            return false;
        }
    }
    checkOrFilters(filters, serverState) {
        try {
            return !!filters.some((filter) => this.checkFilter(filter, serverState));
        }
        catch (e) {
            return false;
        }
    }
}
exports.FeatureFlagStrategy = FeatureFlagStrategy;
