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
exports.DatabaseAnalysisService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const recommendation_service_1 = require("../recommendation/recommendation.service");
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
const database_analyzer_1 = require("./providers/database-analyzer");
const class_transformer_1 = require("class-transformer");
const models_1 = require("./models");
const database_analysis_provider_1 = require("./providers/database-analysis.provider");
const keys_scanner_1 = require("./scanner/keys-scanner");
const database_recommendation_service_1 = require("../database-recommendation/database-recommendation.service");
const database_client_factory_1 = require("../database/providers/database.client.factory");
let DatabaseAnalysisService = class DatabaseAnalysisService {
    constructor(databaseClientFactory, recommendationService, analyzer, databaseAnalysisProvider, scanner, databaseRecommendationService) {
        this.databaseClientFactory = databaseClientFactory;
        this.recommendationService = recommendationService;
        this.analyzer = analyzer;
        this.databaseAnalysisProvider = databaseAnalysisProvider;
        this.scanner = scanner;
        this.databaseRecommendationService = databaseRecommendationService;
        this.logger = new common_1.Logger('DatabaseAnalysisService');
    }
    async create(clientMetadata, dto) {
        let client;
        try {
            client = await this.databaseClientFactory.createClient(clientMetadata);
            const scanResults = await this.scanner.scan(client, {
                filter: dto.filter,
            });
            const progress = {
                total: 0,
                scanned: 0,
                processed: 0,
            };
            scanResults.forEach((nodeResult) => {
                progress.scanned += nodeResult.progress.scanned;
                progress.processed += nodeResult.progress.processed;
                progress.total += nodeResult.progress.total;
            });
            let recommendationToExclude = [];
            const recommendations = await scanResults.reduce(async (previousPromise, nodeResult, idx) => {
                const jobsArray = await previousPromise;
                const nodeRecommendations = await this.recommendationService.getRecommendations({
                    client: nodeResult.client,
                    keys: nodeResult.keys,
                    indexes: nodeResult.indexes,
                    libraries: nodeResult.libraries,
                    total: progress.total,
                    globalClient: client,
                    exclude: recommendationToExclude,
                });
                if (idx === 0) {
                    recommendationToExclude = (0, lodash_1.concat)(recommendationToExclude, constants_1.ONE_NODE_RECOMMENDATIONS);
                }
                const foundedRecommendations = nodeRecommendations.filter((recommendation) => !(0, lodash_1.isNull)(recommendation));
                const foundedRecommendationNames = foundedRecommendations.map(({ name }) => name);
                recommendationToExclude = (0, lodash_1.concat)(recommendationToExclude, foundedRecommendationNames);
                recommendationToExclude.push(...foundedRecommendationNames);
                jobsArray.push(foundedRecommendations);
                return (0, lodash_1.flatten)(jobsArray);
            }, Promise.resolve([]));
            const analysis = (0, class_transformer_1.plainToClass)(models_1.DatabaseAnalysis, await this.analyzer.analyze({
                databaseId: clientMetadata.databaseId,
                db: await (client === null || client === void 0 ? void 0 : client.getCurrentDbIndex()),
                ...dto,
                progress,
                recommendations,
            }, [].concat(...scanResults.map((nodeResult) => nodeResult.keys))));
            client.disconnect();
            this.databaseRecommendationService.sync(clientMetadata, recommendations);
            return this.databaseAnalysisProvider.create(analysis);
        }
        catch (e) {
            client === null || client === void 0 ? void 0 : client.disconnect();
            this.logger.error('Unable to analyze database', e);
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async get(id) {
        return this.databaseAnalysisProvider.get(id);
    }
    async list(databaseId) {
        return this.databaseAnalysisProvider.list(databaseId);
    }
    async vote(id, recommendation) {
        return this.databaseAnalysisProvider.recommendationVote(id, recommendation);
    }
};
DatabaseAnalysisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory,
        recommendation_service_1.RecommendationService,
        database_analyzer_1.DatabaseAnalyzer,
        database_analysis_provider_1.DatabaseAnalysisProvider,
        keys_scanner_1.KeysScanner,
        database_recommendation_service_1.DatabaseRecommendationService])
], DatabaseAnalysisService);
exports.DatabaseAnalysisService = DatabaseAnalysisService;
