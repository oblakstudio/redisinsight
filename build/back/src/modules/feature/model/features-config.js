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
exports.FeaturesConfig = exports.FeaturesConfigData = exports.FeatureConfig = exports.FeatureConfigFilterAnd = exports.FeatureConfigFilterOr = exports.FeatureConfigFilter = exports.FeatureConfigFilterCondition = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../common/decorators");
const transformers_1 = require("../transformers");
var FeatureConfigFilterCondition;
(function (FeatureConfigFilterCondition) {
    FeatureConfigFilterCondition["Eq"] = "eq";
    FeatureConfigFilterCondition["Neq"] = "neq";
    FeatureConfigFilterCondition["Gt"] = "gt";
    FeatureConfigFilterCondition["Gte"] = "gte";
    FeatureConfigFilterCondition["Lt"] = "lt";
    FeatureConfigFilterCondition["Lte"] = "lte";
})(FeatureConfigFilterCondition = exports.FeatureConfigFilterCondition || (exports.FeatureConfigFilterCondition = {}));
class FeatureConfigFilter {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FeatureConfigFilter.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(FeatureConfigFilterCondition),
    __metadata("design:type", String)
], FeatureConfigFilter.prototype, "cond", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], FeatureConfigFilter.prototype, "value", void 0);
exports.FeatureConfigFilter = FeatureConfigFilter;
class FeatureConfigFilterOr {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(transformers_1.featureConfigFilterTransformer),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], FeatureConfigFilterOr.prototype, "or", void 0);
exports.FeatureConfigFilterOr = FeatureConfigFilterOr;
class FeatureConfigFilterAnd {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(transformers_1.featureConfigFilterTransformer),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], FeatureConfigFilterAnd.prototype, "and", void 0);
exports.FeatureConfigFilterAnd = FeatureConfigFilterAnd;
class FeatureConfig {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FeatureConfig.prototype, "flag", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)({ each: true }),
    (0, decorators_1.IsMultiNumber)(),
    __metadata("design:type", Array)
], FeatureConfig.prototype, "perc", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(transformers_1.featureConfigFilterTransformer),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], FeatureConfig.prototype, "filters", void 0);
exports.FeatureConfig = FeatureConfig;
class FeaturesConfigData {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FeaturesConfigData.prototype, "version", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, decorators_1.ObjectAsMap)(FeatureConfig),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Map)
], FeaturesConfigData.prototype, "features", void 0);
exports.FeaturesConfigData = FeaturesConfigData;
class FeaturesConfig {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FeaturesConfig.prototype, "controlNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => FeaturesConfigData),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", FeaturesConfigData)
], FeaturesConfig.prototype, "data", void 0);
exports.FeaturesConfig = FeaturesConfig;
