"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureConfigFilterTransformer = void 0;
const lodash_1 = require("lodash");
const class_transformer_1 = require("class-transformer");
const features_config_1 = require("../model/features-config");
const featureConfigFilterTransformer = (value) => (0, lodash_1.map)(value || [], (filter) => {
    let cls = features_config_1.FeatureConfigFilter;
    if ((0, lodash_1.get)(filter, 'and')) {
        cls = features_config_1.FeatureConfigFilterAnd;
    }
    if ((0, lodash_1.get)(filter, 'or')) {
        cls = features_config_1.FeatureConfigFilterOr;
    }
    return (0, class_transformer_1.plainToClass)(cls, filter);
});
exports.featureConfigFilterTransformer = featureConfigFilterTransformer;
