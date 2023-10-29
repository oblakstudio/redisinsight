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
exports.RedisDatabaseModuleDto = exports.RedisDatabaseInfoResponse = exports.RedisNodeInfoResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class RedisNodeInfoResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Redis database version',
        type: String,
    }),
    __metadata("design:type", String)
], RedisNodeInfoResponse.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Value is "master" if the instance is replica of no one, '
            + 'or "slave" if the instance is a replica of some master instance',
        enum: ['master', 'slave'],
        default: 'master',
    }),
    __metadata("design:type", String)
], RedisNodeInfoResponse.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Redis database info from server section',
        type: Object,
    }),
    __metadata("design:type", Object)
], RedisNodeInfoResponse.prototype, "server", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The number of Redis databases',
        type: Number,
        default: 16,
    }),
    __metadata("design:type", Number)
], RedisNodeInfoResponse.prototype, "databases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Total number of bytes allocated by Redis using',
        type: Number,
    }),
    __metadata("design:type", Number)
], RedisNodeInfoResponse.prototype, "usedMemory", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Total number of keys inside Redis database',
        type: Number,
    }),
    __metadata("design:type", Number)
], RedisNodeInfoResponse.prototype, "totalKeys", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of client connections (excluding connections from replicas)',
        type: Number,
    }),
    __metadata("design:type", Number)
], RedisNodeInfoResponse.prototype, "connectedClients", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of seconds since Redis server start',
        type: Number,
    }),
    __metadata("design:type", Number)
], RedisNodeInfoResponse.prototype, "uptimeInSeconds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The cache hit ratio represents the efficiency of cache usage',
        type: Number,
    }),
    __metadata("design:type", Number)
], RedisNodeInfoResponse.prototype, "hitRatio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The number of the cached lua scripts',
        type: Number,
    }),
    __metadata("design:type", Number)
], RedisNodeInfoResponse.prototype, "cashedScripts", void 0);
exports.RedisNodeInfoResponse = RedisNodeInfoResponse;
class RedisDatabaseInfoResponse extends RedisNodeInfoResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Redis database version',
        type: String,
    }),
    __metadata("design:type", String)
], RedisDatabaseInfoResponse.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Nodes info',
        type: RedisNodeInfoResponse,
        isArray: true,
    }),
    __metadata("design:type", Array)
], RedisDatabaseInfoResponse.prototype, "nodes", void 0);
exports.RedisDatabaseInfoResponse = RedisDatabaseInfoResponse;
class RedisDatabaseModuleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Redis module name',
        type: String,
    }),
    __metadata("design:type", String)
], RedisDatabaseModuleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Redis module version',
        type: Number,
        isArray: true,
    }),
    __metadata("design:type", Number)
], RedisDatabaseModuleDto.prototype, "ver", void 0);
exports.RedisDatabaseModuleDto = RedisDatabaseModuleDto;
