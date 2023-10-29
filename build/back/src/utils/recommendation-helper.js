"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkKeyspaceNotification = exports.checkTimestamp = exports.sortRecommendations = exports.isTriggeredAndFunctionsModule = exports.isRedisearchModule = void 0;
const lodash_1 = require("lodash");
const date_fns_1 = require("date-fns");
const constants_1 = require("../constants");
const isRedisearchModule = (modules) => modules === null || modules === void 0 ? void 0 : modules.some(({ name }) => constants_1.REDISEARCH_MODULES.some((search) => name === search));
exports.isRedisearchModule = isRedisearchModule;
const isTriggeredAndFunctionsModule = (modules) => modules === null || modules === void 0 ? void 0 : modules.some(({ name }) => constants_1.TRIGGERED_AND_FUNCTIONS_MODULES.some((search) => name === search));
exports.isTriggeredAndFunctionsModule = isTriggeredAndFunctionsModule;
const sortRecommendations = (recommendations) => (0, lodash_1.sortBy)(recommendations, [
    ({ name }) => name !== constants_1.RECOMMENDATION_NAMES.SEARCH_JSON,
    ({ name }) => name !== constants_1.RECOMMENDATION_NAMES.SEARCH_INDEXES,
    ({ name }) => !constants_1.REDIS_STACK.includes(name),
    ({ name }) => name,
]);
exports.sortRecommendations = sortRecommendations;
const checkTimestamp = (value) => {
    try {
        if (!constants_1.IS_NUMBER_REGEX.test(value) && (0, date_fns_1.isValid)(new Date(value))) {
            return true;
        }
        const integerPart = parseInt(value, 10);
        if (!constants_1.IS_TIMESTAMP.test(integerPart.toString())) {
            return false;
        }
        if (integerPart.toString().length === value.length) {
            return true;
        }
        const subPart = value.replace(integerPart.toString(), '');
        return constants_1.IS_INTEGER_NUMBER_REGEX.test(subPart.substring(1, subPart.length));
    }
    catch (err) {
        return false;
    }
};
exports.checkTimestamp = checkTimestamp;
const checkKeyspaceNotification = (reply) => (reply.indexOf('K') > -1 || reply.indexOf('E') > -1);
exports.checkKeyspaceNotification = checkKeyspaceNotification;
