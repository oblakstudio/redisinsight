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
exports.RootCustomTutorialManifest = exports.CustomTutorialManifest = exports.CustomTutorialManifestArgs = exports.CustomTutorialManifestType = void 0;
const custom_tutorial_1 = require("./custom-tutorial");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var CustomTutorialManifestType;
(function (CustomTutorialManifestType) {
    CustomTutorialManifestType["CodeButton"] = "code-button";
    CustomTutorialManifestType["Group"] = "group";
    CustomTutorialManifestType["InternalLink"] = "internal-link";
})(CustomTutorialManifestType = exports.CustomTutorialManifestType || (exports.CustomTutorialManifestType = {}));
class CustomTutorialManifestArgs {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CustomTutorialManifestArgs.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CustomTutorialManifestArgs.prototype, "initialIsOpen", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CustomTutorialManifestArgs.prototype, "withBorder", void 0);
exports.CustomTutorialManifestArgs = CustomTutorialManifestArgs;
class CustomTutorialManifest {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CustomTutorialManifest.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: CustomTutorialManifestType }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(CustomTutorialManifestType, {
        message: `type must be a valid enum value. Valid values: ${Object.values(CustomTutorialManifestType)}.`,
    }),
    __metadata("design:type", String)
], CustomTutorialManifest.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CustomTutorialManifest.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CustomTutorialManifest.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: CustomTutorialManifestArgs }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CustomTutorialManifestArgs),
    __metadata("design:type", CustomTutorialManifestArgs)
], CustomTutorialManifest.prototype, "args", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: CustomTutorialManifest }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => CustomTutorialManifest),
    __metadata("design:type", Array)
], CustomTutorialManifest.prototype, "children", void 0);
exports.CustomTutorialManifest = CustomTutorialManifest;
class RootCustomTutorialManifest extends CustomTutorialManifest {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: custom_tutorial_1.CustomTutorialActions }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(custom_tutorial_1.CustomTutorialActions, { each: true }),
    __metadata("design:type", Array)
], RootCustomTutorialManifest.prototype, "_actions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RootCustomTutorialManifest.prototype, "_path", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    __metadata("design:type", Array)
], RootCustomTutorialManifest.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RootCustomTutorialManifest.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RootCustomTutorialManifest.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    __metadata("design:type", Array)
], RootCustomTutorialManifest.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RootCustomTutorialManifest.prototype, "description", void 0);
exports.RootCustomTutorialManifest = RootCustomTutorialManifest;
