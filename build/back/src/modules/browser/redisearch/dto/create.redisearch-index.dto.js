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
exports.CreateRedisearchIndexDto = exports.CreateRedisearchIndexFieldDto = exports.RedisearchIndexDataType = exports.RedisearchIndexKeyType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../common/decorators");
const class_transformer_1 = require("class-transformer");
var RedisearchIndexKeyType;
(function (RedisearchIndexKeyType) {
    RedisearchIndexKeyType["HASH"] = "hash";
    RedisearchIndexKeyType["JSON"] = "json";
})(RedisearchIndexKeyType = exports.RedisearchIndexKeyType || (exports.RedisearchIndexKeyType = {}));
var RedisearchIndexDataType;
(function (RedisearchIndexDataType) {
    RedisearchIndexDataType["TEXT"] = "text";
    RedisearchIndexDataType["TAG"] = "tag";
    RedisearchIndexDataType["NUMERIC"] = "numeric";
    RedisearchIndexDataType["GEO"] = "geo";
    RedisearchIndexDataType["GEOSHAPE"] = "geoshape";
    RedisearchIndexDataType["VECTOR"] = "vector";
})(RedisearchIndexDataType = exports.RedisearchIndexDataType || (exports.RedisearchIndexDataType = {}));
class CreateRedisearchIndexFieldDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of field to be indexed',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, decorators_1.RedisStringType)(),
    (0, decorators_1.IsRedisString)(),
    __metadata("design:type", Object)
], CreateRedisearchIndexFieldDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of how data must be indexed',
        enum: RedisearchIndexDataType,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEnum)(RedisearchIndexDataType, {
        message: `type must be a valid enum value. Valid values: ${Object.values(RedisearchIndexDataType)}.`,
    }),
    __metadata("design:type", String)
], CreateRedisearchIndexFieldDto.prototype, "type", void 0);
exports.CreateRedisearchIndexFieldDto = CreateRedisearchIndexFieldDto;
class CreateRedisearchIndexDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Index Name',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, decorators_1.RedisStringType)(),
    (0, decorators_1.IsRedisString)(),
    __metadata("design:type", Object)
], CreateRedisearchIndexDto.prototype, "index", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of keys to index',
        enum: RedisearchIndexKeyType,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEnum)(RedisearchIndexKeyType, {
        message: `type must be a valid enum value. Valid values: ${Object.values(RedisearchIndexKeyType)}.`,
    }),
    __metadata("design:type", String)
], CreateRedisearchIndexDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Keys prefixes to find keys for index',
        isArray: true,
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, decorators_1.RedisStringType)({ each: true }),
    (0, decorators_1.IsRedisString)({ each: true }),
    __metadata("design:type", Array)
], CreateRedisearchIndexDto.prototype, "prefixes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fields to index',
        isArray: true,
        type: CreateRedisearchIndexFieldDto,
    }),
    (0, class_transformer_1.Type)(() => CreateRedisearchIndexFieldDto),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], CreateRedisearchIndexDto.prototype, "fields", void 0);
exports.CreateRedisearchIndexDto = CreateRedisearchIndexDto;
