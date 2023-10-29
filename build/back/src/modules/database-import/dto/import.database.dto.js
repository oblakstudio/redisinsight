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
exports.ImportDatabaseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const database_1 = require("../../database/models/database");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const ca_cert_transformer_1 = require("../../certificate/transformers/ca-cert.transformer");
const use_ca_certificate_dto_1 = require("../../certificate/dto/use.ca-certificate.dto");
const create_client_certificate_dto_1 = require("../../certificate/dto/create.client-certificate.dto");
const client_cert_transformer_1 = require("../../certificate/transformers/client-cert.transformer");
class ImportDatabaseDto extends (0, swagger_1.PickType)(database_1.Database, [
    'host', 'port', 'name', 'db', 'username', 'password',
    'connectionType', 'tls', 'verifyServerCert', 'sentinelMaster', 'nodes',
    'new', 'ssh', 'sshOptions', 'provider', 'compressor', 'modules',
]) {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)({ always: true }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(65535),
    __metadata("design:type", Number)
], ImportDatabaseDto.prototype, "port", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(ca_cert_transformer_1.caCertTransformer),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], ImportDatabaseDto.prototype, "caCert", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Client Certificate',
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(create_client_certificate_dto_1.CreateClientCertificateDto) },
            { $ref: (0, swagger_1.getSchemaPath)(use_ca_certificate_dto_1.UseCaCertificateDto) },
        ],
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(client_cert_transformer_1.clientCertTransformer),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], ImportDatabaseDto.prototype, "clientCert", void 0);
exports.ImportDatabaseDto = ImportDatabaseDto;
