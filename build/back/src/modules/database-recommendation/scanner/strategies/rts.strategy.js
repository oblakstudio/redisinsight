"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTSStrategy = void 0;
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
const cli_helper_1 = require("../../../../utils/cli-helper");
const utils_1 = require("../../../../utils");
class RTSStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    async isRecommendationReached(data) {
        const timestampMemberNames = data === null || data === void 0 ? void 0 : data.members.some(({ name }) => (0, utils_1.checkTimestamp)((0, cli_helper_1.getUTF8FromBuffer)(name)));
        const timestampMemberScores = data === null || data === void 0 ? void 0 : data.members.some(({ score }) => (0, utils_1.checkTimestamp)(String(score)));
        return timestampMemberNames || timestampMemberScores
            ? { isReached: true, params: { keys: [data === null || data === void 0 ? void 0 : data.keyName] } }
            : { isReached: false };
    }
}
exports.RTSStrategy = RTSStrategy;
