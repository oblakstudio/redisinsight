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
exports.CloudSubscription = exports.CloudSubscriptionType = exports.CloudSubscriptionStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
var CloudSubscriptionStatus;
(function (CloudSubscriptionStatus) {
    CloudSubscriptionStatus["Active"] = "active";
    CloudSubscriptionStatus["NotActivated"] = "not_activated";
    CloudSubscriptionStatus["Deleting"] = "deleting";
    CloudSubscriptionStatus["Pending"] = "pending";
    CloudSubscriptionStatus["Error"] = "error";
})(CloudSubscriptionStatus = exports.CloudSubscriptionStatus || (exports.CloudSubscriptionStatus = {}));
var CloudSubscriptionType;
(function (CloudSubscriptionType) {
    CloudSubscriptionType["Flexible"] = "flexible";
    CloudSubscriptionType["Fixed"] = "fixed";
})(CloudSubscriptionType = exports.CloudSubscriptionType || (exports.CloudSubscriptionType = {}));
class CloudSubscription {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subscription id',
        type: Number,
    }),
    __metadata("design:type", Number)
], CloudSubscription.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subscription name',
        type: String,
    }),
    __metadata("design:type", String)
], CloudSubscription.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subscription type',
        enum: CloudSubscriptionType,
    }),
    __metadata("design:type", String)
], CloudSubscription.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of databases in subscription',
        type: Number,
    }),
    __metadata("design:type", Number)
], CloudSubscription.prototype, "numberOfDatabases", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subscription status',
        enum: CloudSubscriptionStatus,
        default: CloudSubscriptionStatus.Active,
    }),
    __metadata("design:type", String)
], CloudSubscription.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Subscription provider',
        type: String,
    }),
    __metadata("design:type", String)
], CloudSubscription.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Subscription region',
        type: String,
    }),
    __metadata("design:type", String)
], CloudSubscription.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Subscription price',
        type: Number,
    }),
    __metadata("design:type", Number)
], CloudSubscription.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Determines if subscription is 0 price',
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], CloudSubscription.prototype, "free", void 0);
exports.CloudSubscription = CloudSubscription;
