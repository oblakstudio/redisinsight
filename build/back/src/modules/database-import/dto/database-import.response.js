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
exports.DatabaseImportResponse = exports.DatabaseImportResult = exports.DatabaseImportStatus = void 0;
const lodash_1 = require("lodash");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
var DatabaseImportStatus;
(function (DatabaseImportStatus) {
    DatabaseImportStatus["Success"] = "success";
    DatabaseImportStatus["Partial"] = "partial";
    DatabaseImportStatus["Fail"] = "fail";
})(DatabaseImportStatus = exports.DatabaseImportStatus || (exports.DatabaseImportStatus = {}));
class DatabaseImportResult {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Entry index from original json',
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DatabaseImportResult.prototype, "index", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Import status',
        enum: DatabaseImportStatus,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatabaseImportResult.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Database host',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)((v) => ((0, lodash_1.isString)(v) ? v : undefined), { toPlainOnly: true }),
    __metadata("design:type", String)
], DatabaseImportResult.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Database port',
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)((v) => ((0, lodash_1.isNumber)(v) ? v : undefined), { toPlainOnly: true }),
    __metadata("design:type", Number)
], DatabaseImportResult.prototype, "port", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Error message if any',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)((e) => {
        if (!e) {
            return undefined;
        }
        return e.map((error) => {
            if (error === null || error === void 0 ? void 0 : error.response) {
                return error.response;
            }
            return {
                statusCode: 500,
                message: (error === null || error === void 0 ? void 0 : error.message) || 'Unhandled Error',
                error: 'Unhandled Error',
            };
        });
    }, { toPlainOnly: true }),
    __metadata("design:type", Array)
], DatabaseImportResult.prototype, "errors", void 0);
exports.DatabaseImportResult = DatabaseImportResult;
class DatabaseImportResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total elements processed from the import file',
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DatabaseImportResponse.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of successfully imported database',
        type: DatabaseImportResult,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => DatabaseImportResult),
    __metadata("design:type", Array)
], DatabaseImportResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of partially imported database',
        type: DatabaseImportResult,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => DatabaseImportResult),
    __metadata("design:type", Array)
], DatabaseImportResponse.prototype, "partial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of databases failed to import',
        type: DatabaseImportResult,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => DatabaseImportResult),
    __metadata("design:type", Array)
], DatabaseImportResponse.prototype, "fail", void 0);
exports.DatabaseImportResponse = DatabaseImportResponse;
