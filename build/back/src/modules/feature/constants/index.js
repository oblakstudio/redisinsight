"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnownFeatures = exports.FeatureConfigConfigDestination = exports.FeatureStorage = exports.FeatureEvents = exports.FeatureServerEvents = void 0;
var FeatureServerEvents;
(function (FeatureServerEvents) {
    FeatureServerEvents["FeaturesRecalculate"] = "FeaturesRecalculate";
    FeatureServerEvents["FeaturesRecalculated"] = "FeaturesRecalculated";
})(FeatureServerEvents = exports.FeatureServerEvents || (exports.FeatureServerEvents = {}));
var FeatureEvents;
(function (FeatureEvents) {
    FeatureEvents["Features"] = "features";
})(FeatureEvents = exports.FeatureEvents || (exports.FeatureEvents = {}));
var FeatureStorage;
(function (FeatureStorage) {
    FeatureStorage["Env"] = "env";
    FeatureStorage["Database"] = "database";
    FeatureStorage["Custom"] = "custom";
})(FeatureStorage = exports.FeatureStorage || (exports.FeatureStorage = {}));
var FeatureConfigConfigDestination;
(function (FeatureConfigConfigDestination) {
    FeatureConfigConfigDestination["Default"] = "default";
    FeatureConfigConfigDestination["Remote"] = "remote";
})(FeatureConfigConfigDestination = exports.FeatureConfigConfigDestination || (exports.FeatureConfigConfigDestination = {}));
var KnownFeatures;
(function (KnownFeatures) {
    KnownFeatures["InsightsRecommendations"] = "insightsRecommendations";
    KnownFeatures["CloudSso"] = "cloudSso";
    KnownFeatures["CloudSsoRecommendedSettings"] = "cloudSsoRecommendedSettings";
    KnownFeatures["RedisModuleFilter"] = "redisModuleFilter";
    KnownFeatures["RedisClient"] = "redisClient";
})(KnownFeatures = exports.KnownFeatures || (exports.KnownFeatures = {}));
