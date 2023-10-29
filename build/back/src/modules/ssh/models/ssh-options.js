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
exports.SshOptions = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SshOptions {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SshOptions.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The hostname of SSH server',
        type: String,
        default: 'localhost',
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ always: true }),
    __metadata("design:type", String)
], SshOptions.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The port of SSH server',
        type: Number,
        default: 22,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)({ always: true }),
    __metadata("design:type", Number)
], SshOptions.prototype, "port", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'SSH username',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SshOptions.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The SSH password',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SshOptions.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The SSH private key',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SshOptions.prototype, "privateKey", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The SSH passphrase',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SshOptions.prototype, "passphrase", void 0);
exports.SshOptions = SshOptions;
