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
exports.AddRedisEnterpriseDatabaseResponse = exports.AddRedisEnterpriseDatabasesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const cluster_dto_1 = require("./cluster.dto");
const models_1 = require("../../../common/models");
class AddRedisEnterpriseDatabasesDto extends cluster_dto_1.ClusterConnectionDetailsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unique IDs of the databases.',
        type: Number,
        isArray: true,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], AddRedisEnterpriseDatabasesDto.prototype, "uids", void 0);
exports.AddRedisEnterpriseDatabasesDto = AddRedisEnterpriseDatabasesDto;
class AddRedisEnterpriseDatabaseResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unique ID of the database',
        type: Number,
    }),
    __metadata("design:type", Number)
], AddRedisEnterpriseDatabaseResponse.prototype, "uid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Add Redis Enterprise database status',
        default: models_1.ActionStatus.Success,
        enum: models_1.ActionStatus,
    }),
    __metadata("design:type", String)
], AddRedisEnterpriseDatabaseResponse.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Message',
        type: String,
    }),
    __metadata("design:type", String)
], AddRedisEnterpriseDatabaseResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The database details.',
        type: cluster_dto_1.RedisEnterpriseDatabase,
    }),
    __metadata("design:type", cluster_dto_1.RedisEnterpriseDatabase)
], AddRedisEnterpriseDatabaseResponse.prototype, "databaseDetails", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Error',
    }),
    __metadata("design:type", Object)
], AddRedisEnterpriseDatabaseResponse.prototype, "error", void 0);
exports.AddRedisEnterpriseDatabaseResponse = AddRedisEnterpriseDatabaseResponse;
