"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchVisualizationStrategy = void 0;
const constants_1 = require("../../../../common/constants");
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
class SearchVisualizationStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    async isRecommendationReached(commandInit = '') {
        const [command] = commandInit.split(' ');
        return {
            isReached: Object.values(constants_1.SearchVisualizationCommands)
                .includes(command.toUpperCase()),
        };
    }
}
exports.SearchVisualizationStrategy = SearchVisualizationStrategy;
