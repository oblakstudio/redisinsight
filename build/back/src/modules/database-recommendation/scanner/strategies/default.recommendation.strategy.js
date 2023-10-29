"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultRecommendationStrategy = void 0;
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
class DefaultRecommendationStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    async isRecommendationReached() {
        return { isReached: false };
    }
}
exports.DefaultRecommendationStrategy = DefaultRecommendationStrategy;
