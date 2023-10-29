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
exports.DeleteFieldsFromHashResponse = exports.DeleteFieldsFromHashDto = exports.GetHashFieldsResponse = exports.HashScanResponse = exports.GetHashFieldsDto = exports.CreateHashWithExpireDto = exports.AddFieldsToHashDto = exports.HashFieldDto = void 0;
const keys_dto_1 = require("./keys.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const decorators_1 = require("../../../common/decorators");
class HashFieldDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Field',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, decorators_1.IsRedisString)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], HashFieldDto.prototype, "field", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Field',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, decorators_1.IsRedisString)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], HashFieldDto.prototype, "value", void 0);
exports.HashFieldDto = HashFieldDto;
class AddFieldsToHashDto extends keys_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hash fields',
        isArray: true,
        type: HashFieldDto,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => HashFieldDto),
    __metadata("design:type", Array)
], AddFieldsToHashDto.prototype, "fields", void 0);
exports.AddFieldsToHashDto = AddFieldsToHashDto;
class CreateHashWithExpireDto extends (0, swagger_1.IntersectionType)(AddFieldsToHashDto, keys_dto_1.KeyWithExpireDto) {
}
exports.CreateHashWithExpireDto = CreateHashWithExpireDto;
class GetHashFieldsDto extends keys_dto_1.ScanDataTypeDto {
}
exports.GetHashFieldsDto = GetHashFieldsDto;
class HashScanResponse extends keys_dto_1.KeyResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        minimum: 0,
        description: 'The new cursor to use in the next call.'
            + ' If the property has value of 0, then the iteration is completed.',
    }),
    __metadata("design:type", Number)
], HashScanResponse.prototype, "nextCursor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => HashFieldDto,
        description: 'Array of members.',
        isArray: true,
    }),
    __metadata("design:type", Array)
], HashScanResponse.prototype, "fields", void 0);
exports.HashScanResponse = HashScanResponse;
class GetHashFieldsResponse extends HashScanResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of fields in the currently-selected hash.',
    }),
    __metadata("design:type", Number)
], GetHashFieldsResponse.prototype, "total", void 0);
exports.GetHashFieldsResponse = GetHashFieldsResponse;
class DeleteFieldsFromHashDto extends keys_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hash fields',
        type: String,
        isArray: true,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, decorators_1.IsRedisString)({ each: true }),
    (0, decorators_1.RedisStringType)({ each: true }),
    __metadata("design:type", Array)
], DeleteFieldsFromHashDto.prototype, "fields", void 0);
exports.DeleteFieldsFromHashDto = DeleteFieldsFromHashDto;
class DeleteFieldsFromHashResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of affected fields',
        type: Number,
    }),
    __metadata("design:type", Number)
], DeleteFieldsFromHashResponse.prototype, "affected", void 0);
exports.DeleteFieldsFromHashResponse = DeleteFieldsFromHashResponse;
