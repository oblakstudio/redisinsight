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
exports.SentinelMaster = exports.SentinelMasterStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const models_1 = require("../../../common/models");
var SentinelMasterStatus;
(function (SentinelMasterStatus) {
    SentinelMasterStatus["Active"] = "active";
    SentinelMasterStatus["Down"] = "down";
})(SentinelMasterStatus = exports.SentinelMasterStatus || (exports.SentinelMasterStatus = {}));
class SentinelMaster {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sentinel master group name. Identifies a group of Redis instances composed of a master and one or more slaves.',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SentinelMaster.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sentinel username, if your database is ACL enabled, otherwise leave this field empty.',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SentinelMaster.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The password for your Redis Sentinel master. '
            + 'If your master doesn’t require a password, leave this field empty.',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SentinelMaster.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The hostname of Sentinel master.',
        type: String,
        default: 'localhost',
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SentinelMaster.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The port Sentinel master.',
        type: Number,
        default: 6379,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SentinelMaster.prototype, "port", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sentinel master status',
        enum: SentinelMasterStatus,
        default: SentinelMasterStatus.Active,
    }),
    __metadata("design:type", String)
], SentinelMaster.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The number of slaves.',
        type: Number,
        default: 0,
    }),
    __metadata("design:type", Number)
], SentinelMaster.prototype, "numberOfSlaves", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sentinel master endpoints.',
        type: models_1.Endpoint,
        isArray: true,
    }),
    __metadata("design:type", Array)
], SentinelMaster.prototype, "nodes", void 0);
exports.SentinelMaster = SentinelMaster;
