"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultFlagStrategy = void 0;
const feature_flag_strategy_1 = require("./feature.flag.strategy");
class DefaultFlagStrategy extends feature_flag_strategy_1.FeatureFlagStrategy {
    async calculate(knownFeature) {
        return {
            name: knownFeature.name,
            flag: false,
        };
    }
}
exports.DefaultFlagStrategy = DefaultFlagStrategy;
