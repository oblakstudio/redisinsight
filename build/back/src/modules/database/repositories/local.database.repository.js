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
exports.LocalDatabaseRepository = void 0;
const common_1 = require("@nestjs/common");
const database_repository_1 = require("./database.repository");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lodash_1 = require("lodash");
const database_entity_1 = require("../entities/database.entity");
const database_1 = require("../models/database");
const utils_1 = require("../../../utils");
const encryption_service_1 = require("../../encryption/encryption.service");
const model_encryptor_1 = require("../../encryption/model.encryptor");
const ca_certificate_repository_1 = require("../../certificate/repositories/ca-certificate.repository");
const client_certificate_repository_1 = require("../../certificate/repositories/client-certificate.repository");
const ssh_options_entity_1 = require("../../ssh/entities/ssh-options.entity");
const exeptions_1 = require("../exeptions");
let LocalDatabaseRepository = class LocalDatabaseRepository extends database_repository_1.DatabaseRepository {
    constructor(repository, sshOptionsRepository, caCertificateRepository, clientCertificateRepository, encryptionService) {
        super();
        this.repository = repository;
        this.sshOptionsRepository = sshOptionsRepository;
        this.caCertificateRepository = caCertificateRepository;
        this.clientCertificateRepository = clientCertificateRepository;
        this.encryptionService = encryptionService;
        this.uniqFieldsForCloudDatabase = [
            'host',
            'port',
            'username',
            'password',
            'caCert.certificate',
            'clientCert.certificate',
            'clientCert.key',
        ];
        this.modelEncryptor = new model_encryptor_1.ModelEncryptor(encryptionService, ['password', 'sentinelMasterPassword']);
        this.sshModelEncryptor = new model_encryptor_1.ModelEncryptor(encryptionService, [
            'username', 'password',
            'privateKey', 'passphrase',
        ]);
    }
    async exists(id) {
        return !!await this.repository
            .createQueryBuilder('database')
            .where({ id })
            .select(['database.id'])
            .getOne();
    }
    async get(id, ignoreEncryptionErrors = false, omitFields = []) {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) {
            return null;
        }
        const model = (0, utils_1.classToClass)(database_1.Database, await this.decryptEntity(entity, ignoreEncryptionErrors));
        if (entity.caCert) {
            model.caCert = await this.caCertificateRepository.get(entity.caCert.id);
        }
        if (entity.clientCert) {
            model.clientCert = await this.clientCertificateRepository.get(entity.clientCert.id);
        }
        return (0, utils_1.classToClass)(database_1.Database, (0, lodash_1.omit)(model, omitFields));
    }
    async list() {
        const entities = await this.repository
            .createQueryBuilder('d')
            .leftJoinAndSelect('d.cloudDetails', 'cd')
            .select([
            'd.id', 'd.name', 'd.host', 'd.port', 'd.db', 'd.new', 'd.timeout',
            'd.connectionType', 'd.modules', 'd.lastConnection', 'd.provider', 'd.version', 'cd',
        ])
            .getMany();
        return entities.map((entity) => (0, utils_1.classToClass)(database_1.Database, entity));
    }
    async create(database, uniqueCheck) {
        if (uniqueCheck) {
            await this.checkUniqueness(database);
        }
        const entity = (0, utils_1.classToClass)(database_entity_1.DatabaseEntity, await this.populateCertificates(database));
        return (0, utils_1.classToClass)(database_1.Database, await this.decryptEntity(await this.repository.save(await this.encryptEntity(entity))));
    }
    async update(id, database) {
        const oldEntity = await this.decryptEntity((await this.repository.findOneBy({ id })), true);
        const newEntity = (0, utils_1.classToClass)(database_entity_1.DatabaseEntity, await this.populateCertificates(database));
        const mergeResult = this.repository.merge(oldEntity, newEntity);
        if (newEntity.caCert === null) {
            mergeResult.caCert = null;
        }
        if (newEntity.clientCert === null) {
            mergeResult.clientCert = null;
        }
        if (newEntity.sshOptions === null) {
            mergeResult.sshOptions = null;
        }
        const encrypted = await this.encryptEntity(mergeResult);
        await this.repository.save(encrypted);
        if (newEntity.sshOptions === null) {
            await this.sshOptionsRepository.createQueryBuilder()
                .delete()
                .where('databaseId IS NULL')
                .execute();
        }
        return this.get(id);
    }
    async delete(id) {
        await this.repository.delete(id);
    }
    async populateCertificates(database) {
        var _a, _b, _c, _d, _e;
        const model = (0, utils_1.classToClass)(database_1.Database, database);
        if (!((_a = model.caCert) === null || _a === void 0 ? void 0 : _a.id) && ((_b = model.caCert) === null || _b === void 0 ? void 0 : _b.certificate)) {
            model.caCert = await this.caCertificateRepository.create(model.caCert);
        }
        if (!((_c = model.clientCert) === null || _c === void 0 ? void 0 : _c.id) && (((_d = model.clientCert) === null || _d === void 0 ? void 0 : _d.certificate) || ((_e = model.clientCert) === null || _e === void 0 ? void 0 : _e.key))) {
            model.clientCert = await this.clientCertificateRepository.create(model.clientCert);
        }
        return model;
    }
    async encryptEntity(entity) {
        const encryptedEntity = await this.modelEncryptor.encryptEntity(entity);
        if (encryptedEntity.sshOptions) {
            encryptedEntity.sshOptions = await this.sshModelEncryptor.encryptEntity(encryptedEntity.sshOptions);
        }
        return encryptedEntity;
    }
    async decryptEntity(entity, ignoreEncryptionErrors = false) {
        const decryptedEntity = await this.modelEncryptor.decryptEntity(entity, ignoreEncryptionErrors);
        if (decryptedEntity.sshOptions) {
            decryptedEntity.sshOptions = await this.sshModelEncryptor.decryptEntity(decryptedEntity.sshOptions, ignoreEncryptionErrors);
        }
        return decryptedEntity;
    }
    async checkUniqueness(database) {
        var _a;
        if ((_a = database.cloudDetails) === null || _a === void 0 ? void 0 : _a.cloudId) {
            const entity = await this.encryptEntity((0, utils_1.classToClass)(database_entity_1.DatabaseEntity, { ...database }));
            if (entity.caCert) {
                entity.caCert = await (new model_encryptor_1.ModelEncryptor(this.encryptionService, [
                    'certificate',
                ])).encryptEntity(entity.caCert);
            }
            if (entity.clientCert) {
                entity.clientCert = await (new model_encryptor_1.ModelEncryptor(this.encryptionService, [
                    'certificate', 'key',
                ])).encryptEntity(entity.clientCert);
            }
            const query = {};
            this.uniqFieldsForCloudDatabase.forEach((field) => {
                (0, lodash_1.set)(query, field, (0, lodash_1.get)(entity, field));
            });
            const existingDatabase = await this.repository.findOneBy(query);
            if (existingDatabase) {
                throw new exeptions_1.DatabaseAlreadyExistsException(existingDatabase.id);
            }
        }
    }
};
LocalDatabaseRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_entity_1.DatabaseEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(ssh_options_entity_1.SshOptionsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        ca_certificate_repository_1.CaCertificateRepository,
        client_certificate_repository_1.ClientCertificateRepository,
        encryption_service_1.EncryptionService])
], LocalDatabaseRepository);
exports.LocalDatabaseRepository = LocalDatabaseRepository;
