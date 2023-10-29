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
exports.FeatureService = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const feature_repository_1 = require("./repositories/feature.repository");
const constants_1 = require("./constants");
const features_config_repository_1 = require("./repositories/features-config.repository");
const feature_flag_provider_1 = require("./providers/feature-flag/feature-flag.provider");
const event_emitter_1 = require("@nestjs/event-emitter");
const feature_analytics_1 = require("./feature.analytics");
const known_features_1 = require("./constants/known-features");
let FeatureService = class FeatureService {
    constructor(repository, featuresConfigRepository, featureFlagProvider, eventEmitter, analytics) {
        this.repository = repository;
        this.featuresConfigRepository = featuresConfigRepository;
        this.featureFlagProvider = featureFlagProvider;
        this.eventEmitter = eventEmitter;
        this.analytics = analytics;
        this.logger = new common_1.Logger('FeaturesConfigService');
    }
    async getByName(name) {
        try {
            return await this.repository.get(name);
        }
        catch (e) {
            return null;
        }
    }
    async isFeatureEnabled(name) {
        try {
            const model = await this.repository.get(name);
            return (model === null || model === void 0 ? void 0 : model.flag) === true;
        }
        catch (e) {
            return false;
        }
    }
    async list() {
        this.logger.log('Getting features list');
        const features = {};
        const featuresFromDatabase = await this.repository.list();
        (0, lodash_1.forEach)(known_features_1.knownFeatures, (feature) => {
            var _a;
            switch (feature === null || feature === void 0 ? void 0 : feature.storage) {
                case constants_1.FeatureStorage.Database: {
                    const dbFeature = (0, lodash_1.find)(featuresFromDatabase, { name: feature.name });
                    if (dbFeature) {
                        features[feature.name] = {
                            name: dbFeature.name,
                            flag: dbFeature.flag,
                            strategy: dbFeature.strategy || undefined,
                            data: dbFeature.data || undefined,
                        };
                    }
                    break;
                }
                case constants_1.FeatureStorage.Custom:
                    features[feature.name] = (_a = feature === null || feature === void 0 ? void 0 : feature.factory) === null || _a === void 0 ? void 0 : _a.call(feature);
                    break;
                default:
            }
        });
        return { features };
    }
    async recalculateFeatureFlags() {
        var _a, _b, _c;
        this.logger.log('Recalculating features flags');
        try {
            const actions = {
                toUpsert: [],
                toDelete: [],
            };
            const featuresFromDatabase = await this.repository.list();
            const featuresConfig = await this.featuresConfigRepository.getOrCreate();
            this.logger.debug('Recalculating features flags for new config', featuresConfig);
            await Promise.all(Array.from(((_a = featuresConfig === null || featuresConfig === void 0 ? void 0 : featuresConfig.data) === null || _a === void 0 ? void 0 : _a.features) || new Map(), async ([name, feature]) => {
                if (known_features_1.knownFeatures[name]) {
                    actions.toUpsert.push({
                        ...(await this.featureFlagProvider.calculate(known_features_1.knownFeatures[name], feature)),
                    });
                }
            }));
            actions.toDelete = featuresFromDatabase.filter((feature) => { var _a, _b, _c; return !((_c = (_b = (_a = featuresConfig === null || featuresConfig === void 0 ? void 0 : featuresConfig.data) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.has) === null || _c === void 0 ? void 0 : _c.call(_b, feature.name)); });
            await Promise.all(actions.toDelete.map((feature) => this.repository.delete(feature)));
            await Promise.all(actions.toUpsert.map((feature) => this.repository.upsert(feature)));
            this.logger.log(`Features flags recalculated. Updated: ${actions.toUpsert.length} deleted: ${actions.toDelete.length}`);
            const list = await this.list();
            this.eventEmitter.emit(constants_1.FeatureServerEvents.FeaturesRecalculated, list);
            try {
                this.analytics.sendFeatureFlagRecalculated({
                    configVersion: (_c = (_b = (await this.featuresConfigRepository.getOrCreate())) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.version,
                    features: list.features,
                });
            }
            catch (e) {
            }
        }
        catch (e) {
            this.logger.error('Unable to recalculate features flags', e);
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.FeatureServerEvents.FeaturesRecalculate),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeatureService.prototype, "recalculateFeatureFlags", null);
FeatureService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [feature_repository_1.FeatureRepository,
        features_config_repository_1.FeaturesConfigRepository,
        feature_flag_provider_1.FeatureFlagProvider,
        event_emitter_1.EventEmitter2,
        feature_analytics_1.FeatureAnalytics])
], FeatureService);
exports.FeatureService = FeatureService;
