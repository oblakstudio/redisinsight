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
exports.UploadCustomTutorialDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const nestjs_form_data_1 = require("nestjs-form-data");
const decorators_1 = require("../../../common/decorators");
class UploadCustomTutorialDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        format: 'binary',
        description: 'ZIP archive with tutorial static files',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, nestjs_form_data_1.IsFile)(),
    (0, nestjs_form_data_1.HasMimeType)(['application/zip']),
    (0, nestjs_form_data_1.MaxFileSize)(10 * 1024 * 1024),
    __metadata("design:type", nestjs_form_data_1.MemoryStoredFile)
], UploadCustomTutorialDto.prototype, "file", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        description: 'External link to zip archive',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, decorators_1.IsGitHubLink)(),
    __metadata("design:type", String)
], UploadCustomTutorialDto.prototype, "link", void 0);
exports.UploadCustomTutorialDto = UploadCustomTutorialDto;
