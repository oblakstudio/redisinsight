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
exports.GetKeysWithDetailsResponse = exports.GetKeyInfoResponse = exports.KeyTtlResponse = exports.UpdateKeyTtlDto = exports.RenameKeyResponse = exports.RenameKeyDto = exports.DeleteKeysResponse = exports.DeleteKeysDto = exports.GetKeyInfoDto = exports.GetKeysInfoDto = exports.GetKeysDto = exports.ScanDataTypeDto = exports.KeyWithExpireDto = exports.KeyResponse = exports.KeyDto = exports.RedisDataType = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const redis_keys_1 = require("../../../constants/redis-keys");
const decorators_1 = require("../../../common/decorators");
var RedisDataType;
(function (RedisDataType) {
    RedisDataType["String"] = "string";
    RedisDataType["Hash"] = "hash";
    RedisDataType["List"] = "list";
    RedisDataType["Set"] = "set";
    RedisDataType["ZSet"] = "zset";
    RedisDataType["Stream"] = "stream";
    RedisDataType["JSON"] = "ReJSON-RL";
    RedisDataType["Graph"] = "graphdata";
    RedisDataType["TS"] = "TSDB-TYPE";
})(RedisDataType = exports.RedisDataType || (exports.RedisDataType = {}));
class KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Key Name',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, decorators_1.IsRedisString)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], KeyDto.prototype, "keyName", void 0);
exports.KeyDto = KeyDto;
class KeyResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Key Name',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, decorators_1.IsRedisString)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], KeyResponse.prototype, "keyName", void 0);
exports.KeyResponse = KeyResponse;
class KeyWithExpireDto extends KeyDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: 'Set a timeout on key in seconds. After the timeout has expired, the key will automatically be deleted.',
        minimum: 1,
        maximum: redis_keys_1.MAX_TTL_NUMBER,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ always: true }),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(redis_keys_1.MAX_TTL_NUMBER),
    __metadata("design:type", Number)
], KeyWithExpireDto.prototype, "expire", void 0);
exports.KeyWithExpireDto = KeyWithExpireDto;
class ScanDataTypeDto extends KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Iteration cursor. '
            + 'An iteration starts when the cursor is set to 0, and terminates when the cursor returned by the server is 0.',
        type: Number,
        minimum: 0,
        default: 0,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ScanDataTypeDto.prototype, "cursor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Specifying the number of elements to return.',
        type: Number,
        minimum: 1,
        default: 15,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ScanDataTypeDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Iterate only elements matching a given pattern.',
        type: String,
        default: '*',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScanDataTypeDto.prototype, "match", void 0);
exports.ScanDataTypeDto = ScanDataTypeDto;
class GetKeysDto {
    constructor() {
        this.keysInfo = true;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Iteration cursor. '
            + 'An iteration starts when the cursor is set to 0, and terminates when the cursor returned by the server is 0.',
        type: String,
        default: '0',
    }),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetKeysDto.prototype, "cursor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Specifying the number of elements to return.',
        type: Number,
        minimum: 1,
        default: 15,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetKeysDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Iterate only elements matching a given pattern.',
        type: String,
        default: '*',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetKeysDto.prototype, "match", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Iterate through the database looking for keys of a specific type.',
        enum: RedisDataType,
    }),
    (0, class_validator_1.IsEnum)(RedisDataType, {
        message: `destination must be a valid enum value. Valid values: ${Object.values(RedisDataType)}.`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetKeysDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fetch keys info (type, size, ttl, length)',
        type: Boolean,
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((val) => val === true || val === 'true'),
    __metadata("design:type", Boolean)
], GetKeysDto.prototype, "keysInfo", void 0);
exports.GetKeysDto = GetKeysDto;
class GetKeysInfoDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of keys',
        type: String,
        isArray: true,
        example: ['keys', 'key2'],
    }),
    (0, class_validator_1.IsDefined)(),
    (0, decorators_1.IsRedisString)({ each: true }),
    (0, decorators_1.RedisStringType)({ each: true }),
    __metadata("design:type", Array)
], GetKeysInfoDto.prototype, "keys", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Iterate through the database looking for keys of a specific type.',
        enum: RedisDataType,
        example: RedisDataType.Hash,
    }),
    (0, class_validator_1.IsEnum)(RedisDataType, {
        message: `destination must be a valid enum value. Valid values: ${Object.values(RedisDataType)}.`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetKeysInfoDto.prototype, "type", void 0);
exports.GetKeysInfoDto = GetKeysInfoDto;
class GetKeyInfoDto extends KeyDto {
}
exports.GetKeyInfoDto = GetKeyInfoDto;
class DeleteKeysDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Key name',
        type: String,
        isArray: true,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, decorators_1.RedisStringType)({ each: true }),
    (0, decorators_1.IsRedisString)({ each: true }),
    __metadata("design:type", Array)
], DeleteKeysDto.prototype, "keyNames", void 0);
exports.DeleteKeysDto = DeleteKeysDto;
class DeleteKeysResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of affected keys',
        type: Number,
    }),
    __metadata("design:type", Number)
], DeleteKeysResponse.prototype, "affected", void 0);
exports.DeleteKeysResponse = DeleteKeysResponse;
class RenameKeyDto extends KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'New key name',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, decorators_1.IsRedisString)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], RenameKeyDto.prototype, "newKeyName", void 0);
exports.RenameKeyDto = RenameKeyDto;
class RenameKeyResponse extends KeyResponse {
}
exports.RenameKeyResponse = RenameKeyResponse;
class UpdateKeyTtlDto extends KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Set a timeout on key in seconds. After the timeout has expired, the key will automatically be deleted. '
            + 'If the property has value of -1, then the key timeout will be removed.',
        maximum: redis_keys_1.MAX_TTL_NUMBER,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)({ always: true }),
    (0, class_validator_1.Max)(redis_keys_1.MAX_TTL_NUMBER),
    __metadata("design:type", Number)
], UpdateKeyTtlDto.prototype, "ttl", void 0);
exports.UpdateKeyTtlDto = UpdateKeyTtlDto;
class KeyTtlResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The remaining time to live of a key that has a timeout. '
            + 'If value equals -2 then the key does not exist or has deleted. '
            + 'If value equals -1 then the key has no associated expire (No limit).',
        maximum: redis_keys_1.MAX_TTL_NUMBER,
    }),
    __metadata("design:type", Number)
], KeyTtlResponse.prototype, "ttl", void 0);
exports.KeyTtlResponse = KeyTtlResponse;
class GetKeyInfoResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], GetKeyInfoResponse.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], GetKeyInfoResponse.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The remaining time to live of a key.'
            + ' If the property has value of -1, then the key has no expiration time (no limit).',
    }),
    __metadata("design:type", Number)
], GetKeyInfoResponse.prototype, "ttl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of bytes that a key and its value require to be stored in RAM.',
    }),
    __metadata("design:type", Number)
], GetKeyInfoResponse.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: 'The length of the value stored in a key.',
    }),
    __metadata("design:type", Number)
], GetKeyInfoResponse.prototype, "length", void 0);
exports.GetKeyInfoResponse = GetKeyInfoResponse;
class GetKeysWithDetailsResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        default: 0,
        description: 'The new cursor to use in the next call.'
            + ' If the property has value of 0, then the iteration is completed.',
    }),
    __metadata("design:type", Number)
], GetKeysWithDetailsResponse.prototype, "cursor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of keys in the currently-selected database.',
    }),
    __metadata("design:type", Number)
], GetKeysWithDetailsResponse.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of keys we tried to scan. Be aware that '
            + 'scanned is sum of COUNT parameters from redis commands',
    }),
    __metadata("design:type", Number)
], GetKeysWithDetailsResponse.prototype, "scanned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => GetKeyInfoResponse,
        description: 'Array of Keys.',
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => GetKeyInfoResponse),
    __metadata("design:type", Array)
], GetKeysWithDetailsResponse.prototype, "keys", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'Node host. In case when we are working with cluster',
    }),
    __metadata("design:type", String)
], GetKeysWithDetailsResponse.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: 'Node port. In case when we are working with cluster',
    }),
    __metadata("design:type", Number)
], GetKeysWithDetailsResponse.prototype, "port", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: 'The maximum number of results.'
            + ' For RediSearch this number is a value from "FT.CONFIG GET maxsearchresults" command.'
    }),
    __metadata("design:type", Number)
], GetKeysWithDetailsResponse.prototype, "maxResults", void 0);
exports.GetKeysWithDetailsResponse = GetKeysWithDetailsResponse;
