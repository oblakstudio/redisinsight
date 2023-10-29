"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const recommendation_provider_1 = require("./providers/recommendation.provider");
const constants_1 = require("../../constants");
let RecommendationService = class RecommendationService {
    constructor(recommendationProvider) {
        this.recommendationProvider = recommendationProvider;
    }
    async getRecommendations(dto) {
        const { client, keys, info, total, globalClient, exclude, indexes, libraries, } = dto;
        const recommendations = new Map([
            [
                constants_1.RECOMMENDATION_NAMES.LUA_SCRIPT,
                async () => await this.recommendationProvider.determineLuaScriptRecommendation(client),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.BIG_HASHES,
                async () => await this.recommendationProvider.determineBigHashesRecommendation(keys),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.USE_SMALLER_KEYS,
                async () => await this.recommendationProvider.determineBigTotalRecommendation(total),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.AVOID_LOGICAL_DATABASES,
                async () => await this.recommendationProvider.determineLogicalDatabasesRecommendation(client),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.COMBINE_SMALL_STRINGS_TO_HASHES,
                async () => await this.recommendationProvider.determineCombineSmallStringsToHashesRecommendation(keys),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.INCREASE_SET_MAX_INTSET_ENTRIES,
                async () => await this.recommendationProvider.determineIncreaseSetMaxIntsetEntriesRecommendation(client, keys),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.HASH_HASHTABLE_TO_ZIPLIST,
                async () => await this.recommendationProvider.determineHashHashtableToZiplistRecommendation(client, keys),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.COMPRESS_HASH_FIELD_NAMES,
                () => null,
            ],
            [
                constants_1.RECOMMENDATION_NAMES.COMPRESSION_FOR_LIST,
                async () => await this.recommendationProvider.determineCompressionForListRecommendation(keys),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.BIG_STRINGS,
                async () => await this.recommendationProvider.determineBigStringsRecommendation(keys),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.ZSET_HASHTABLE_TO_ZIPLIST,
                async () => await this.recommendationProvider.determineZSetHashtableToZiplistRecommendation(client, keys),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.BIG_SETS,
                async () => await this.recommendationProvider.determineBigSetsRecommendation(keys),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.BIG_AMOUNT_OF_CONNECTED_CLIENTS,
                async () => await this.recommendationProvider.determineConnectionClientsRecommendation(client),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.RTS,
                async () => await this.recommendationProvider.determineRTSRecommendation(client, keys),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.REDIS_VERSION,
                async () => await this.recommendationProvider.determineRedisVersionRecommendation(client),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.SEARCH_INDEXES,
                async () => await this.recommendationProvider.determineSearchIndexesRecommendation(client, keys, globalClient),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.SET_PASSWORD,
                async () => await this.recommendationProvider.determineSetPasswordRecommendation(client),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.SEARCH_HASH,
                async () => await this.recommendationProvider.determineSearchHashRecommendation(keys, indexes),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.LUA_TO_FUNCTIONS,
                async () => await this.recommendationProvider.determineLuaToFunctionsRecommendation(client, libraries),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.FUNCTIONS_WITH_KEYSPACE,
                async () => await this.recommendationProvider.determineFunctionsWithKeyspaceRecommendation(client, libraries),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.FUNCTIONS_WITH_STREAMS,
                async () => await this.recommendationProvider
                    .determineFunctionsWithStreamsRecommendation(keys, libraries),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.STRING_TO_JSON,
                () => null,
            ],
            [
                constants_1.RECOMMENDATION_NAMES.SEARCH_JSON,
                async () => await this.recommendationProvider.determineSearchJSONRecommendation(keys, indexes),
            ],
            [
                constants_1.RECOMMENDATION_NAMES.SEARCH_VISUALIZATION,
                () => null,
            ],
        ]);
        const recommendationsToDetermine = (0, lodash_1.difference)(Object.values(constants_1.RECOMMENDATION_NAMES), exclude);
        return (Promise.all(recommendationsToDetermine.map((recommendation) => recommendations.get(recommendation)())));
    }
};
RecommendationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [recommendation_provider_1.RecommendationProvider])
], RecommendationService);
exports.RecommendationService = RecommendationService;
