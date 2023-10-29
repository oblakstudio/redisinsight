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
exports.Recommendation = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class Recommendation {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Recommendation name',
        type: String,
        example: 'luaScript',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Recommendation.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional recommendation params',
        example: 'luaScript',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], Recommendation.prototype, "params", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User vote',
        example: 'useful',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Recommendation.prototype, "vote", void 0);
exports.Recommendation = Recommendation;
