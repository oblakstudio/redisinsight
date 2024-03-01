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
exports.GetRejsonRlResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const safe_rejson_rl_data_dto_1 = require("./safe.rejson-rl-data.dto");
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
        type: () => safe_rejson_rl_data_dto_1.SafeRejsonRlDataDto,
        isArray: true,
    }),
    __metadata("design:type", Object)
], GetRejsonRlResponseDto.prototype, "data", void 0);
exports.GetRejsonRlResponseDto = GetRejsonRlResponseDto;
