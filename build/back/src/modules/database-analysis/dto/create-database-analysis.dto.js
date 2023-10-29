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
exports.CreateDatabaseAnalysisDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const scan_filter_1 = require("../models/scan-filter");
const class_transformer_1 = require("class-transformer");
class CreateDatabaseAnalysisDto {
    constructor() {
        this.delimiter = ':';
        this.filter = new scan_filter_1.ScanFilter();
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Namespace delimiter',
        type: String,
        default: ':',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDatabaseAnalysisDto.prototype, "delimiter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filters for scan operation',
        type: () => scan_filter_1.ScanFilter,
        default: new scan_filter_1.ScanFilter(),
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => scan_filter_1.ScanFilter),
    __metadata("design:type", scan_filter_1.ScanFilter)
], CreateDatabaseAnalysisDto.prototype, "filter", void 0);
exports.CreateDatabaseAnalysisDto = CreateDatabaseAnalysisDto;
