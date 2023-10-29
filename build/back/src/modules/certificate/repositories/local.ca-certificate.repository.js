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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalCaCertificateRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ca_certificate_repository_1 = require("./ca-certificate.repository");
const ca_certificate_entity_1 = require("../entities/ca-certificate.entity");
const ca_certificate_1 = require("../models/ca-certificate");
const error_messages_1 = require("../../../constants/error-messages");
const utils_1 = require("../../../utils");
const encryption_service_1 = require("../../encryption/encryption.service");
const model_encryptor_1 = require("../../encryption/model.encryptor");
let LocalCaCertificateRepository = class LocalCaCertificateRepository extends ca_certificate_repository_1.CaCertificateRepository {
    constructor(repository, encryptionService) {
        super();
        this.repository = repository;
        this.encryptionService = encryptionService;
        this.logger = new common_1.Logger('LocalCaCertificateRepository');
        this.modelEncryptor = new model_encryptor_1.ModelEncryptor(encryptionService, ['certificate']);
    }
    async get(id) {
        return (0, utils_1.classToClass)(ca_certificate_1.CaCertificate, await this.modelEncryptor.decryptEntity(await this.repository.findOneBy({ id })));
    }
    async list() {
        return (await this.repository
            .createQueryBuilder('c')
            .select(['c.id', 'c.name'])
            .getMany()).map((entity) => (0, utils_1.classToClass)(ca_certificate_1.CaCertificate, entity));
    }
    async create(caCertificate) {
        const found = await this.repository.findOneBy({ name: caCertificate.name });
        if (found) {
            this.logger.error(`Failed to create certificate: ${caCertificate.name}. ${error_messages_1.default.CA_CERT_EXIST}`);
            throw new common_1.BadRequestException(error_messages_1.default.CA_CERT_EXIST);
        }
        const entity = await this.repository.save(await this.modelEncryptor.encryptEntity(this.repository.create(caCertificate)));
        return this.get(entity.id);
    }
    async delete(id) {
        this.logger.log(`Deleting certificate. id: ${id}`);
        const found = await this.repository.findOneBy({ id });
        if (!found) {
            this.logger.error(`Failed to delete ca certificate: ${id}`);
            throw new common_1.NotFoundException();
        }
        await this.repository.delete(id);
        this.logger.log(`Succeed to delete ca certificate: ${id}`);
    }
};
LocalCaCertificateRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ca_certificate_entity_1.CaCertificateEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        encryption_service_1.EncryptionService])
], LocalCaCertificateRepository);
exports.LocalCaCertificateRepository = LocalCaCertificateRepository;
