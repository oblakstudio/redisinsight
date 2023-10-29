"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvoidLuaScriptsStrategy = void 0;
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
const constants_1 = require("../../../../common/constants");
class AvoidLuaScriptsStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    async isRecommendationReached(info) {
        return { isReached: info.cashedScripts > constants_1.LUA_SCRIPT_RECOMMENDATION_COUNT };
    }
}
exports.AvoidLuaScriptsStrategy = AvoidLuaScriptsStrategy;
