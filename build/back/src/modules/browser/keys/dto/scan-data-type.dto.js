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
exports.ScanDataTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const key_dto_1 = require("./key.dto");
class ScanDataTypeDto extends key_dto_1.KeyDto {
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
