"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShardHashStrategy = void 0;
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
const constants_1 = require("../../../../common/constants");
class ShardHashStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    async isRecommendationReached(data) {
        return data.total > constants_1.BIG_HASHES_RECOMMENDATION_LENGTH
            ? { isReached: true, params: { keys: [data.keyName] } }
            : { isReached: false };
    }
}
exports.ShardHashStrategy = ShardHashStrategy;
