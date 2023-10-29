"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LuaToFunctionsStrategy = void 0;
const ioredis_1 = require("ioredis");
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
const utils_1 = require("../../../../utils");
const constants_1 = require("../../../../common/constants");
class LuaToFunctionsStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    constructor(databaseService) {
        super();
        this.databaseService = databaseService;
    }
    async isRecommendationReached(data) {
        const { modules } = await this.databaseService.get(data.databaseId);
        if ((0, utils_1.isTriggeredAndFunctionsModule)(modules)) {
            const libraries = await data.client.sendCommand(new ioredis_1.Command('TFUNCTION', ['LIST'], { replyEncoding: 'utf8' }));
            if (libraries.length) {
                return { isReached: false };
            }
        }
        return { isReached: data.info.cashedScripts > constants_1.LUA_TO_FUNCTIONS_RECOMMENDATION_COUNT };
    }
}
exports.LuaToFunctionsStrategy = LuaToFunctionsStrategy;
