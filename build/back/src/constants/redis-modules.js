"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRIGGERED_AND_FUNCTIONS_MODULES = exports.REDISEARCH_MODULES = exports.REDIS_MODULES_COMMANDS = exports.RE_CLUSTER_MODULES_NAMES = exports.RE_CLOUD_MODULES_NAMES = exports.SUPPORTED_REDIS_MODULES = exports.AdditionalTriggersAndFunctionsModuleName = exports.AdditionalSearchModuleName = exports.AdditionalRedisModuleName = void 0;
var AdditionalRedisModuleName;
(function (AdditionalRedisModuleName) {
    AdditionalRedisModuleName["RedisAI"] = "ai";
    AdditionalRedisModuleName["RedisGraph"] = "graph";
    AdditionalRedisModuleName["RedisGears"] = "rg";
    AdditionalRedisModuleName["RedisBloom"] = "bf";
    AdditionalRedisModuleName["RedisJSON"] = "ReJSON";
    AdditionalRedisModuleName["RediSearch"] = "search";
    AdditionalRedisModuleName["RedisTimeSeries"] = "timeseries";
    AdditionalRedisModuleName["Triggers and Functions"] = "redisgears";
})(AdditionalRedisModuleName = exports.AdditionalRedisModuleName || (exports.AdditionalRedisModuleName = {}));
var AdditionalSearchModuleName;
(function (AdditionalSearchModuleName) {
    AdditionalSearchModuleName["SearchLight"] = "searchlight";
    AdditionalSearchModuleName["FT"] = "ft";
    AdditionalSearchModuleName["FTL"] = "ftl";
})(AdditionalSearchModuleName = exports.AdditionalSearchModuleName || (exports.AdditionalSearchModuleName = {}));
var AdditionalTriggersAndFunctionsModuleName;
(function (AdditionalTriggersAndFunctionsModuleName) {
    AdditionalTriggersAndFunctionsModuleName["TriggersAndFunctions"] = "redisgears";
    AdditionalTriggersAndFunctionsModuleName["TriggersAndFunctions2"] = "redisgears_2";
})(AdditionalTriggersAndFunctionsModuleName = exports.AdditionalTriggersAndFunctionsModuleName || (exports.AdditionalTriggersAndFunctionsModuleName = {}));
exports.SUPPORTED_REDIS_MODULES = Object.freeze({
    ai: AdditionalRedisModuleName.RedisAI,
    graph: AdditionalRedisModuleName.RedisGraph,
    rg: AdditionalRedisModuleName.RedisGears,
    bf: AdditionalRedisModuleName.RedisBloom,
    ReJSON: AdditionalRedisModuleName.RedisJSON,
    search: AdditionalRedisModuleName.RediSearch,
    timeseries: AdditionalRedisModuleName.RedisTimeSeries,
});
exports.RE_CLOUD_MODULES_NAMES = Object.freeze({
    RedisAI: AdditionalRedisModuleName.RedisAI,
    RedisGraph: AdditionalRedisModuleName.RedisGraph,
    RedisGears: AdditionalRedisModuleName.RedisGears,
    RedisBloom: AdditionalRedisModuleName.RedisBloom,
    RedisJSON: AdditionalRedisModuleName.RedisJSON,
    RediSearch: AdditionalRedisModuleName.RediSearch,
    RedisTimeSeries: AdditionalRedisModuleName.RedisTimeSeries,
});
exports.RE_CLUSTER_MODULES_NAMES = Object.freeze({
    ai: AdditionalRedisModuleName.RedisAI,
    graph: AdditionalRedisModuleName.RedisGraph,
    gears: AdditionalRedisModuleName.RedisGears,
    bf: AdditionalRedisModuleName.RedisBloom,
    ReJSON: AdditionalRedisModuleName.RedisJSON,
    search: AdditionalRedisModuleName.RediSearch,
    timeseries: AdditionalRedisModuleName.RedisTimeSeries,
});
exports.REDIS_MODULES_COMMANDS = new Map([
    [AdditionalRedisModuleName.RedisAI, ['ai.info']],
    [AdditionalRedisModuleName.RedisGraph, ['graph.delete']],
    [AdditionalRedisModuleName.RedisGears, ['rg.pyexecute']],
    [AdditionalRedisModuleName.RedisBloom, ['bf.info', 'cf.info', 'cms.info', 'topk.info']],
    [AdditionalRedisModuleName.RedisJSON, ['json.get']],
    [AdditionalRedisModuleName.RediSearch, ['ft.info']],
    [AdditionalRedisModuleName.RedisTimeSeries, ['ts.mrange', 'ts.info']],
]);
exports.REDISEARCH_MODULES = [
    AdditionalRedisModuleName.RediSearch,
    AdditionalSearchModuleName.SearchLight,
    AdditionalSearchModuleName.FT,
    AdditionalSearchModuleName.FTL,
];
exports.TRIGGERED_AND_FUNCTIONS_MODULES = [
    AdditionalTriggersAndFunctionsModuleName.TriggersAndFunctions,
    AdditionalTriggersAndFunctionsModuleName.TriggersAndFunctions2,
];
