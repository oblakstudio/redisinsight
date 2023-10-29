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
exports.ModifyDatabaseRecommendationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const models_1 = require("../models");
class ModifyDatabaseRecommendationDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Recommendation vote',
        default: null,
        enum: models_1.Vote,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(models_1.Vote, {
        message: `vote must be a valid enum value. Valid values: ${Object.values(models_1.Vote)}.`,
    }),
    __metadata("design:type", String)
], ModifyDatabaseRecommendationDto.prototype, "vote", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Hide recommendation',
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ModifyDatabaseRecommendationDto.prototype, "hide", void 0);
exports.ModifyDatabaseRecommendationDto = ModifyDatabaseRecommendationDto;
