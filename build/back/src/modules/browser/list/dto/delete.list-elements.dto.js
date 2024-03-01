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
exports.DeleteListElementsDto = void 0;
const dto_1 = require("../../keys/dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const push_element_to_list_dto_1 = require("./push.element-to-list.dto");
class DeleteListElementsDto extends dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'In order to remove last elements of the list, use the TAIL value, else HEAD value',
        default: push_element_to_list_dto_1.ListElementDestination.Tail,
        enum: push_element_to_list_dto_1.ListElementDestination,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEnum)(push_element_to_list_dto_1.ListElementDestination, {
        message: `destination must be a valid enum value. Valid values: ${Object.values(push_element_to_list_dto_1.ListElementDestination)}.`,
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
