"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knownFeatures = void 0;
const index_1 = require("./index");
const cloud_sso_feature_flag_1 = require("../../cloud/cloud-sso.feature.flag");
exports.knownFeatures = {
    [index_1.KnownFeatures.InsightsRecommendations]: {
        name: index_1.KnownFeatures.InsightsRecommendations,
        storage: index_1.FeatureStorage.Database,
    },
    [index_1.KnownFeatures.CloudSso]: {
        name: index_1.KnownFeatures.CloudSso,
        storage: index_1.FeatureStorage.Database,
        factory: cloud_sso_feature_flag_1.CloudSsoFeatureFlag.getFeature,
    },
    [index_1.KnownFeatures.CloudSsoRecommendedSettings]: {
        name: index_1.KnownFeatures.CloudSsoRecommendedSettings,
        storage: index_1.FeatureStorage.Database,
    },
    [index_1.KnownFeatures.RedisModuleFilter]: {
        name: index_1.KnownFeatures.RedisModuleFilter,
        storage: index_1.FeatureStorage.Database,
    },
    [index_1.KnownFeatures.RedisClient]: {
        name: index_1.KnownFeatures.RedisClient,
        storage: index_1.FeatureStorage.Database,
    },
};
