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
exports.PluginsResponse = exports.Plugin = exports.PluginVisualization = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PluginVisualization {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PluginVisualization.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PluginVisualization.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PluginVisualization.prototype, "activationMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        isArray: true,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], PluginVisualization.prototype, "matchCommands", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PluginVisualization.prototype, "default", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PluginVisualization.prototype, "iconDark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PluginVisualization.prototype, "iconLight", void 0);
exports.PluginVisualization = PluginVisualization;
class Plugin {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Determine if plugin is built into Redisinsight',
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], Plugin.prototype, "internal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Module name from manifest',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Plugin.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Plugins base url',
        type: String,
    }),
    __metadata("design:type", String)
], Plugin.prototype, "baseUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Uri to main js file on the local server',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Plugin.prototype, "main", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Uri to css file on the local server',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Plugin.prototype, "styles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Visualization field from manifest',
        type: PluginVisualization,
        isArray: true,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PluginVisualization),
    __metadata("design:type", Array)
], Plugin.prototype, "visualizations", void 0);
exports.Plugin = Plugin;
class PluginsResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Uri to static resources required for plugins',
        type: String,
    }),
    __metadata("design:type", String)
], PluginsResponse.prototype, "static", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of available plugins',
        type: Plugin,
        isArray: true,
    }),
    __metadata("design:type", Array)
], PluginsResponse.prototype, "plugins", void 0);
exports.PluginsResponse = PluginsResponse;
