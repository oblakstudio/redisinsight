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
exports.CloudCapiKey = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CloudCapiKey {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CloudCapiKey.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CloudCapiKey.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Autogenerated name of capi key (Redisinsight-<RI id>-<ISO date of creation>',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CloudCapiKey.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CloudCapiKey.prototype, "cloudAccountId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CloudCapiKey.prototype, "cloudUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CloudCapiKey.prototype, "capiKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CloudCapiKey.prototype, "capiSecret", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], CloudCapiKey.prototype, "valid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CloudCapiKey.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CloudCapiKey.prototype, "lastUsed", void 0);
exports.CloudCapiKey = CloudCapiKey;