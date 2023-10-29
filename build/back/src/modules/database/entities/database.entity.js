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
exports.DatabaseEntity = exports.Compressor = exports.ConnectionType = exports.HostingProvider = void 0;
const typeorm_1 = require("typeorm");
const ca_certificate_entity_1 = require("../../certificate/entities/ca-certificate.entity");
const client_certificate_entity_1 = require("../../certificate/entities/client-certificate.entity");
const decorators_1 = require("../../../common/decorators");
const class_transformer_1 = require("class-transformer");
const sentinel_master_1 = require("../../redis-sentinel/models/sentinel-master");
const ssh_options_entity_1 = require("../../ssh/entities/ssh-options.entity");
const cloud_database_details_entity_1 = require("../../cloud/database/entities/cloud-database-details.entity");
var HostingProvider;
(function (HostingProvider) {
    HostingProvider["UNKNOWN"] = "UNKNOWN";
    HostingProvider["LOCALHOST"] = "LOCALHOST";
    HostingProvider["RE_CLUSTER"] = "RE_CLUSTER";
    HostingProvider["RE_CLOUD"] = "RE_CLOUD";
    HostingProvider["AZURE"] = "AZURE";
    HostingProvider["AWS"] = "AWS";
    HostingProvider["GOOGLE"] = "GOOGLE";
})(HostingProvider = exports.HostingProvider || (exports.HostingProvider = {}));
var ConnectionType;
(function (ConnectionType) {
    ConnectionType["STANDALONE"] = "STANDALONE";
    ConnectionType["CLUSTER"] = "CLUSTER";
    ConnectionType["SENTINEL"] = "SENTINEL";
    ConnectionType["NOT_CONNECTED"] = "NOT CONNECTED";
})(ConnectionType = exports.ConnectionType || (exports.ConnectionType = {}));
var Compressor;
(function (Compressor) {
    Compressor["NONE"] = "NONE";
    Compressor["GZIP"] = "GZIP";
    Compressor["ZSTD"] = "ZSTD";
    Compressor["LZ4"] = "LZ4";
    Compressor["SNAPPY"] = "SNAPPY";
    Compressor["Brotli"] = "Brotli";
    Compressor["PHPGZCompress"] = "PHPGZCompress";
})(Compressor = exports.Compressor || (exports.Compressor = {}));
let DatabaseEntity = class DatabaseEntity {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "host", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], DatabaseEntity.prototype, "port", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], DatabaseEntity.prototype, "db", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], DatabaseEntity.prototype, "timeout", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Transform)((_, model) => {
        var _a;
        return ((_a = model === null || model === void 0 ? void 0 : model.sentinelMaster) === null || _a === void 0 ? void 0 : _a.name);
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "sentinelMasterName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Transform)((_, model) => {
        var _a;
        return ((_a = model === null || model === void 0 ? void 0 : model.sentinelMaster) === null || _a === void 0 ? void 0 : _a.username);
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "sentinelMasterUsername", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Transform)((_, model) => {
        var _a;
        return ((_a = model === null || model === void 0 ? void 0 : model.sentinelMaster) === null || _a === void 0 ? void 0 : _a.password);
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "sentinelMasterPassword", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)((_, entity) => {
        if (entity === null || entity === void 0 ? void 0 : entity.sentinelMasterName) {
            return {
                name: entity === null || entity === void 0 ? void 0 : entity.sentinelMasterName,
                username: entity === null || entity === void 0 ? void 0 : entity.sentinelMasterUsername,
                password: entity === null || entity === void 0 ? void 0 : entity.sentinelMasterPassword,
            };
        }
        return undefined;
    }, { toPlainOnly: true }),
    (0, class_transformer_1.Transform)(() => undefined, { toClassOnly: true }),
    __metadata("design:type", sentinel_master_1.SentinelMaster)
], DatabaseEntity.prototype, "sentinelMaster", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], DatabaseEntity.prototype, "tls", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "tlsServername", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], DatabaseEntity.prototype, "verifyServerCert", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.ManyToOne)(() => ca_certificate_entity_1.CaCertificateEntity, (caCertificate) => caCertificate.databases, {
        eager: true,
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", ca_certificate_entity_1.CaCertificateEntity)
], DatabaseEntity.prototype, "caCert", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.ManyToOne)(() => client_certificate_entity_1.ClientCertificateEntity, (clientCertificate) => clientCertificate.databases, {
        eager: true,
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", client_certificate_entity_1.ClientCertificateEntity)
], DatabaseEntity.prototype, "clientCert", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({
        nullable: false,
        default: ConnectionType.STANDALONE,
    }),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "connectionType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "nameFromProvider", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true, default: '[]' }),
    (0, decorators_1.DataAsJsonString)(),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "nodes", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], DatabaseEntity.prototype, "lastConnection", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({
        nullable: true,
        default: HostingProvider.UNKNOWN,
    }),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "provider", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: false, default: '[]' }),
    (0, decorators_1.DataAsJsonString)(),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "modules", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "encryption", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], DatabaseEntity.prototype, "new", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], DatabaseEntity.prototype, "ssh", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.OneToOne)(() => ssh_options_entity_1.SshOptionsEntity, (sshOptions) => sshOptions.database, {
        eager: true,
        onDelete: 'CASCADE',
        cascade: true,
    }),
    (0, class_transformer_1.Type)(() => ssh_options_entity_1.SshOptionsEntity),
    __metadata("design:type", ssh_options_entity_1.SshOptionsEntity)
], DatabaseEntity.prototype, "sshOptions", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.OneToOne)(() => cloud_database_details_entity_1.CloudDatabaseDetailsEntity, (cloudDetails) => cloudDetails.database, {
        eager: true,
        onDelete: 'CASCADE',
        cascade: true,
    }),
    (0, class_transformer_1.Type)(() => cloud_database_details_entity_1.CloudDatabaseDetailsEntity),
    __metadata("design:type", cloud_database_details_entity_1.CloudDatabaseDetailsEntity)
], DatabaseEntity.prototype, "cloudDetails", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({
        nullable: false,
        default: Compressor.NONE,
    }),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "compressor", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DatabaseEntity.prototype, "version", void 0);
DatabaseEntity = __decorate([
    (0, typeorm_1.Entity)('database_instance')
], DatabaseEntity);
exports.DatabaseEntity = DatabaseEntity;
