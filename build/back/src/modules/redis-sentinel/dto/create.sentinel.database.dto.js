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
exports.CreateSentinelDatabaseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateSentinelDatabaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name under which the base will be saved in the application.',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateSentinelDatabaseDto.prototype, "alias", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sentinel master group name.',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)({ always: true }),
    __metadata("design:type", String)
], CreateSentinelDatabaseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The username, if your database is ACL enabled, otherwise leave this field empty.',
        type: String,
    }),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSentinelDatabaseDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The password, if any, for your Redis database. '
            + 'If your database doesn’t require a password, leave this field empty.',
        type: String,
    }),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSentinelDatabaseDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Logical database number.',
        type: Number,
        example: 0,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSentinelDatabaseDto.prototype, "db", void 0);
exports.CreateSentinelDatabaseDto = CreateSentinelDatabaseDto;
