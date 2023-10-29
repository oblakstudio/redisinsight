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
exports.Function = exports.FunctionType = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const lodash_1 = require("lodash");
const swagger_1 = require("@nestjs/swagger");
var FunctionType;
(function (FunctionType) {
    FunctionType["Function"] = "functions";
    FunctionType["ClusterFunction"] = "cluster_functions";
    FunctionType["KeyspaceTrigger"] = "keyspace_triggers";
    FunctionType["StreamTrigger"] = "stream_triggers";
})(FunctionType = exports.FunctionType || (exports.FunctionType = {}));
class Function {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Function type',
        enum: FunctionType,
    }),
    (0, class_validator_1.IsEnum)(FunctionType),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Function.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Function name',
        type: String,
        example: 'name',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Function.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Library name',
        type: String,
        example: 'lib',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Function.prototype, "library", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Total succeed function',
        type: Number,
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], Function.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Total failed function',
        type: Number,
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], Function.prototype, "fail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Total trigger function',
        type: Number,
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], Function.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Function flags',
        type: String,
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], Function.prototype, "flags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Is function is async',
        type: Boolean,
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)((val) => ((0, lodash_1.isNumber)(val) ? val === 1 : undefined)),
    __metadata("design:type", Boolean)
], Function.prototype, "isAsync", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Function description',
        type: String,
        example: 'some description',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Function.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Last execution error',
        type: String,
        example: 'error',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Function.prototype, "lastError", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Last function execution time',
        type: Number,
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], Function.prototype, "lastExecutionTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Total execution time',
        type: Number,
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], Function.prototype, "totalExecutionTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Stream prefix',
        type: String,
        example: 'stream',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Function.prototype, "prefix", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether or not to trim the stream',
        type: Boolean,
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((val) => ((0, lodash_1.isNumber)(val) ? val === 1 : undefined)),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], Function.prototype, "trim", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'How many elements can be processed simultaneously',
        type: Number,
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], Function.prototype, "window", void 0);
exports.Function = Function;
