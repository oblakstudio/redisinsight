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
exports.DeleteListElementsResponse = exports.GetListElementResponse = exports.GetListElementsResponse = exports.DeleteListElementsDto = exports.GetListElementsDto = exports.CreateListWithExpireDto = exports.SetListElementResponse = exports.SetListElementDto = exports.PushListElementsResponse = exports.PushElementToListDto = exports.ListElementDestination = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const decorators_1 = require("../../../common/decorators");
const keys_dto_1 = require("./keys.dto");
var ListElementDestination;
(function (ListElementDestination) {
    ListElementDestination["Tail"] = "TAIL";
    ListElementDestination["Head"] = "HEAD";
})(ListElementDestination = exports.ListElementDestination || (exports.ListElementDestination = {}));
class PushElementToListDto extends keys_dto_1.KeyDto {
    constructor() {
        super(...arguments);
        this.destination = ListElementDestination.Tail;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List element',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, decorators_1.IsRedisString)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], PushElementToListDto.prototype, "element", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'In order to append elements to the end of the list, '
            + 'use the TAIL value, to prepend use HEAD value. '
            + 'Default: TAIL (when not specified)',
        default: ListElementDestination.Tail,
        enum: ListElementDestination,
    }),
    (0, class_validator_1.IsEnum)(ListElementDestination, {
        message: `destination must be a valid enum value. Valid values: ${Object.values(ListElementDestination)}.`,
    }),
    __metadata("design:type", String)
], PushElementToListDto.prototype, "destination", void 0);
exports.PushElementToListDto = PushElementToListDto;
class PushListElementsResponse extends keys_dto_1.KeyResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of elements in the list after current operation.',
    }),
    __metadata("design:type", Number)
], PushListElementsResponse.prototype, "total", void 0);
exports.PushListElementsResponse = PushListElementsResponse;
class SetListElementDto extends keys_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List element',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, decorators_1.IsRedisString)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], SetListElementDto.prototype, "element", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Element index',
        type: Number,
        minimum: 0,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsInt)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SetListElementDto.prototype, "index", void 0);
exports.SetListElementDto = SetListElementDto;
class SetListElementResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Element index',
        type: Number,
        minimum: 0,
    }),
    __metadata("design:type", Number)
], SetListElementResponse.prototype, "index", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List element',
        type: String,
    }),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], SetListElementResponse.prototype, "element", void 0);
exports.SetListElementResponse = SetListElementResponse;
class CreateListWithExpireDto extends (0, swagger_1.IntersectionType)(PushElementToListDto, keys_dto_1.KeyWithExpireDto) {
}
exports.CreateListWithExpireDto = CreateListWithExpireDto;
class GetListElementsDto extends keys_dto_1.KeyDto {
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
], GetListElementsDto.prototype, "offset", void 0);
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
], GetListElementsDto.prototype, "count", void 0);
exports.GetListElementsDto = GetListElementsDto;
class DeleteListElementsDto extends keys_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'In order to remove last elements of the list, use the TAIL value, else HEAD value',
        default: ListElementDestination.Tail,
        enum: ListElementDestination,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEnum)(ListElementDestination, {
        message: `destination must be a valid enum value. Valid values: ${Object.values(ListElementDestination)}.`,
    }),
    __metadata("design:type", String)
], DeleteListElementsDto.prototype, "destination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Specifying the number of elements to remove from list.',
        type: Number,
        minimum: 1,
        default: 1,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], DeleteListElementsDto.prototype, "count", void 0);
exports.DeleteListElementsDto = DeleteListElementsDto;
class GetListElementsResponse extends keys_dto_1.KeyResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of elements in the currently-selected list.',
    }),
    __metadata("design:type", Number)
], GetListElementsResponse.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => String,
        description: 'Array of elements.',
        isArray: true,
    }),
    (0, decorators_1.RedisStringType)({ each: true }),
    __metadata("design:type", Array)
], GetListElementsResponse.prototype, "elements", void 0);
exports.GetListElementsResponse = GetListElementsResponse;
class GetListElementResponse extends keys_dto_1.KeyResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => String,
        description: 'Element value',
    }),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], GetListElementResponse.prototype, "value", void 0);
exports.GetListElementResponse = GetListElementResponse;
class DeleteListElementsResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        isArray: true,
        description: 'Removed elements from list',
    }),
    (0, decorators_1.RedisStringType)({ each: true }),
    __metadata("design:type", Array)
], DeleteListElementsResponse.prototype, "elements", void 0);
exports.DeleteListElementsResponse = DeleteListElementsResponse;
