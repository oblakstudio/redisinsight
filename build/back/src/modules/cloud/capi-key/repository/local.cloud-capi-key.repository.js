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
exports.LocalCloudCapiKeyRepository = void 0;
const model_1 = require("../model");
const cloud_capi_key_repository_1 = require("./cloud-capi-key.repository");
const model_encryptor_1 = require("../../../encryption/model.encryptor");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cloud_capi_key_entity_1 = require("../entity/cloud-capi-key.entity");
const encryption_service_1 = require("../../../encryption/encryption.service");
const utils_1 = require("../../../../utils");
const exceptions_1 = require("../../common/exceptions");
let LocalCloudCapiKeyRepository = class LocalCloudCapiKeyRepository extends cloud_capi_key_repository_1.CloudCapiKeyRepository {
    constructor(repository, encryptionService) {
        super();
        this.repository = repository;
        this.encryptionService = encryptionService;
        this.modelEncryptor = new model_encryptor_1.ModelEncryptor(encryptionService, ['capiKey', 'capiSecret']);
    }
    async get(id) {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) {
            return null;
        }
        return (0, utils_1.classToClass)(model_1.CloudCapiKey, await this.modelEncryptor.decryptEntity(entity, true));
    }
    async update(id, data) {
        const oldEntity = await this.modelEncryptor.decryptEntity((await this.repository.findOneBy({ id })), true);
        const newEntity = (0, utils_1.classToClass)(cloud_capi_key_entity_1.CloudCapiKeyEntity, data);
        const encrypted = await this.modelEncryptor.encryptEntity(this.repository.merge(oldEntity, newEntity));
        await this.repository.save(encrypted);
        return this.get(id);
    }
    async getByUserAccount(userId, cloudUserId, cloudAccountId) {
        const entity = await this.repository.findOneBy({ userId, cloudUserId, cloudAccountId });
        if (!entity) {
            return null;
        }
        return (0, utils_1.classToClass)(model_1.CloudCapiKey, await this.modelEncryptor.decryptEntity(entity, true));
    }
    async create(model) {
        try {
            const entity = (0, utils_1.classToClass)(cloud_capi_key_entity_1.CloudCapiKeyEntity, model);
            return (0, utils_1.classToClass)(model_1.CloudCapiKey, await this.modelEncryptor.decryptEntity(await this.repository.save(await this.modelEncryptor.encryptEntity(entity)), true));
        }
        catch (e) {
            if (e.code === 'SQLITE_CONSTRAINT') {
                throw new exceptions_1.CloudApiBadRequestException('Such capi key already exists');
            }
            throw e;
        }
    }
    async list(userId) {
        const entities = await this.repository
            .createQueryBuilder('k')
            .select([
            'k.id', 'k.name', 'k.valid', 'k.createdAt', 'k.lastUsed',
        ])
            .where({ userId })
            .orderBy('k.createdAt', 'DESC')
            .getMany();
        return entities.map((entity) => (0, utils_1.classToClass)(model_1.CloudCapiKey, entity));
    }
    async delete(userId, id) {
        await this.repository.delete({ id, userId });
    }
    async deleteAll(userId) {
        await this.repository.delete({ userId });
    }
};
LocalCloudCapiKeyRepository = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(cloud_capi_key_entity_1.CloudCapiKeyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        encryption_service_1.EncryptionService])
], LocalCloudCapiKeyRepository);
exports.LocalCloudCapiKeyRepository = LocalCloudCapiKeyRepository;
