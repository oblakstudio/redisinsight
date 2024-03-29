"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalyticsDataFromIndexInfo = exports.getIsPipelineEnable = exports.calculateRedisHitRatio = exports.getRangeForNumber = exports.BULK_ACTIONS_BREAKPOINTS = exports.SCAN_THRESHOLD_BREAKPOINTS = exports.TOTAL_KEYS_BREAKPOINTS = void 0;
const lodash_1 = require("lodash");
const reply_util_1 = require("../modules/redis/utils/reply.util");
exports.TOTAL_KEYS_BREAKPOINTS = [
    500000,
    1000000,
    10000000,
    50000000,
    100000000,
    1000000000,
];
exports.SCAN_THRESHOLD_BREAKPOINTS = [
    5000,
    10000,
    50000,
    100000,
    1000000,
];
exports.BULK_ACTIONS_BREAKPOINTS = [
    5000,
    10000,
    50000,
    100000,
    1000000,
];
const numberWithSpaces = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const getRangeForNumber = (value, breakpoints = exports.TOTAL_KEYS_BREAKPOINTS) => {
    if ((0, lodash_1.isNil)(value)) {
        return undefined;
    }
    const index = breakpoints.findIndex((threshold) => value <= threshold);
    if (index === 0) {
        return `0 - ${numberWithSpaces(breakpoints[0])}`;
    }
    if (index === -1) {
        const lastItem = breakpoints[breakpoints.length - 1];
        return `${numberWithSpaces(lastItem + 1)} +`;
    }
    return `${numberWithSpaces(breakpoints[index - 1] + 1)} - ${numberWithSpaces(breakpoints[index])}`;
};
exports.getRangeForNumber = getRangeForNumber;
const calculateRedisHitRatio = (keyspaceHits, keyspaceMisses) => {
    try {
        if ((0, lodash_1.isNil)(keyspaceHits) || (0, lodash_1.isNil)(keyspaceMisses)) {
            return undefined;
        }
        const keyspaceHitsValue = +keyspaceHits;
        const keyspaceMissesValue = +keyspaceMisses;
        if (keyspaceHitsValue === 0) {
            return 1;
        }
        const result = keyspaceHitsValue / (keyspaceHitsValue + keyspaceMissesValue);
        return Number.isNaN(result) ? undefined : result;
    }
    catch (error) {
        return undefined;
    }
};
exports.calculateRedisHitRatio = calculateRedisHitRatio;
const getIsPipelineEnable = (size) => size > 1;
exports.getIsPipelineEnable = getIsPipelineEnable;
const getAnalyticsDataFromIndexInfo = (reply) => {
    const analyticsData = {};
    try {
        const replyInfo = (0, reply_util_1.convertArrayReplyToObject)(reply, { utf: true });
        const definition = (0, reply_util_1.convertArrayReplyToObject)(replyInfo.index_definition, { utf: true });
        analyticsData['key_type'] = definition === null || definition === void 0 ? void 0 : definition.key_type;
        analyticsData['default_score'] = definition === null || definition === void 0 ? void 0 : definition.default_score;
        analyticsData['num_docs'] = replyInfo === null || replyInfo === void 0 ? void 0 : replyInfo.num_docs;
        analyticsData['max_doc_id'] = replyInfo === null || replyInfo === void 0 ? void 0 : replyInfo.max_doc_id;
        analyticsData['num_terms'] = replyInfo === null || replyInfo === void 0 ? void 0 : replyInfo.num_terms;
        analyticsData['num_records'] = replyInfo === null || replyInfo === void 0 ? void 0 : replyInfo.num_records;
        analyticsData['total_indexing_time'] = replyInfo === null || replyInfo === void 0 ? void 0 : replyInfo.total_indexing_time;
        analyticsData['number_of_uses'] = replyInfo === null || replyInfo === void 0 ? void 0 : replyInfo.number_of_uses;
        analyticsData['cleaning'] = replyInfo === null || replyInfo === void 0 ? void 0 : replyInfo.cleaning;
        if (replyInfo.dialect_stats) {
            analyticsData['dialect_stats'] = (0, reply_util_1.convertArrayReplyToObject)(replyInfo.dialect_stats, { utf: true });
        }
        analyticsData['attributes'] = (0, lodash_1.map)(replyInfo === null || replyInfo === void 0 ? void 0 : replyInfo.attributes, ((attr) => {
            const attrArray = (0, lodash_1.map)(attr, (str) => str.toString().toLowerCase());
            const attrObject = (0, reply_util_1.convertArrayReplyToObject)(attr, { utf: true });
            return {
                type: attrObject === null || attrObject === void 0 ? void 0 : attrObject['type'],
                weight: (attrObject === null || attrObject === void 0 ? void 0 : attrObject['weight']) || undefined,
                phonetic: (attrObject === null || attrObject === void 0 ? void 0 : attrObject['phonetic']) || undefined,
                sortable: (0, lodash_1.includes)(attrArray, 'sortable') || undefined,
                nostem: (0, lodash_1.includes)(attrArray, 'nostem') || undefined,
                unf: (0, lodash_1.includes)(attrArray, 'unf') || undefined,
                noindex: (0, lodash_1.includes)(attrArray, 'noindex') || undefined,
                casesensitive: (0, lodash_1.includes)(attrArray, 'casesensitive') || undefined,
            };
        }));
        return analyticsData;
    }
    catch (e) {
        return null;
    }
};
exports.getAnalyticsDataFromIndexInfo = getAnalyticsDataFromIndexInfo;
