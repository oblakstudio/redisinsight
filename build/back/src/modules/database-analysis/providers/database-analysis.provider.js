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
exports.DatabaseAnalysisProvider = void 0;
const common_1 = require("@nestjs/common");
const database_analysis_entity_1 = require("../entities/database-analysis.entity");
const lodash_1 = require("lodash");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const encryption_service_1 = require("../../encryption/encryption.service");
const class_transformer_1 = require("class-transformer");
const models_1 = require("../models");
const utils_1 = require("../../../utils");
const config_1 = require("../../../utils/config");
const error_messages_1 = require("../../../constants/error-messages");
const DATABASE_ANALYSIS_CONFIG = config_1.default.get('database_analysis');
let DatabaseAnalysisProvider = class DatabaseAnalysisProvider {
    constructor(repository, encryptionService) {
        this.repository = repository;
        this.encryptionService = encryptionService;
        this.logger = new common_1.Logger('DatabaseAnalysisProvider');
        this.encryptedFields = [
            'totalKeys',
            'totalMemory',
            'topKeysNsp',
            'topMemoryNsp',
            'topKeysLength',
            'topKeysMemory',
            'filter',
            'progress',
            'expirationGroups',
            'recommendations',
        ];
    }
    async create(analysis) {
        const entity = await this.repository.save(await this.encryptEntity((0, class_transformer_1.plainToClass)(database_analysis_entity_1.DatabaseAnalysisEntity, analysis)));
        try {
            await this.cleanupDatabaseHistory(entity.databaseId);
        }
        catch (e) {
            this.logger.error('Error when trying to cleanup history after insert', e);
        }
        return (0, utils_1.classToClass)(models_1.DatabaseAnalysis, await this.decryptEntity(entity));
    }
    async get(id) {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) {
            this.logger.error(`Database analysis with id:${id} was not Found`);
            throw new common_1.NotFoundException(error_messages_1.default.DATABASE_ANALYSIS_NOT_FOUND);
        }
        return (0, utils_1.classToClass)(models_1.DatabaseAnalysis, await this.decryptEntity(entity, true));
    }
    async recommendationVote(id, dto) {
        this.logger.log('Updating database analysis with recommendation vote');
        const { name, vote } = dto;
        const oldDatabaseAnalysis = await this.repository.findOneBy({ id });
        if (!oldDatabaseAnalysis) {
            this.logger.error(`Database analysis with id:${id} was not Found`);
            throw new common_1.NotFoundException(error_messages_1.default.DATABASE_ANALYSIS_NOT_FOUND);
        }
        const entity = (0, utils_1.classToClass)(models_1.DatabaseAnalysis, await this.decryptEntity(oldDatabaseAnalysis, true));
        entity.recommendations = entity.recommendations.map((recommendation) => (recommendation.name === name ? { ...recommendation, vote } : recommendation));
        await this.repository.update(id, await this.encryptEntity((0, class_transformer_1.plainToClass)(database_analysis_entity_1.DatabaseAnalysisEntity, entity)));
        return entity;
    }
    async list(databaseId) {
        this.logger.log('Getting database analysis list');
        const entities = await this.repository
            .createQueryBuilder('a')
            .where({ databaseId })
            .select(['a.id', 'a.createdAt', 'a.db'])
            .orderBy('a.createdAt', 'DESC')
            .limit(DATABASE_ANALYSIS_CONFIG.maxItemsPerDb)
            .getMany();
        this.logger.log('Succeed to get command executions');
        return entities.map((entity) => (0, utils_1.classToClass)(models_1.ShortDatabaseAnalysis, entity));
    }
    async cleanupDatabaseHistory(databaseId) {
        const idsToDelete = (await this.repository
            .createQueryBuilder()
            .where({ databaseId })
            .select('id')
            .orderBy('createdAt', 'DESC')
            .offset(DATABASE_ANALYSIS_CONFIG.maxItemsPerDb)
            .getRawMany()).map((item) => item.id);
        await this.repository
            .createQueryBuilder()
            .delete()
            .whereInIds(idsToDelete)
            .execute();
    }
    async encryptEntity(entity) {
        const encryptedEntity = {
            ...entity,
        };
        await Promise.all(this.encryptedFields.map(async (field) => {
            if (entity[field]) {
                const { data, encryption } = await this.encryptionService.encrypt(entity[field]);
                encryptedEntity[field] = data;
                encryptedEntity['encryption'] = encryption;
            }
        }));
        return encryptedEntity;
    }
    async decryptEntity(entity, ignoreErrors = false) {
        const decrypted = {
            ...entity,
        };
        await Promise.all(this.encryptedFields.map(async (field) => {
            decrypted[field] = await this.decryptField(entity, field, ignoreErrors);
        }));
        return new database_analysis_entity_1.DatabaseAnalysisEntity({
            ...decrypted,
        });
    }
    async decryptField(entity, field, ignoreErrors) {
        if ((0, lodash_1.isUndefined)(entity[field])) {
            return undefined;
        }
        try {
            return await this.encryptionService.decrypt(entity[field], entity.encryption);
        }
        catch (error) {
            this.logger.error(`Unable to decrypt database analysis ${entity.id} fields: ${field}`, error);
            if (!ignoreErrors) {
                throw error;
            }
        }
        return null;
    }
};
DatabaseAnalysisProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_analysis_entity_1.DatabaseAnalysisEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        encryption_service_1.EncryptionService])
], DatabaseAnalysisProvider);
exports.DatabaseAnalysisProvider = DatabaseAnalysisProvider;
