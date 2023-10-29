"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigAmountConnectedClientsStrategy = void 0;
const lodash_1 = require("lodash");
const abstract_recommendation_strategy_1 = require("./abstract.recommendation.strategy");
const constants_1 = require("../../../../common/constants");
class BigAmountConnectedClientsStrategy extends abstract_recommendation_strategy_1.AbstractRecommendationStrategy {
    async isRecommendationReached(info) {
        var _a;
        const nodeInfo = ((_a = info.nodes) === null || _a === void 0 ? void 0 : _a.length) ? (0, lodash_1.maxBy)(info.nodes, 'connectedClients') : info;
        return { isReached: (nodeInfo === null || nodeInfo === void 0 ? void 0 : nodeInfo.connectedClients) > constants_1.BIG_AMOUNT_OF_CONNECTED_CLIENTS_RECOMMENDATION_CLIENTS };
    }
}
exports.BigAmountConnectedClientsStrategy = BigAmountConnectedClientsStrategy;
