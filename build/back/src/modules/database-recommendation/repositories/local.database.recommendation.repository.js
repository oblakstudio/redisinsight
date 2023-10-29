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
exports.LocalDatabaseRecommendationRepository = void 0;
const common_1 = require("@nestjs/common");
const database_recommendation_entity_1 = require("../entities/database-recommendation.entity");
const database_recommendation_repository_1 = require("./database-recommendation.repository");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const models_1 = require("../models");
const encryption_service_1 = require("../../encryption/encryption.service");
const utils_1 = require("../../../utils");
const error_messages_1 = require("../../../constants/error-messages");
const database_recommendations_response_1 = require("../dto/database-recommendations.response");
const constants_1 = require("../constants");
const event_emitter_1 = require("@nestjs/event-emitter");
const model_encryptor_1 = require("../../encryption/model.encryptor");
let LocalDatabaseRecommendationRepository = class LocalDatabaseRecommendationRepository extends database_recommendation_repository_1.DatabaseRecommendationRepository {
    constructor(repository, eventEmitter, encryptionService) {
        super();
        this.repository = repository;
        this.eventEmitter = eventEmitter;
        this.encryptionService = encryptionService;
        this.logger = new common_1.Logger('DatabaseRecommendationRepository');
        this.modelEncryptor = new model_encryptor_1.ModelEncryptor(encryptionService, ['params']);
    }
    async create(entity) {
        this.logger.log('Creating database recommendation');
        try {
            const model = await this.repository.save(await this.modelEncryptor.encryptEntity((0, class_transformer_1.plainToClass)(database_recommendation_entity_1.DatabaseRecommendationEntity, entity)));
            const recommendation = (0, utils_1.classToClass)(models_1.DatabaseRecommendation, await this.modelEncryptor.decryptEntity(model, true));
            this.eventEmitter.emit(constants_1.RecommendationEvents.NewRecommendation, [recommendation]);
            return recommendation;
        }
        catch (err) {
            this.logger.error('Failed to create database recommendation', err);
            return null;
        }
    }
    async list({ databaseId }) {
        this.logger.log('Getting database recommendations list');
        const entities = await this.repository
            .createQueryBuilder('r')
            .where({ databaseId })
            .select(['r.id', 'r.name', 'r.read', 'r.vote', 'r.hide', 'r.params', 'r.encryption'])
            .orderBy('r.createdAt', 'DESC')
            .getMany();
        const totalUnread = await this.repository
            .createQueryBuilder()
            .where({ databaseId, read: false })
            .getCount();
        this.logger.log('Succeed to get recommendations');
        const decryptedEntities = await Promise.all(entities.map(async (entity) => {
            try {
                return await this.modelEncryptor.decryptEntity(entity, true);
            }
            catch (e) {
                return null;
            }
        }));
        return (0, utils_1.classToClass)(database_recommendations_response_1.DatabaseRecommendationsResponse, {
            recommendations: decryptedEntities,
            totalUnread,
        });
    }
    async read({ databaseId }) {
        this.logger.log('Marking all recommendations as read');
        await this.repository
            .createQueryBuilder('r')
            .update()
            .where({ databaseId })
            .set({ read: true })
            .execute();
    }
    async update(clientMetadata, id, recommendation) {
        this.logger.log(`Updating database recommendation with id:${id}`);
        const oldEntity = await this.modelEncryptor.decryptEntity(await this.repository.findOneBy({ id }));
        const newEntity = (0, class_transformer_1.plainToClass)(database_recommendation_entity_1.DatabaseRecommendationEntity, recommendation);
        if (!oldEntity) {
            this.logger.error(`Database recommendation with id:${id} was not Found`);
            throw new common_1.NotFoundException(error_messages_1.default.DATABASE_RECOMMENDATION_NOT_FOUND);
        }
        const mergeResult = this.repository.merge(oldEntity, newEntity);
        await this.repository.update(id, await this.modelEncryptor.encryptEntity(mergeResult));
        this.logger.log(`Updated database recommendation with id:${id}`);
        return this.get(id);
    }
    async isExist({ databaseId }, name) {
        try {
            this.logger.log(`Checking is recommendation ${name} exist`);
            const recommendation = await this.repository.findOneBy({ databaseId, name });
            this.logger.log(`Succeed to check is recommendation ${name} exist'`);
            return !!recommendation;
        }
        catch (err) {
            this.logger.error(`Failed to check is recommendation ${name} exist'`);
            return false;
        }
    }
    async get(id) {
        this.logger.log(`Getting recommendation with id: ${id}`);
        const entity = await this.repository.findOneBy({ id });
        const model = (0, utils_1.classToClass)(models_1.DatabaseRecommendation, await this.modelEncryptor.decryptEntity(entity, true));
        if (!model) {
            this.logger.error(`Not found recommendation with id: ${id}'`);
            return null;
        }
        this.logger.log(`Succeed to get recommendation with id: ${id}'`);
        return model;
    }
    async sync(clientMetadata, dbAnalysisRecommendations) {
        this.logger.log('Synchronization of recommendations');
        try {
            const sortedRecommendations = (0, utils_1.sortRecommendations)(dbAnalysisRecommendations);
            for (let i = 0; i < sortedRecommendations.length; i += 1) {
                if (!await this.isExist(clientMetadata, sortedRecommendations[i].name)) {
                    const entity = (0, class_transformer_1.plainToClass)(models_1.DatabaseRecommendation, {
                        databaseId: clientMetadata === null || clientMetadata === void 0 ? void 0 : clientMetadata.databaseId,
                        name: sortedRecommendations[i].name,
                        params: sortedRecommendations[i].params,
                    });
                    await this.create(entity);
                }
            }
        }
        catch (e) {
            this.logger.error(e);
        }
    }
    async delete({ databaseId }, id) {
        try {
            const { affected } = await this.repository.delete({ databaseId, id });
            if (!affected) {
                this.logger.error(`Recommendation with id:${id} was not Found`);
                throw new common_1.NotFoundException(error_messages_1.default.DATABASE_RECOMMENDATION_NOT_FOUND);
            }
            this.logger.log('Succeed to delete recommendation.');
        }
        catch (error) {
            this.logger.error(`Failed to delete recommendation: ${id}`, error);
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
LocalDatabaseRecommendationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_recommendation_entity_1.DatabaseRecommendationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2,
        encryption_service_1.EncryptionService])
], LocalDatabaseRecommendationRepository);
exports.LocalDatabaseRecommendationRepository = LocalDatabaseRecommendationRepository;
