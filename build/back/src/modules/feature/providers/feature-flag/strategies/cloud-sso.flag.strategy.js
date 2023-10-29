"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudSsoFlagStrategy = void 0;
const feature_flag_strategy_1 = require("./feature.flag.strategy");
class CloudSsoFlagStrategy extends feature_flag_strategy_1.FeatureFlagStrategy {
    async calculate(knownFeature, featureConfig) {
        const isInRange = await this.isInTargetRange(featureConfig === null || featureConfig === void 0 ? void 0 : featureConfig.perc);
        const feature = {
            name: knownFeature.name,
            flag: false,
            data: featureConfig === null || featureConfig === void 0 ? void 0 : featureConfig.data,
        };
        const isEnabledByConfig = isInRange
            && await this.filter(featureConfig === null || featureConfig === void 0 ? void 0 : featureConfig.filters) ? !!(featureConfig === null || featureConfig === void 0 ? void 0 : featureConfig.flag) : !(featureConfig === null || featureConfig === void 0 ? void 0 : featureConfig.flag);
        if (isEnabledByConfig && knownFeature.factory) {
            return {
                ...feature,
                ...(await knownFeature.factory()),
            };
        }
        return feature;
    }
}
exports.CloudSsoFlagStrategy = CloudSsoFlagStrategy;
