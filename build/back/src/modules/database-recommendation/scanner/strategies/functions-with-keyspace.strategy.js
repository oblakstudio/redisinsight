"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionsWithKeyspaceStrategy = void 0;
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
const utils_1 = require("../../../../utils");
class FunctionsWithKeyspaceStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
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
        const reply = await data.client.sendCommand(['CONFIG', 'GET', 'notify-keyspace-events'], { replyEncoding: 'utf8' });
        return { isReached: (0, utils_1.checkKeyspaceNotification)(reply[1]) };
    }
}
exports.FunctionsWithKeyspaceStrategy = FunctionsWithKeyspaceStrategy;
