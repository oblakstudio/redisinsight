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
exports.CloudRequestUtm = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../common/decorators");
class CloudRequestUtm {
    constructor() {
        this.source = 'redisinsight';
        this.medium = 'sso';
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        default: 'redisinsight',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, decorators_1.Default)('redisinsight'),
    __metadata("design:type", Object)
], CloudRequestUtm.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, decorators_1.Default)('sso'),
    __metadata("design:type", Object)
], CloudRequestUtm.prototype, "medium", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CloudRequestUtm.prototype, "campaign", void 0);
exports.CloudRequestUtm = CloudRequestUtm;
