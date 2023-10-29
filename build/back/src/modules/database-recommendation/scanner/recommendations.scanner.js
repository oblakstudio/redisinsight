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
exports.RecommendationScanner = void 0;
const common_1 = require("@nestjs/common");
const recommendation_provider_1 = require("./recommendation.provider");
const feature_service_1 = require("../../feature/feature.service");
const constants_1 = require("../../feature/constants");
let RecommendationScanner = class RecommendationScanner {
    constructor(recommendationProvider, featureService) {
        this.recommendationProvider = recommendationProvider;
        this.featureService = featureService;
    }
    async determineRecommendation(name, data) {
        if (!await this.featureService.isFeatureEnabled(constants_1.KnownFeatures.InsightsRecommendations)) {
            return null;
        }
        const strategy = this.recommendationProvider.getStrategy(name);
        try {
            const recommendation = await strategy.isRecommendationReached(data);
            if (recommendation.isReached) {
                return { name, params: recommendation === null || recommendation === void 0 ? void 0 : recommendation.params };
            }
        }
        catch (err) {
            return null;
        }
        return null;
    }
};
RecommendationScanner = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [recommendation_provider_1.RecommendationProvider,
        feature_service_1.FeatureService])
], RecommendationScanner);
exports.RecommendationScanner = RecommendationScanner;
