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
exports.RedisEnterpriseDatabase = exports.ClusterConnectionDetailsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const redis_enterprise_database_1 = require("../models/redis-enterprise-database");
class ClusterConnectionDetailsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The hostname of your Redis Enterprise.',
        type: String,
        default: 'localhost',
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ always: true }),
    __metadata("design:type", String)
], ClusterConnectionDetailsDto.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The port your Redis Enterprise cluster is available on.',
        type: Number,
        default: 9443,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)({ always: true }),
    __metadata("design:type", Number)
], ClusterConnectionDetailsDto.prototype, "port", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The admin e-mail/username',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ always: true }),
    __metadata("design:type", String)
], ClusterConnectionDetailsDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The admin password',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ always: true }),
    __metadata("design:type", String)
], ClusterConnectionDetailsDto.prototype, "password", void 0);
exports.ClusterConnectionDetailsDto = ClusterConnectionDetailsDto;
class RedisEnterpriseDatabase {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unique ID of the database.',
        type: Number,
    }),
    __metadata("design:type", Number)
], RedisEnterpriseDatabase.prototype, "uid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of database in cluster.',
        type: String,
    }),
    __metadata("design:type", String)
], RedisEnterpriseDatabase.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'DNS name your Redis Enterprise cluster database is available on.',
        type: String,
    }),
    __metadata("design:type", String)
], RedisEnterpriseDatabase.prototype, "dnsName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Address your Redis Enterprise cluster database is available on.',
        type: String,
    }),
    __metadata("design:type", String)
], RedisEnterpriseDatabase.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The port your Redis Enterprise cluster database is available on.',
        type: Number,
    }),
    __metadata("design:type", Number)
], RedisEnterpriseDatabase.prototype, "port", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database status',
        enum: redis_enterprise_database_1.RedisEnterpriseDatabaseStatus,
        default: redis_enterprise_database_1.RedisEnterpriseDatabaseStatus.Active,
    }),
    __metadata("design:type", String)
], RedisEnterpriseDatabase.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Information about the modules loaded to the database',
        type: String,
        isArray: true,
    }),
    __metadata("design:type", Array)
], RedisEnterpriseDatabase.prototype, "modules", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Is TLS mode enabled?',
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], RedisEnterpriseDatabase.prototype, "tls", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional database options',
        type: Object,
    }),
    __metadata("design:type", Object)
], RedisEnterpriseDatabase.prototype, "options", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], RedisEnterpriseDatabase.prototype, "password", void 0);
exports.RedisEnterpriseDatabase = RedisEnterpriseDatabase;
