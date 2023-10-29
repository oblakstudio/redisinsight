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
exports.CloudSubscriptionPlan = exports.CloudSubscriptionPlanProvider = void 0;
const swagger_1 = require("@nestjs/swagger");
const cloud_subscription_1 = require("./cloud-subscription");
var CloudSubscriptionPlanProvider;
(function (CloudSubscriptionPlanProvider) {
    CloudSubscriptionPlanProvider["AWS"] = "AWS";
    CloudSubscriptionPlanProvider["GCP"] = "GCP";
    CloudSubscriptionPlanProvider["Azure"] = "Azure";
})(CloudSubscriptionPlanProvider = exports.CloudSubscriptionPlanProvider || (exports.CloudSubscriptionPlanProvider = {}));
class CloudSubscriptionPlan {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
    }),
    __metadata("design:type", Number)
], CloudSubscriptionPlan.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
    }),
    __metadata("design:type", Number)
], CloudSubscriptionPlan.prototype, "regionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subscription type',
        enum: cloud_subscription_1.CloudSubscriptionType,
    }),
    __metadata("design:type", String)
], CloudSubscriptionPlan.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], CloudSubscriptionPlan.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], CloudSubscriptionPlan.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
    }),
    __metadata("design:type", String)
], CloudSubscriptionPlan.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
    }),
    __metadata("design:type", Number)
], CloudSubscriptionPlan.prototype, "price", void 0);
exports.CloudSubscriptionPlan = CloudSubscriptionPlan;
