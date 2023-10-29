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
exports.AnalysisProgress = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class AnalysisProgress {
    constructor() {
        this.total = 0;
        this.scanned = 0;
        this.processed = 0;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total keys in the database',
        type: Number,
        example: 10000000,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AnalysisProgress.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total keys scanned for entire database',
        type: Number,
        example: 30000,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AnalysisProgress.prototype, "scanned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total keys processed for entire database. (Filtered keys returned by scan command)',
        type: Number,
        example: 5000,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AnalysisProgress.prototype, "processed", void 0);
exports.AnalysisProgress = AnalysisProgress;
