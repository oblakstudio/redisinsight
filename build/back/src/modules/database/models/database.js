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
exports.Database = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const config_1 = require("../../../utils/config");
const ca_certificate_1 = require("../../certificate/models/ca-certificate");
const client_certificate_1 = require("../../certificate/models/client-certificate");
const database_entity_1 = require("../entities/database.entity");
const class_validator_1 = require("class-validator");
const sentinel_master_1 = require("../../redis-sentinel/models/sentinel-master");
const models_1 = require("../../../common/models");
const additional_redis_module_1 = require("./additional.redis.module");
const ssh_options_1 = require("../../ssh/models/ssh-options");
const cloud_database_details_1 = require("../../cloud/database/models/cloud-database-details");
const CONNECTIONS_CONFIG = config_1.default.get('connections');
class Database {
    constructor() {
        this.timeout = CONNECTIONS_CONFIG.timeout;
        this.compressor = database_entity_1.Compressor.NONE;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database id.',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Database.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The hostname of your Redis database, for example redis.acme.com.'
            + ' If your Redis server is running on your local machine, you can enter either 127.0.0.1 or localhost.',
        type: String,
        default: 'localhost',
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ always: true }),
    __metadata("design:type", String)
], Database.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The port your Redis database is available on.',
        type: Number,
        default: 6379,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)({ always: true }),
    __metadata("design:type", Number)
], Database.prototype, "port", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A name for your Redis database.',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], Database.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Logical database number.',
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Database.prototype, "db", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Database username, if your database is ACL enabled, otherwise leave this field empty.',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Database.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The password, if any, for your Redis database. '
            + 'If your database doesn’t require a password, leave this field empty.',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Database.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Connection timeout',
        type: Number,
        default: 30000,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1000),
    (0, class_validator_1.Max)(1000000000),
    (0, class_validator_1.IsInt)({ always: true }),
    __metadata("design:type", Number)
], Database.prototype, "timeout", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Connection Type',
        default: database_entity_1.ConnectionType.STANDALONE,
        enum: database_entity_1.ConnectionType,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(database_entity_1.ConnectionType),
    __metadata("design:type", String)
], Database.prototype, "connectionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The database name from provider',
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Database.prototype, "nameFromProvider", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The redis database hosting provider',
        example: database_entity_1.HostingProvider.RE_CLOUD,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Database.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Time of the last connection to the database.',
        type: String,
        format: 'date-time',
        example: '2021-01-06T12:44:39.000Z',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], Database.prototype, "lastConnection", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Redis OSS Sentinel master group.',
        type: sentinel_master_1.SentinelMaster,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(() => sentinel_master_1.SentinelMaster),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", sentinel_master_1.SentinelMaster)
], Database.prototype, "sentinelMaster", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'OSS Cluster Nodes',
        type: models_1.Endpoint,
        isArray: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => models_1.Endpoint),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], Database.prototype, "nodes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Loaded Redis modules.',
        type: additional_redis_module_1.AdditionalRedisModule,
        isArray: true,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => additional_redis_module_1.AdditionalRedisModule),
    __metadata("design:type", Array)
], Database.prototype, "modules", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Use TLS to connect.',
        type: Boolean,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], Database.prototype, "tls", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'SNI servername',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Database.prototype, "tlsServername", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The certificate returned by the server needs to be verified.',
        type: Boolean,
        default: false,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ always: true }),
    __metadata("design:type", Boolean)
], Database.prototype, "verifyServerCert", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'CA Certificate',
        type: ca_certificate_1.CaCertificate,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(() => ca_certificate_1.CaCertificate),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", ca_certificate_1.CaCertificate)
], Database.prototype, "caCert", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Client Certificate',
        type: client_certificate_1.ClientCertificate,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(() => client_certificate_1.ClientCertificate),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", client_certificate_1.ClientCertificate)
], Database.prototype, "clientCert", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'A new created connection',
        type: Boolean,
        default: false,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ always: true }),
    __metadata("design:type", Boolean)
], Database.prototype, "new", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Use SSH tunnel to connect.',
        type: Boolean,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], Database.prototype, "ssh", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'SSH options',
        type: ssh_options_1.SshOptions,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(() => ssh_options_1.SshOptions),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", ssh_options_1.SshOptions)
], Database.prototype, "sshOptions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Cloud details',
        type: cloud_database_details_1.CloudDatabaseDetails,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(() => cloud_database_details_1.CloudDatabaseDetails),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", cloud_database_details_1.CloudDatabaseDetails)
], Database.prototype, "cloudDetails", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Database compressor',
        default: database_entity_1.Compressor.NONE,
        enum: database_entity_1.Compressor,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(database_entity_1.Compressor, {
        message: `compressor must be a valid enum value. Valid values: ${Object.values(database_entity_1.Compressor)}.`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Database.prototype, "compressor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The version your Redis server',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Database.prototype, "version", void 0);
exports.Database = Database;
