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
exports.KeyWithExpireDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../../constants");
const class_validator_1 = require("class-validator");
const key_dto_1 = require("./key.dto");
class KeyWithExpireDto extends key_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: 'Set a timeout on key in seconds. After the timeout has expired, the key will automatically be deleted.',
        minimum: 1,
        maximum: constants_1.MAX_TTL_NUMBER,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ always: true }),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(constants_1.MAX_TTL_NUMBER),
    __metadata("design:type", Number)
], KeyWithExpireDto.prototype, "expire", void 0);
exports.KeyWithExpireDto = KeyWithExpireDto;
