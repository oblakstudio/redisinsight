"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressionForListStrategy = void 0;
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
const dto_1 = require("../../../browser/keys/dto");
const constants_1 = require("../../../../common/constants");
class CompressionForListStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    async isRecommendationReached(key) {
        const isBigList = key.type === dto_1.RedisDataType.List && key.length > constants_1.COMPRESSION_FOR_LIST_RECOMMENDATION_LENGTH;
        return isBigList
            ? { isReached: true, params: { keys: [key === null || key === void 0 ? void 0 : key.name] } }
            : { isReached: false };
    }
}
exports.CompressionForListStrategy = CompressionForListStrategy;
