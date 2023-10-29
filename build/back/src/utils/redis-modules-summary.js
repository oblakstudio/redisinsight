"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisModulesSummary = exports.isTriggeredAndFunctionsAvailable = exports.isRedisearchAvailable = exports.DEFAULT_SUMMARY = void 0;
const lodash_1 = require("lodash");
const constants_1 = require("../constants");
exports.DEFAULT_SUMMARY = Object.freeze({
    RediSearch: { loaded: false },
    RedisAI: { loaded: false },
    RedisGraph: { loaded: false },
    RedisGears: { loaded: false },
    RedisBloom: { loaded: false },
    RedisJSON: { loaded: false },
    RedisTimeSeries: { loaded: false },
    'Triggers and Functions': { loaded: false },
    customModules: [],
});
const isRedisearchAvailable = (modules) => (modules === null || modules === void 0 ? void 0 : modules.some(({ name }) => constants_1.REDISEARCH_MODULES.some((search) => name === search)));
exports.isRedisearchAvailable = isRedisearchAvailable;
const isTriggeredAndFunctionsAvailable = (modules) => (modules === null || modules === void 0 ? void 0 : modules.some(({ name }) => constants_1.TRIGGERED_AND_FUNCTIONS_MODULES.some((value) => name === value)));
exports.isTriggeredAndFunctionsAvailable = isTriggeredAndFunctionsAvailable;
const getEnumKeyBValue = (myEnum, enumValue) => {
    const keys = Object.keys(myEnum);
    const index = keys.findIndex((x) => myEnum[x] === enumValue);
    return index > -1 ? keys[index] : '';
};
const getModuleSummaryToSent = (module) => ({
    loaded: true,
    version: module.version,
    semanticVersion: module.semanticVersion,
});
const getRedisModulesSummary = (modules = []) => {
    const summary = (0, lodash_1.cloneDeep)(exports.DEFAULT_SUMMARY);
    try {
        modules.forEach(((module) => {
            if (constants_1.SUPPORTED_REDIS_MODULES[module.name]) {
                const moduleName = getEnumKeyBValue(constants_1.AdditionalRedisModuleName, module.name);
                summary[moduleName] = getModuleSummaryToSent(module);
                return;
            }
            if ((0, exports.isRedisearchAvailable)([module])) {
                const redisearchName = getEnumKeyBValue(constants_1.AdditionalRedisModuleName, constants_1.AdditionalRedisModuleName.RediSearch);
                summary[redisearchName] = getModuleSummaryToSent(module);
                return;
            }
            if ((0, exports.isTriggeredAndFunctionsAvailable)([module])) {
                const triggeredAndFunctionsName = getEnumKeyBValue(constants_1.AdditionalRedisModuleName, constants_1.AdditionalRedisModuleName['Triggers and Functions']);
                summary[triggeredAndFunctionsName] = getModuleSummaryToSent(module);
                return;
            }
            summary.customModules.push(module);
        }));
    }
    catch (e) {
    }
    return summary;
};
exports.getRedisModulesSummary = getRedisModulesSummary;
