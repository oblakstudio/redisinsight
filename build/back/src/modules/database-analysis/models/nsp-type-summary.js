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
exports.NspTypeSummary = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class NspTypeSummary {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type name',
        type: String,
        example: 'hash',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], NspTypeSummary.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total memory in bytes inside particular data type',
        type: Number,
        example: 10000,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], NspTypeSummary.prototype, "memory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total keys inside particular data type',
        type: Number,
        example: 10000,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], NspTypeSummary.prototype, "keys", void 0);
exports.NspTypeSummary = NspTypeSummary;
