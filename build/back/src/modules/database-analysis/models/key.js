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
exports.Key = void 0;
const decorators_1 = require("../../../common/decorators");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class Key {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Key name',
        type: String,
        example: 'key1',
    }),
    (0, decorators_1.IsRedisString)(),
    (0, class_transformer_1.Expose)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], Key.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Key type',
        type: String,
        example: 'list',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Key.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Memory used by key in bytes',
        type: Number,
        example: 1000,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], Key.prototype, "memory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of characters, elements, etc. based on type',
        type: Number,
        example: 100,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], Key.prototype, "length", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Key ttl',
        type: Number,
        example: -1,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], Key.prototype, "ttl", void 0);
exports.Key = Key;
