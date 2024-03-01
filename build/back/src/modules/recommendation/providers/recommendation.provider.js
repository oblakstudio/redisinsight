"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationProvider = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const semverCompare = require("node-version-compare");
const utils_1 = require("../../../utils");
const constants_1 = require("../../../constants");
const dto_1 = require("../../browser/keys/dto");
const constants_2 = require("../../../common/constants");
const utils_2 = require("../../redis/utils");
const client_1 = require("../../redis/client");
let RecommendationProvider = class RecommendationProvider {
    constructor() {
        this.logger = new common_1.Logger('RecommendationProvider');
    }
    async determineLuaScriptRecommendation(redisClient) {
        try {
            const info = (0, utils_1.convertRedisInfoReplyToObject)(await redisClient.sendCommand(['info', 'memory'], { replyEncoding: 'utf8' }));
            const nodesNumbersOfCachedScripts = (0, lodash_1.get)(info, 'memory.number_of_cached_scripts');
            return parseInt(nodesNumbersOfCachedScripts, 10) > constants_2.LUA_SCRIPT_RECOMMENDATION_COUNT
                ? { name: constants_1.RECOMMENDATION_NAMES.LUA_SCRIPT }
                : null;
        }
        catch (err) {
            this.logger.error('Can not determine Lua script recommendation', err);
            return null;
        }
    }
    async determineBigHashesRecommendation(keys) {
        try {
            const bigHash = keys.find((key) => key.type === dto_1.RedisDataType.Hash && key.length > constants_2.BIG_HASHES_RECOMMENDATION_LENGTH);
            return bigHash ? { name: constants_1.RECOMMENDATION_NAMES.BIG_HASHES, params: { keys: [bigHash.name] } } : null;
        }
        catch (err) {
            this.logger.error('Can not determine Big Hashes recommendation', err);
            return null;
        }
    }
    async determineBigTotalRecommendation(total) {
        return total > constants_2.USE_SMALLER_KEYS_RECOMMENDATION_TOTAL ? { name: constants_1.RECOMMENDATION_NAMES.USE_SMALLER_KEYS } : null;
    }
    async determineLogicalDatabasesRecommendation(redisClient) {
        if (redisClient.getConnectionType() === client_1.RedisClientConnectionType.CLUSTER) {
            return null;
        }
        try {
            const info = (0, utils_1.convertRedisInfoReplyToObject)(await redisClient.sendCommand(['info', 'keyspace'], { replyEncoding: 'utf8' }));
            const keyspace = (0, lodash_1.get)(info, 'keyspace', {});
            const databasesWithKeys = Object.values(keyspace).filter((db) => {
                const { keys } = (0, utils_2.convertMultilineReplyToObject)(db, ',', '=');
                return parseInt(keys, 10) > 0;
            });
            return databasesWithKeys.length > 1 ? { name: constants_1.RECOMMENDATION_NAMES.AVOID_LOGICAL_DATABASES } : null;
        }
        catch (err) {
            this.logger.error('Can not determine Logical database recommendation', err);
            return null;
        }
    }
    async determineCombineSmallStringsToHashesRecommendation(keys) {
        try {
            const smallString = keys.filter((key) => key.type === dto_1.RedisDataType.String
                && key.memory < constants_2.COMBINE_SMALL_STRINGS_TO_HASHES_RECOMMENDATION_MEMORY);
            return smallString.length >= constants_2.COMBINE_SMALL_STRINGS_TO_HASHES_RECOMMENDATION_KEYS_COUNT
                ? { name: constants_1.RECOMMENDATION_NAMES.COMBINE_SMALL_STRINGS_TO_HASHES, params: { keys: [smallString[0].name] } }
                : null;
        }
        catch (err) {
            this.logger.error('Can not determine Combine small strings to hashes recommendation', err);
            return null;
        }
    }
    async determineIncreaseSetMaxIntsetEntriesRecommendation(redisClient, keys) {
        try {
            const [, setMaxIntsetEntries] = await redisClient.sendCommand(['config', 'get', 'set-max-intset-entries'], { replyEncoding: 'utf8' });
            if (!setMaxIntsetEntries) {
                return null;
            }
            const setMaxIntsetEntriesNumber = parseInt(setMaxIntsetEntries, 10);
            const bigSet = keys.find((key) => key.type === dto_1.RedisDataType.Set && key.length > setMaxIntsetEntriesNumber);
            return bigSet
                ? { name: constants_1.RECOMMENDATION_NAMES.INCREASE_SET_MAX_INTSET_ENTRIES, params: { keys: [bigSet.name] } }
                : null;
        }
        catch (err) {
            this.logger.error('Can not determine Increase set max intset entries recommendation', err);
            return null;
        }
    }
    async determineHashHashtableToZiplistRecommendation(redisClient, keys) {
        try {
            const [, hashMaxZiplistEntries] = await redisClient.sendCommand(['config', 'get', 'hash-max-ziplist-entries'], { replyEncoding: 'utf8' });
            const hashMaxZiplistEntriesNumber = parseInt(hashMaxZiplistEntries, 10);
            const bigHash = keys.find((key) => key.type === dto_1.RedisDataType.Hash && key.length > hashMaxZiplistEntriesNumber);
            return bigHash
                ? { name: constants_1.RECOMMENDATION_NAMES.HASH_HASHTABLE_TO_ZIPLIST, params: { keys: [bigHash.name] } }
                : null;
        }
        catch (err) {
            this.logger.error('Can not determine Convert hashtable to ziplist recommendation', err);
            return null;
        }
    }
    async determineCompressHashFieldNamesRecommendation(keys) {
        try {
            const bigHash = keys.find((key) => key.type === dto_1.RedisDataType.Hash
                && key.length > constants_2.COMPRESS_HASH_FIELD_NAMES_RECOMMENDATION_LENGTH);
            return bigHash
                ? { name: constants_1.RECOMMENDATION_NAMES.COMPRESS_HASH_FIELD_NAMES, params: { keys: [bigHash.name] } }
                : null;
        }
        catch (err) {
            this.logger.error('Can not determine Compress hash field names recommendation', err);
            return null;
        }
    }
    async determineCompressionForListRecommendation(keys) {
        try {
            const bigList = keys.find((key) => key.type === dto_1.RedisDataType.List
                && key.length > constants_2.COMPRESSION_FOR_LIST_RECOMMENDATION_LENGTH);
            return bigList ? { name: constants_1.RECOMMENDATION_NAMES.COMPRESSION_FOR_LIST, params: { keys: [bigList.name] } } : null;
        }
        catch (err) {
            this.logger.error('Can not determine Compression for list recommendation', err);
            return null;
        }
    }
    async determineBigStringsRecommendation(keys) {
        try {
            const bigString = keys.find((key) => key.type === dto_1.RedisDataType.String
                && key.memory > constants_2.BIG_STRINGS_RECOMMENDATION_MEMORY);
            return bigString
                ? { name: constants_1.RECOMMENDATION_NAMES.BIG_STRINGS, params: { keys: [bigString.name] } }
                : null;
        }
        catch (err) {
            this.logger.error('Can not determine Big strings recommendation', err);
            return null;
        }
    }
    async determineZSetHashtableToZiplistRecommendation(redisClient, keys) {
        try {
            const [, zSetMaxZiplistEntries] = await redisClient.sendCommand(['config', 'get', 'zset-max-ziplist-entries'], { replyEncoding: 'utf8' });
            const zSetMaxZiplistEntriesNumber = parseInt(zSetMaxZiplistEntries, 10);
            const bigHash = keys.find((key) => key.type === dto_1.RedisDataType.ZSet && key.length > zSetMaxZiplistEntriesNumber);
            return bigHash
                ? { name: constants_1.RECOMMENDATION_NAMES.ZSET_HASHTABLE_TO_ZIPLIST, params: { keys: [bigHash.name] } }
                : null;
        }
        catch (err) {
            this.logger.error('Can not determine ZSet hashtable to ziplist recommendation', err);
            return null;
        }
    }
    async determineBigSetsRecommendation(keys) {
        try {
            const bigSet = keys.find((key) => key.type === dto_1.RedisDataType.Set && key.length > constants_2.BIG_SETS_RECOMMENDATION_LENGTH);
            return bigSet ? { name: constants_1.RECOMMENDATION_NAMES.BIG_SETS, params: { keys: [bigSet.name] } } : null;
        }
        catch (err) {
            this.logger.error('Can not determine Big sets recommendation', err);
            return null;
        }
    }
    async determineConnectionClientsRecommendation(redisClient) {
        try {
            const info = (0, utils_1.convertRedisInfoReplyToObject)(await redisClient.sendCommand(['info', 'clients'], { replyEncoding: 'utf8' }));
            const connectedClients = parseInt((0, lodash_1.get)(info, 'clients.connected_clients'), 10);
            return connectedClients > constants_2.BIG_AMOUNT_OF_CONNECTED_CLIENTS_RECOMMENDATION_CLIENTS
                ? { name: constants_1.RECOMMENDATION_NAMES.BIG_AMOUNT_OF_CONNECTED_CLIENTS } : null;
        }
        catch (err) {
            this.logger.error('Can not determine Connection clients recommendation', err);
            return null;
        }
    }
    async determineSearchJSONRecommendation(keys, indexes) {
        try {
            if (indexes === null || indexes === void 0 ? void 0 : indexes.length) {
                return null;
            }
            const jsonKey = keys.find((key) => key.type === dto_1.RedisDataType.JSON);
            return jsonKey ? { name: constants_1.RECOMMENDATION_NAMES.SEARCH_JSON, params: { keys: [jsonKey.name] } } : null;
        }
        catch (err) {
            this.logger.error('Can not determine search json recommendation', err);
            return null;
        }
    }
    async determineRedisVersionRecommendation(redisClient) {
        try {
            const info = (0, utils_1.convertRedisInfoReplyToObject)(await redisClient.sendCommand(['info', 'server'], { replyEncoding: 'utf8' }));
            const version = (0, lodash_1.get)(info, 'server.redis_version');
            return semverCompare(version, constants_2.REDIS_VERSION_RECOMMENDATION_VERSION) >= 0
                ? null
                : { name: constants_1.RECOMMENDATION_NAMES.REDIS_VERSION };
        }
        catch (err) {
            this.logger.error('Can not determine redis version recommendation', err);
            return null;
        }
    }
    async determineSetPasswordRecommendation(redisClient) {
        if (await this.checkAuth(redisClient)) {
            return { name: constants_1.RECOMMENDATION_NAMES.SET_PASSWORD };
        }
        try {
            const users = await redisClient.sendCommand(['acl', 'list'], { replyEncoding: 'utf8' });
            const nopassUser = users.some((user) => user.split(' ')[3] === 'nopass');
            return nopassUser ? { name: constants_1.RECOMMENDATION_NAMES.SET_PASSWORD } : null;
        }
        catch (err) {
            this.logger.error('Can not determine set password recommendation', err);
            return null;
        }
    }
    async determineSearchHashRecommendation(keys, indexes) {
        try {
            if (indexes === null || indexes === void 0 ? void 0 : indexes.length) {
                return null;
            }
            const hashKeys = keys.filter(({ type, length }) => (type === dto_1.RedisDataType.Hash && length > constants_2.SEARCH_HASH_RECOMMENDATION_KEYS_LENGTH));
            return hashKeys.length > constants_2.SEARCH_HASH_RECOMMENDATION_KEYS_FOR_CHECK
                ? { name: constants_1.RECOMMENDATION_NAMES.SEARCH_HASH }
                : null;
        }
        catch (err) {
            this.logger.error('Can not determine search hash recommendation', err);
            return null;
        }
    }
    async determineSearchIndexesRecommendation(redisClient, keys, client) {
        try {
            if (client.getConnectionType() === client_1.RedisClientConnectionType.CLUSTER) {
                const res = await this.determineSearchIndexesForCluster(keys, client);
                return res ? { name: constants_1.RECOMMENDATION_NAMES.SEARCH_INDEXES, params: { keys: [res] } } : null;
            }
            const res = await this.determineSearchIndexesForStandalone(keys, redisClient);
            return res ? { name: constants_1.RECOMMENDATION_NAMES.SEARCH_INDEXES, params: { keys: [res] } } : null;
        }
        catch (err) {
            this.logger.error('Can not determine search indexes recommendation', err);
            return null;
        }
    }
    async checkAuth(redisClient) {
        try {
            await redisClient.sendCommand(['auth', 'pass']);
        }
        catch (err) {
            if (err.message.includes('Client sent AUTH, but no password is set')) {
                return true;
            }
        }
        return false;
    }
    async determineSearchIndexesForCluster(keys, client) {
        let processedKeysNumber = 0;
        let keyName;
        let sortedSetNumber = 0;
        while (processedKeysNumber < keys.length
            && !keyName
            && sortedSetNumber <= constants_2.SEARCH_INDEXES_RECOMMENDATION_KEYS_FOR_CHECK) {
            if (keys[processedKeysNumber].type !== dto_1.RedisDataType.ZSet) {
                processedKeysNumber += 1;
            }
            else {
                const sortedSetMember = await client.sendCommand(['zrange', keys[processedKeysNumber].name, 0, 0], { replyEncoding: 'utf8' });
                const keyType = await client.sendCommand(['type', sortedSetMember[0]], { replyEncoding: 'utf8' });
                if (keyType === dto_1.RedisDataType.JSON || keyType === dto_1.RedisDataType.Hash) {
                    keyName = keys[processedKeysNumber].name;
                }
                processedKeysNumber += 1;
                sortedSetNumber += 1;
            }
        }
        return keyName;
    }
    async determineSearchIndexesForStandalone(keys, redisClient) {
        const sortedSets = keys
            .filter(({ type }) => type === dto_1.RedisDataType.ZSet)
            .slice(0, 100);
        const res = await redisClient.sendPipeline(sortedSets.map(({ name }) => ([
            'zrange',
            name,
            0,
            0,
        ])));
        const types = await redisClient.sendPipeline(res.map(([, member]) => (['type', member[0]])), { replyEncoding: 'utf8' });
        const keyIndex = types.findIndex(([, type]) => type === dto_1.RedisDataType.JSON || type === dto_1.RedisDataType.Hash);
        return keyIndex === -1 ? undefined : sortedSets[keyIndex].name;
    }
    async determineRTSRecommendation(redisClient, keys) {
        try {
            let processedKeysNumber = 0;
            let timeSeriesKey = null;
            let sortedSetNumber = 0;
            while (processedKeysNumber < keys.length
                && !timeSeriesKey
                && sortedSetNumber <= constants_2.RTS_KEYS_FOR_CHECK) {
                if (keys[processedKeysNumber].type !== dto_1.RedisDataType.ZSet) {
                    processedKeysNumber += 1;
                }
                else {
                    const [, membersArray] = await redisClient.sendCommand(['zscan', keys[processedKeysNumber].name, '0', 'COUNT', 2], { replyEncoding: 'utf8' });
                    if ((0, utils_1.checkTimestamp)(membersArray[0]) || (0, utils_1.checkTimestamp)(membersArray[1].toString())) {
                        timeSeriesKey = keys[processedKeysNumber].name;
                    }
                    processedKeysNumber += 1;
                    sortedSetNumber += 1;
                }
            }
            return timeSeriesKey ? { name: constants_1.RECOMMENDATION_NAMES.RTS, params: { keys: [timeSeriesKey] } } : null;
        }
        catch (err) {
            this.logger.error('Can not determine RTS recommendation', err);
            return null;
        }
    }
    async determineLuaToFunctionsRecommendation(redisClient, libraries) {
        if (libraries === null || libraries === void 0 ? void 0 : libraries.length) {
            return null;
        }
        try {
            const info = (0, utils_1.convertRedisInfoReplyToObject)(await redisClient.sendCommand(['info', 'memory'], { replyEncoding: 'utf8' }));
            const nodesNumbersOfCachedScripts = (0, lodash_1.get)(info, 'memory.number_of_cached_scripts');
            return parseInt(nodesNumbersOfCachedScripts, 10) > constants_2.LUA_TO_FUNCTIONS_RECOMMENDATION_COUNT
                ? { name: constants_1.RECOMMENDATION_NAMES.LUA_TO_FUNCTIONS }
                : null;
        }
        catch (err) {
            this.logger.error('Can not determine Lua to functions recommendation', err);
            return null;
        }
    }
    async determineFunctionsWithKeyspaceRecommendation(redisClient, libraries) {
        if (libraries === null || libraries === void 0 ? void 0 : libraries.length) {
            return null;
        }
        try {
            const info = await redisClient.sendCommand(['CONFIG', 'GET', 'notify-keyspace-events'], { replyEncoding: 'utf8' });
            return (0, utils_1.checkKeyspaceNotification)(info[1])
                ? { name: constants_1.RECOMMENDATION_NAMES.FUNCTIONS_WITH_KEYSPACE }
                : null;
        }
        catch (err) {
            this.logger.error('Can not determine functions with keyspace recommendation', err);
            return null;
        }
    }
    async determineFunctionsWithStreamsRecommendation(keys, libraries) {
        if (libraries === null || libraries === void 0 ? void 0 : libraries.length) {
            return null;
        }
        try {
            const isStreamKey = keys.some((key) => key.type === dto_1.RedisDataType.Stream);
            return isStreamKey
                ? { name: constants_1.RECOMMENDATION_NAMES.FUNCTIONS_WITH_STREAMS }
                : null;
        }
        catch (err) {
            this.logger.error('Can not determine functions with streams recommendation', err);
            return null;
        }
    }
};
RecommendationProvider = __decorate([
    (0, common_1.Injectable)()
], RecommendationProvider);
exports.RecommendationProvider = RecommendationProvider;
