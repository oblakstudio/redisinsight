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
exports.UpdateSettingsDto = exports.GetAppSettingsResponse = exports.GetUserAgreementsResponse = exports.GetAgreementsSpecResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const dto_transformer_1 = require("../../../dto/dto-transformer");
const decorators_1 = require("../../../common/decorators");
const config_1 = require("../../../utils/config");
const REDIS_SCAN_CONFIG = config_1.default.get('redis_scan');
const WORKBENCH_CONFIG = config_1.default.get('workbench');
class GetAgreementsSpecResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Version of agreements specification.',
        type: String,
        example: '1.0.0',
    }),
    __metadata("design:type", String)
], GetAgreementsSpecResponse.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Agreements specification.',
        type: Object,
        example: {
            eula: {
                defaultValue: false,
                required: true,
                since: '1.0.0',
                editable: false,
                title: 'License Terms',
                label: 'I have read and understood the License Terms',
            },
        },
    }),
    __metadata("design:type", Object)
], GetAgreementsSpecResponse.prototype, "agreements", void 0);
exports.GetAgreementsSpecResponse = GetAgreementsSpecResponse;
class GetUserAgreementsResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last version on agreements set by the user.',
        type: String,
    }),
    __metadata("design:type", String)
], GetUserAgreementsResponse.prototype, "version", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Boolean)
], GetUserAgreementsResponse.prototype, "encryption", void 0);
exports.GetUserAgreementsResponse = GetUserAgreementsResponse;
class GetAppSettingsResponse {
    constructor() {
        this.theme = null;
        this.scanThreshold = REDIS_SCAN_CONFIG.countThreshold;
        this.batchSize = WORKBENCH_CONFIG.countBatch;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applied application theme.',
        type: String,
        example: 'DARK',
    }),
    (0, class_transformer_1.Expose)(),
    (0, decorators_1.Default)(null),
    __metadata("design:type", String)
], GetAppSettingsResponse.prototype, "theme", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applied the threshold for scan operation.',
        type: Number,
        example: 10000,
    }),
    (0, class_transformer_1.Expose)(),
    (0, decorators_1.Default)(REDIS_SCAN_CONFIG.countThreshold),
    __metadata("design:type", Number)
], GetAppSettingsResponse.prototype, "scanThreshold", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applied the batch of the commands for workbench.',
        type: Number,
        example: 5,
    }),
    (0, class_transformer_1.Expose)(),
    (0, decorators_1.Default)(WORKBENCH_CONFIG.countBatch),
    __metadata("design:type", Number)
], GetAppSettingsResponse.prototype, "batchSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Agreements set by the user.',
        type: GetUserAgreementsResponse,
        example: {
            version: '1.0.0',
            eula: true,
            analytics: true,
            encryption: true,
            notifications: true,
        },
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", GetUserAgreementsResponse)
], GetAppSettingsResponse.prototype, "agreements", void 0);
exports.GetAppSettingsResponse = GetAppSettingsResponse;
class UpdateSettingsDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Application theme.',
        type: String,
        example: 'DARK',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "theme", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Threshold for scan operation.',
        type: Number,
        example: 10000,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ always: true }),
    (0, class_validator_1.Min)(500),
    __metadata("design:type", Number)
], UpdateSettingsDto.prototype, "scanThreshold", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Batch for workbench pipeline.',
        type: Number,
        example: 5,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ always: true }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateSettingsDto.prototype, "batchSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Agreements',
        type: Map,
        example: {
            eula: true,
        },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Map),
    (0, class_validator_1.IsInstance)(Map),
    (0, class_transformer_1.Transform)(dto_transformer_1.pickDefinedAgreements),
    (0, class_validator_1.IsBoolean)({ each: true }),
    __metadata("design:type", Map)
], UpdateSettingsDto.prototype, "agreements", void 0);
exports.UpdateSettingsDto = UpdateSettingsDto;
