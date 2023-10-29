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
exports.DatabaseAnalysis = void 0;
const nsp_summary_1 = require("./nsp-summary");
const key_1 = require("./key");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const simple_summary_1 = require("./simple-summary");
const swagger_1 = require("@nestjs/swagger");
const scan_filter_1 = require("./scan-filter");
const analysis_progress_1 = require("./analysis-progress");
const sum_group_1 = require("./sum-group");
const recommendation_1 = require("./recommendation");
class DatabaseAnalysis {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Analysis id',
        type: String,
        default: '76dd5654-814b-4e49-9c72-b236f50891f4',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatabaseAnalysis.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database id',
        type: String,
        default: '76dd5654-814b-4e49-9c72-b236f50891f4',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatabaseAnalysis.prototype, "databaseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filters for scan operation',
        type: () => scan_filter_1.ScanFilter,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => scan_filter_1.ScanFilter),
    __metadata("design:type", scan_filter_1.ScanFilter)
], DatabaseAnalysis.prototype, "filter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Namespace delimiter',
        type: String,
        default: ':',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatabaseAnalysis.prototype, "delimiter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Analysis progress',
        type: () => analysis_progress_1.AnalysisProgress,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => analysis_progress_1.AnalysisProgress),
    __metadata("design:type", analysis_progress_1.AnalysisProgress)
], DatabaseAnalysis.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Analysis created date (ISO string)',
        type: Date,
        default: '2022-09-16T06:29:20.000Z',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], DatabaseAnalysis.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total keys with details by types',
        type: () => simple_summary_1.SimpleSummary,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => simple_summary_1.SimpleSummary),
    __metadata("design:type", simple_summary_1.SimpleSummary)
], DatabaseAnalysis.prototype, "totalKeys", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total memory with details by types',
        type: () => simple_summary_1.SimpleSummary,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => simple_summary_1.SimpleSummary),
    __metadata("design:type", simple_summary_1.SimpleSummary)
], DatabaseAnalysis.prototype, "totalMemory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Top namespaces by keys number',
        type: () => nsp_summary_1.NspSummary,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => nsp_summary_1.NspSummary),
    __metadata("design:type", Array)
], DatabaseAnalysis.prototype, "topKeysNsp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Top namespaces by memory',
        type: () => nsp_summary_1.NspSummary,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => nsp_summary_1.NspSummary),
    __metadata("design:type", Array)
], DatabaseAnalysis.prototype, "topMemoryNsp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Top keys by key length (string length, list elements count, etc.)',
        isArray: true,
        type: () => key_1.Key,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => key_1.Key),
    __metadata("design:type", Array)
], DatabaseAnalysis.prototype, "topKeysLength", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Top keys by memory used',
        isArray: true,
        type: () => key_1.Key,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => key_1.Key),
    __metadata("design:type", Array)
], DatabaseAnalysis.prototype, "topKeysMemory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Expiration groups',
        isArray: true,
        type: () => sum_group_1.SumGroup,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => sum_group_1.SumGroup),
    __metadata("design:type", Array)
], DatabaseAnalysis.prototype, "expirationGroups", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Recommendations',
        isArray: true,
        type: () => recommendation_1.Recommendation,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => recommendation_1.Recommendation),
    __metadata("design:type", Array)
], DatabaseAnalysis.prototype, "recommendations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Logical database number.',
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DatabaseAnalysis.prototype, "db", void 0);
exports.DatabaseAnalysis = DatabaseAnalysis;
