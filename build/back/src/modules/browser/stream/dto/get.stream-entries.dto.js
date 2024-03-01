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
exports.GetStreamEntriesDto = void 0;
const dto_1 = require("../../keys/dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../../../constants");
class GetStreamEntriesDto extends dto_1.KeyDto {
    constructor() {
        super(...arguments);
        this.start = '-';
        this.end = '+';
        this.count = 500;
        this.sortOrder = constants_1.SortOrder.Desc;
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Specifying the start id',
        type: String,
        default: '-',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetStreamEntriesDto.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Specifying the end id',
        type: String,
        default: '+',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetStreamEntriesDto.prototype, "end", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Specifying the number of entries to return.',
        type: Number,
        minimum: 1,
        default: 500,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetStreamEntriesDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Get entries sort by IDs order.',
        default: constants_1.SortOrder.Desc,
        enum: constants_1.SortOrder,
    }),
    (0, class_validator_1.IsEnum)(constants_1.SortOrder, {
        message: `sortOrder must be a valid enum value. Valid values: ${Object.values(constants_1.SortOrder)}.`,
    }),
    __metadata("design:type", String)
], GetStreamEntriesDto.prototype, "sortOrder", void 0);
exports.GetStreamEntriesDto = GetStreamEntriesDto;
