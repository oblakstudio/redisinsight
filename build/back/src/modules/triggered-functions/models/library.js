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
exports.Library = exports.ShortFunction = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const models_1 = require("./");
const swagger_1 = require("@nestjs/swagger");
class ShortFunction extends (0, swagger_1.PickType)(models_1.Function, ['name', 'type']) {
}
exports.ShortFunction = ShortFunction;
class Library {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Library name',
        type: String,
        example: 'name',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Library.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Library apy version',
        type: String,
        example: '1.0',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Library.prototype, "apiVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User name',
        type: String,
        example: 'default',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Library.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total of pending jobs',
        type: Number,
        example: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], Library.prototype, "pendingJobs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Library configuration',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Library.prototype, "configuration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Library code',
        type: String,
        example: 0,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Library.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of functions with name, type fields',
        isArray: true,
        type: ShortFunction,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ShortFunction),
    __metadata("design:type", Array)
], Library.prototype, "functions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of functions',
        type: Number,
        example: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], Library.prototype, "totalFunctions", void 0);
exports.Library = Library;
