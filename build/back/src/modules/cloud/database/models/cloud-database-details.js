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
exports.CloudDatabaseDetails = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const cloud_subscription_1 = require("../../subscription/models/cloud-subscription");
class CloudDatabaseDetails {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database id from the cloud',
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)({ always: true }),
    __metadata("design:type", Number)
], CloudDatabaseDetails.prototype, "cloudId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subscription type',
        enum: () => cloud_subscription_1.CloudSubscriptionType,
        example: cloud_subscription_1.CloudSubscriptionType.Flexible,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(cloud_subscription_1.CloudSubscriptionType, {
        message: `subscriptionType must be a valid enum value. Valid values: ${Object.values(cloud_subscription_1.CloudSubscriptionType)}.`,
    }),
    __metadata("design:type", String)
], CloudDatabaseDetails.prototype, "subscriptionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Plan memory limit',
        type: Number,
        example: 256,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CloudDatabaseDetails.prototype, "planMemoryLimit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Memory limit units',
        type: String,
        example: 'MB',
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CloudDatabaseDetails.prototype, "memoryLimitMeasurementUnit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Is free database',
        type: Boolean,
        example: false,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CloudDatabaseDetails.prototype, "free", void 0);
exports.CloudDatabaseDetails = CloudDatabaseDetails;
