"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringToJsonStrategy = void 0;
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
const base_helper_1 = require("../../../../utils/base.helper");
const cli_helper_1 = require("../../../../utils/cli-helper");
class StringToJsonStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    async isRecommendationReached(data) {
        return (0, base_helper_1.isJson)((0, cli_helper_1.getUTF8FromBuffer)(data === null || data === void 0 ? void 0 : data.value))
            ? { isReached: true, params: { keys: [data.keyName] } }
            : { isReached: false };
    }
}
exports.StringToJsonStrategy = StringToJsonStrategy;
