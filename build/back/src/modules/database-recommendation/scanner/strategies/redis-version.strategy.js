"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisVersionStrategy = void 0;
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
const semverCompare = require("node-version-compare");
const constants_1 = require("../../../../common/constants");
class RedisVersionStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    async isRecommendationReached(info) {
        return {
            isReached: semverCompare(info.version, constants_1.REDIS_VERSION_RECOMMENDATION_VERSION) < 0,
        };
    }
}
exports.RedisVersionStrategy = RedisVersionStrategy;
