"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigSetStrategy = void 0;
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
const dto_1 = require("../../../browser/keys/dto");
const constants_1 = require("../../../../common/constants");
class BigSetStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    async isRecommendationReached(key) {
        return (key === null || key === void 0 ? void 0 : key.type) === dto_1.RedisDataType.Set && (key === null || key === void 0 ? void 0 : key.length) > constants_1.BIG_SETS_RECOMMENDATION_LENGTH
            ? { isReached: true, params: { keys: [key === null || key === void 0 ? void 0 : key.name] } }
            : { isReached: false };
    }
}
exports.BigSetStrategy = BigSetStrategy;
