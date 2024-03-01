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
exports.GetZSetMembersDto = void 0;
const dto_1 = require("../../keys/dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const constants_1 = require("../../../../constants");
class GetZSetMembersDto extends dto_1.KeyDto {
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
