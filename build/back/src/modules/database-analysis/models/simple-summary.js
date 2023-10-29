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
exports.SimpleSummary = void 0;
const simple_type_summary_1 = require("./simple-type-summary");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class SimpleSummary {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number',
        type: Number,
        example: 10000,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SimpleSummary.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array with totals by type',
        isArray: true,
        type: () => simple_type_summary_1.SimpleTypeSummary,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], SimpleSummary.prototype, "types", void 0);
exports.SimpleSummary = SimpleSummary;
