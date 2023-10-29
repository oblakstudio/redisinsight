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
exports.RemoveRejsonRlResponse = exports.RemoveRejsonRlDto = exports.ModifyRejsonRlArrAppendDto = exports.ModifyRejsonRlSetDto = exports.CreateRejsonRlWithExpireDto = exports.CreateRejsonRlDto = exports.GetRejsonRlResponseDto = exports.SafeRejsonRlDataDtO = exports.GetRejsonRlDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const keys_dto_1 = require("./keys.dto");
const class_validator_1 = require("class-validator");
const validators_1 = require("../../../validators");
class GetRejsonRlDto extends keys_dto_1.KeyDto {
    constructor() {
        super(...arguments);
        this.path = '.';
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'Path to look for data',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetRejsonRlDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
        description: "Don't check for json size and return whole json in path when enabled",
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GetRejsonRlDto.prototype, "forceRetrieve", void 0);
exports.GetRejsonRlDto = GetRejsonRlDto;
var RejsonRlDataType;
(function (RejsonRlDataType) {
    RejsonRlDataType["String"] = "string";
    RejsonRlDataType["Number"] = "number";
    RejsonRlDataType["Integer"] = "integer";
    RejsonRlDataType["Boolean"] = "boolean";
    RejsonRlDataType["Null"] = "null";
    RejsonRlDataType["Array"] = "array";
    RejsonRlDataType["Object"] = "object";
})(RejsonRlDataType || (RejsonRlDataType = {}));
class SafeRejsonRlDataDtO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Key inside json data',
    }),
    __metadata("design:type", String)
], SafeRejsonRlDataDtO.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Path of the json field',
    }),
    __metadata("design:type", String)
], SafeRejsonRlDataDtO.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: 'Number of properties/elements inside field (for object and arrays only)',
    }),
    __metadata("design:type", Number)
], SafeRejsonRlDataDtO.prototype, "cardinality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: RejsonRlDataType,
        description: 'Type of the field',
    }),
    __metadata("design:type", String)
], SafeRejsonRlDataDtO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'Any value',
    }),
    __metadata("design:type", Object)
], SafeRejsonRlDataDtO.prototype, "value", void 0);
exports.SafeRejsonRlDataDtO = SafeRejsonRlDataDtO;
class GetRejsonRlResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: 'Determines if json value was downloaded',
    }),
    __metadata("design:type", Boolean)
], GetRejsonRlResponseDto.prototype, "downloaded", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'Type of data in the requested path',
    }),
    __metadata("design:type", String)
], GetRejsonRlResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'Requested path',
    }),
    __metadata("design:type", String)
], GetRejsonRlResponseDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => SafeRejsonRlDataDtO,
        isArray: true,
    }),
    __metadata("design:type", Object)
], GetRejsonRlResponseDto.prototype, "data", void 0);
exports.GetRejsonRlResponseDto = GetRejsonRlResponseDto;
class CreateRejsonRlDto extends keys_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valid json string',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Validate)(validators_1.SerializedJsonValidator),
    __metadata("design:type", String)
], CreateRejsonRlDto.prototype, "data", void 0);
exports.CreateRejsonRlDto = CreateRejsonRlDto;
class CreateRejsonRlWithExpireDto extends (0, swagger_1.IntersectionType)(CreateRejsonRlDto, keys_dto_1.KeyWithExpireDto) {
}
exports.CreateRejsonRlWithExpireDto = CreateRejsonRlWithExpireDto;
class ModifyRejsonRlSetDto extends keys_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Path of the json field',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ModifyRejsonRlSetDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of valid serialized jsons',
        type: String,
    }),
    (0, class_validator_1.Validate)(validators_1.SerializedJsonValidator),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ModifyRejsonRlSetDto.prototype, "data", void 0);
exports.ModifyRejsonRlSetDto = ModifyRejsonRlSetDto;
class ModifyRejsonRlArrAppendDto extends keys_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Path of the json field',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ModifyRejsonRlArrAppendDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of valid serialized jsons',
        type: String,
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.Validate)(validators_1.SerializedJsonValidator, {
        each: true,
    }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ModifyRejsonRlArrAppendDto.prototype, "data", void 0);
exports.ModifyRejsonRlArrAppendDto = ModifyRejsonRlArrAppendDto;
class RemoveRejsonRlDto extends keys_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Path of the json field',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RemoveRejsonRlDto.prototype, "path", void 0);
exports.RemoveRejsonRlDto = RemoveRejsonRlDto;
class RemoveRejsonRlResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Integer , specifically the number of paths deleted (0 or 1).',
        type: Number,
    }),
    __metadata("design:type", Number)
], RemoveRejsonRlResponse.prototype, "affected", void 0);
exports.RemoveRejsonRlResponse = RemoveRejsonRlResponse;
