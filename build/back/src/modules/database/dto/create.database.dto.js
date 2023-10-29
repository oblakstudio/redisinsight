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
exports.CreateDatabaseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const database_1 = require("../models/database");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_client_certificate_dto_1 = require("../../certificate/dto/create.client-certificate.dto");
const create_ca_certificate_dto_1 = require("../../certificate/dto/create.ca-certificate.dto");
const use_ca_certificate_dto_1 = require("../../certificate/dto/use.ca-certificate.dto");
const use_client_certificate_dto_1 = require("../../certificate/dto/use.client-certificate.dto");
const ca_cert_transformer_1 = require("../../certificate/transformers/ca-cert.transformer");
const client_cert_transformer_1 = require("../../certificate/transformers/client-cert.transformer");
const create_basic_ssh_options_dto_1 = require("../../ssh/dto/create.basic-ssh-options.dto");
const create_cert_ssh_options_dto_1 = require("../../ssh/dto/create.cert-ssh-options.dto");
const ssh_options_transformer_1 = require("../../ssh/transformers/ssh-options.transformer");
const cloud_database_details_1 = require("../../cloud/database/models/cloud-database-details");
let CreateDatabaseDto = class CreateDatabaseDto extends (0, swagger_1.PickType)(database_1.Database, [
    'host', 'port', 'name', 'db', 'username', 'password', 'timeout', 'nameFromProvider', 'provider',
    'tls', 'tlsServername', 'verifyServerCert', 'sentinelMaster', 'ssh', 'compressor', 'cloudDetails',
]) {
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'CA Certificate',
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(create_ca_certificate_dto_1.CreateCaCertificateDto) },
            { $ref: (0, swagger_1.getSchemaPath)(use_ca_certificate_dto_1.UseCaCertificateDto) },
        ],
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(ca_cert_transformer_1.caCertTransformer),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], CreateDatabaseDto.prototype, "caCert", void 0);
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
], CreateDatabaseDto.prototype, "clientCert", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'SSH Options',
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(create_basic_ssh_options_dto_1.CreateBasicSshOptionsDto) },
            { $ref: (0, swagger_1.getSchemaPath)(create_cert_ssh_options_dto_1.CreateCertSshOptionsDto) },
        ],
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(ssh_options_transformer_1.sshOptionsTransformer),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], CreateDatabaseDto.prototype, "sshOptions", void 0);
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
], CreateDatabaseDto.prototype, "cloudDetails", void 0);
CreateDatabaseDto = __decorate([
    (0, swagger_1.ApiExtraModels)(create_ca_certificate_dto_1.CreateCaCertificateDto, use_ca_certificate_dto_1.UseCaCertificateDto, create_client_certificate_dto_1.CreateClientCertificateDto, use_client_certificate_dto_1.UseClientCertificateDto, create_basic_ssh_options_dto_1.CreateBasicSshOptionsDto, create_cert_ssh_options_dto_1.CreateCertSshOptionsDto)
], CreateDatabaseDto);
exports.CreateDatabaseDto = CreateDatabaseDto;
