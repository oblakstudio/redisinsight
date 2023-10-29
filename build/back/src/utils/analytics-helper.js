"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsPipelineEnable = exports.calculateRedisHitRatio = exports.getRangeForNumber = exports.BULK_ACTIONS_BREAKPOINTS = exports.SCAN_THRESHOLD_BREAKPOINTS = exports.TOTAL_KEYS_BREAKPOINTS = void 0;
const lodash_1 = require("lodash");
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
