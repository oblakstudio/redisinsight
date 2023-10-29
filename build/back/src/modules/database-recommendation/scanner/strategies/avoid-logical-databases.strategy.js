"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvoidLogicalDatabasesStrategy = void 0;
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
class AvoidLogicalDatabasesStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    async isRecommendationReached({ prevDb, db }) {
        return { isReached: prevDb !== db };
    }
}
exports.AvoidLogicalDatabasesStrategy = AvoidLogicalDatabasesStrategy;
