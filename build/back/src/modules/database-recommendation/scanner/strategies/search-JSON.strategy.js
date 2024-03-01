"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchJSONStrategy = void 0;
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
const dto_1 = require("../../../browser/keys/dto");
const utils_1 = require("../../../../utils");
class SearchJSONStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    constructor(databaseService) {
        super();
        this.databaseService = databaseService;
    }
    async isRecommendationReached(data) {
        const { modules } = await this.databaseService.get(data.databaseId);
        if ((0, utils_1.isRedisearchModule)(modules)) {
            const indexes = await data.client.sendCommand(['FT._LIST'], { replyEncoding: 'utf8' });
            if (indexes.length) {
                return { isReached: false };
            }
        }
        const isJSON = data.keys.find((key) => key.type === dto_1.RedisDataType.JSON);
        return isJSON ? { isReached: !!isJSON, params: { keys: [isJSON.name] } } : { isReached: false };
    }
}
exports.SearchJSONStrategy = SearchJSONStrategy;
