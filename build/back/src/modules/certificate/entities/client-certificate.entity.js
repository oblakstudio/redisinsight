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
exports.ClientCertificateEntity = void 0;
const typeorm_1 = require("typeorm");
const database_entity_1 = require("../../database/entities/database.entity");
const class_transformer_1 = require("class-transformer");
let ClientCertificateEntity = class ClientCertificateEntity {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ClientCertificateEntity.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], ClientCertificateEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ClientCertificateEntity.prototype, "encryption", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ClientCertificateEntity.prototype, "certificate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ClientCertificateEntity.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => database_entity_1.DatabaseEntity, (database) => database.clientCert),
    __metadata("design:type", Array)
], ClientCertificateEntity.prototype, "databases", void 0);
ClientCertificateEntity = __decorate([
    (0, typeorm_1.Entity)('client_certificate')
], ClientCertificateEntity);
exports.ClientCertificateEntity = ClientCertificateEntity;
