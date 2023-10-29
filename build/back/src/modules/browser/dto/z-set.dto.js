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
exports.SearchZSetMembersResponse = exports.ScanZSetResponse = exports.GetZSetResponse = exports.DeleteMembersFromZSetResponse = exports.SearchZSetMembersDto = exports.DeleteMembersFromZSetDto = exports.UpdateMemberInZSetDto = exports.CreateZSetWithExpireDto = exports.AddMembersToZSetDto = exports.ZSetMemberDto = exports.GetZSetMembersDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const constants_1 = require("../../../constants");
const set_dto_1 = require("./set.dto");
const decorators_1 = require("../../../common/decorators");
const keys_dto_1 = require("./keys.dto");
class GetZSetMembersDto extends keys_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Specifying the number of elements to skip.',
        type: Number,
        minimum: 0,
        default: '0',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetZSetMembersDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Specifying the number of elements to return from starting at offset.',
        type: Number,
        minimum: 1,
        default: 15,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetZSetMembersDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Get elements sorted by score.'
            + ' In order to sort the members from the highest to the lowest score, use the DESC value, else ASC value',
        default: constants_1.SortOrder.Desc,
        enum: constants_1.SortOrder,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(constants_1.SortOrder, {
        message: `sortOrder must be a valid enum value. Valid values: ${Object.values(constants_1.SortOrder)}.`,
    }),
    __metadata("design:type", String)
], GetZSetMembersDto.prototype, "sortOrder", void 0);
exports.GetZSetMembersDto = GetZSetMembersDto;
class ZSetMemberDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Member name value.',
    }),
    (0, class_validator_1.IsDefined)(),
    (0, decorators_1.IsRedisString)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], ZSetMemberDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Member score value.',
        type: Number || String,
        default: 1,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, decorators_1.isZSetScore)(),
    __metadata("design:type", Object)
], ZSetMemberDto.prototype, "score", void 0);
exports.ZSetMemberDto = ZSetMemberDto;
class AddMembersToZSetDto extends keys_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ZSet members',
        isArray: true,
        type: ZSetMemberDto,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ZSetMemberDto),
    __metadata("design:type", Array)
], AddMembersToZSetDto.prototype, "members", void 0);
exports.AddMembersToZSetDto = AddMembersToZSetDto;
class CreateZSetWithExpireDto extends (0, swagger_1.IntersectionType)(AddMembersToZSetDto, keys_dto_1.KeyWithExpireDto) {
}
exports.CreateZSetWithExpireDto = CreateZSetWithExpireDto;
class UpdateMemberInZSetDto extends keys_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ZSet member',
        type: ZSetMemberDto,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ZSetMemberDto),
    __metadata("design:type", ZSetMemberDto)
], UpdateMemberInZSetDto.prototype, "member", void 0);
exports.UpdateMemberInZSetDto = UpdateMemberInZSetDto;
class DeleteMembersFromZSetDto extends set_dto_1.DeleteMembersFromSetDto {
}
exports.DeleteMembersFromZSetDto = DeleteMembersFromZSetDto;
class SearchZSetMembersDto extends (0, swagger_1.PickType)(keys_dto_1.ScanDataTypeDto, [
    'keyName',
    'count',
    'cursor',
]) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Iterate only elements matching a given pattern.',
        type: String,
        default: '*',
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchZSetMembersDto.prototype, "match", void 0);
exports.SearchZSetMembersDto = SearchZSetMembersDto;
class DeleteMembersFromZSetResponse extends set_dto_1.DeleteMembersFromSetResponse {
}
exports.DeleteMembersFromZSetResponse = DeleteMembersFromZSetResponse;
class GetZSetResponse extends keys_dto_1.KeyResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of members in the currently-selected z-set.',
    }),
    __metadata("design:type", Number)
], GetZSetResponse.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of Members.',
        isArray: true,
        type: () => ZSetMemberDto,
    }),
    __metadata("design:type", Array)
], GetZSetResponse.prototype, "members", void 0);
exports.GetZSetResponse = GetZSetResponse;
class ScanZSetResponse extends keys_dto_1.KeyResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        minimum: 0,
        description: 'The new cursor to use in the next call.'
            + ' If the property has value of 0, then the iteration is completed.',
    }),
    __metadata("design:type", Number)
], ScanZSetResponse.prototype, "nextCursor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of Members.',
        isArray: true,
        type: () => ZSetMemberDto,
    }),
    __metadata("design:type", Array)
], ScanZSetResponse.prototype, "members", void 0);
exports.ScanZSetResponse = ScanZSetResponse;
class SearchZSetMembersResponse extends ScanZSetResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of members in the currently-selected z-set.',
    }),
    __metadata("design:type", Number)
], SearchZSetMembersResponse.prototype, "total", void 0);
exports.SearchZSetMembersResponse = SearchZSetMembersResponse;
