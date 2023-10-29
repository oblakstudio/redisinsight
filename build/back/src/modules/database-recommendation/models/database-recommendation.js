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
exports.DatabaseRecommendation = exports.Vote = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var Vote;
(function (Vote) {
    Vote["DoubleLike"] = "very useful";
    Vote["Like"] = "useful";
    Vote["Dislike"] = "not useful";
})(Vote = exports.Vote || (exports.Vote = {}));
class DatabaseRecommendation {
    constructor() {
        this.vote = null;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Recommendation id',
        type: String,
        example: 'id',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatabaseRecommendation.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Recommendation name',
        type: String,
        example: 'luaScript',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatabaseRecommendation.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database ID to which recommendation belongs',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatabaseRecommendation.prototype, "databaseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Determines if recommendation was shown to user',
        type: Boolean,
        example: false,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ always: true }),
    __metadata("design:type", Boolean)
], DatabaseRecommendation.prototype, "read", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Should this recommendation shown to user',
        type: Boolean,
        example: false,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DatabaseRecommendation.prototype, "disabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Recommendation vote',
        default: Vote.Like,
        enum: Vote,
    }),
    (0, class_validator_1.IsEnum)(Vote),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatabaseRecommendation.prototype, "vote", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Should this recommendation hidden',
        type: Boolean,
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], DatabaseRecommendation.prototype, "hide", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional recommendation params',
        isArray: true,
        type: () => String,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], DatabaseRecommendation.prototype, "params", void 0);
exports.DatabaseRecommendation = DatabaseRecommendation;
