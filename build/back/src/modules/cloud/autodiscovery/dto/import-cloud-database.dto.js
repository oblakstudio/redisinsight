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
exports.ImportCloudDatabaseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const models_1 = require("../../subscription/models");
class ImportCloudDatabaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subscription id',
        type: Number,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)({ always: true }),
    __metadata("design:type", Number)
], ImportCloudDatabaseDto.prototype, "subscriptionId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(models_1.CloudSubscriptionType, {
        message: `subscriptionType must be a valid enum value. Valid values: ${Object.values(models_1.CloudSubscriptionType)}.`,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ImportCloudDatabaseDto.prototype, "subscriptionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database id',
        type: Number,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)({ always: true }),
    __metadata("design:type", Number)
], ImportCloudDatabaseDto.prototype, "databaseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ImportCloudDatabaseDto.prototype, "free", void 0);
exports.ImportCloudDatabaseDto = ImportCloudDatabaseDto;
