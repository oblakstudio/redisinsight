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
exports.GetStringInfoDto = void 0;
const dto_1 = require("../../keys/dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const decorators_1 = require("../../../../common/decorators");
class GetStringInfoDto extends dto_1.KeyDto {
    constructor() {
        super(...arguments);
        this.start = 0;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start of string',
        type: Number,
        default: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ always: true }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GetStringInfoDto.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End of string',
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ always: true }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(1),
    (0, decorators_1.IsBiggerThan)('start'),
    __metadata("design:type", Number)
], GetStringInfoDto.prototype, "end", void 0);
exports.GetStringInfoDto = GetStringInfoDto;
