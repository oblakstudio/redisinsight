"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseSmallerKeysStrategy = void 0;
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
const constants_1 = require("../../../../common/constants");
class UseSmallerKeysStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    async isRecommendationReached(total) {
        return { isReached: total > constants_1.USE_SMALLER_KEYS_RECOMMENDATION_TOTAL };
    }
}
exports.UseSmallerKeysStrategy = UseSmallerKeysStrategy;
