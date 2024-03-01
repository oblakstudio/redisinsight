"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigStringStrategy = void 0;
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
const dto_1 = require("../../../browser/keys/dto");
const constants_1 = require("../../../../common/constants");
class BigStringStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    async isRecommendationReached(key) {
        const isBigString = key.type === dto_1.RedisDataType.String && key.size > constants_1.BIG_STRINGS_RECOMMENDATION_MEMORY;
        return isBigString
            ? { isReached: true, params: { keys: [key === null || key === void 0 ? void 0 : key.name] } }
            : { isReached: false };
    }
}
exports.BigStringStrategy = BigStringStrategy;
