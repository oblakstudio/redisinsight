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
exports.RecommendationProvider = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../constants");
const database_service_1 = require("../../database/database.service");
const strategies_1 = require("./strategies");
let RecommendationProvider = class RecommendationProvider {
    constructor(databaseService) {
        this.logger = new common_1.Logger('ZSetTypeInfoStrategy');
        this.strategies = new Map();
        this.strategies.set('default', new strategies_1.DefaultRecommendationStrategy());
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.REDIS_VERSION, new strategies_1.RedisVersionStrategy());
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.SEARCH_JSON, new strategies_1.SearchJSONStrategy(databaseService));
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.BIG_SETS, new strategies_1.BigSetStrategy());
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.RTS, new strategies_1.RTSStrategy());
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.AVOID_LOGICAL_DATABASES, new strategies_1.AvoidLogicalDatabasesStrategy());
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.BIG_HASHES, new strategies_1.ShardHashStrategy());
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.STRING_TO_JSON, new strategies_1.StringToJsonStrategy());
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.SEARCH_VISUALIZATION, new strategies_1.SearchVisualizationStrategy());
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.USE_SMALLER_KEYS, new strategies_1.UseSmallerKeysStrategy());
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.LUA_SCRIPT, new strategies_1.AvoidLuaScriptsStrategy());
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.BIG_STRINGS, new strategies_1.BigStringStrategy());
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.COMPRESSION_FOR_LIST, new strategies_1.CompressionForListStrategy());
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.BIG_AMOUNT_OF_CONNECTED_CLIENTS, new strategies_1.BigAmountConnectedClientsStrategy());
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.FUNCTIONS_WITH_STREAMS, new strategies_1.FunctionsWithStreamsStrategy(databaseService));
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.LUA_TO_FUNCTIONS, new strategies_1.LuaToFunctionsStrategy(databaseService));
        this.strategies.set(constants_1.RECOMMENDATION_NAMES.FUNCTIONS_WITH_KEYSPACE, new strategies_1.FunctionsWithKeyspaceStrategy(databaseService));
    }
    getStrategy(type) {
        this.logger.log(`Getting ${type} recommendation strategy.`);
        const strategy = this.strategies.get(type);
        if (!strategy) {
            this.logger.error(`Failed to get ${type} recommendation strategy.`);
            return this.strategies.get('default');
        }
        return strategy;
    }
};
RecommendationProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], RecommendationProvider);
exports.RecommendationProvider = RecommendationProvider;
