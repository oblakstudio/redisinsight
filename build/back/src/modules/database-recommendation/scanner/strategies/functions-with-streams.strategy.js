"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionsWithStreamsStrategy = void 0;
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
const dto_1 = require("../../../browser/keys/dto");
const utils_1 = require("../../../../utils");
class FunctionsWithStreamsStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    constructor(databaseService) {
        super();
        this.databaseService = databaseService;
    }
    async isRecommendationReached(data) {
        const { modules } = await this.databaseService.get(data.databaseId);
        if ((0, utils_1.isTriggeredAndFunctionsModule)(modules)) {
            const libraries = await data.client.sendCommand(['TFUNCTION', 'LIST'], { replyEncoding: 'utf8' });
            if (libraries.length) {
                return { isReached: false };
            }
        }
        const isStream = data.keys.some((key) => key.type === dto_1.RedisDataType.Stream);
        return { isReached: isStream };
    }
}
exports.FunctionsWithStreamsStrategy = FunctionsWithStreamsStrategy;
