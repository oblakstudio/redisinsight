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
exports.BrowserHistoryProvider = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const encryption_service_1 = require("../../../encryption/encryption.service");
const class_transformer_1 = require("class-transformer");
const utils_1 = require("../../../../utils");
const config_1 = require("../../../../utils/config");
const error_messages_1 = require("../../../../constants/error-messages");
const browser_history_entity_1 = require("../entities/browser-history.entity");
const get_browser_history_dto_1 = require("../dto/get.browser-history.dto");
const BROWSER_HISTORY_CONFIG = config_1.default.get('browser_history');
let BrowserHistoryProvider = class BrowserHistoryProvider {
    constructor(repository, encryptionService) {
        this.repository = repository;
        this.encryptionService = encryptionService;
        this.logger = new common_1.Logger('BrowserHistoryProvider');
        this.encryptedFields = [
            'filter',
        ];
    }
    async create(history) {
        const entity = await this.repository.save(await this.encryptEntity((0, class_transformer_1.plainToClass)(browser_history_entity_1.BrowserHistoryEntity, history)));
        try {
            await this.cleanupDatabaseHistory(entity.databaseId, entity.mode);
        }
        catch (e) {
            this.logger.error('Error when trying to cleanup history after insert', e);
        }
        return (0, utils_1.classToClass)(get_browser_history_dto_1.BrowserHistory, await this.decryptEntity(entity));
    }
    async get(id) {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) {
            this.logger.error(`Browser history item with id:${id} was not Found`);
            throw new common_1.NotFoundException(error_messages_1.default.BROWSER_HISTORY_ITEM_NOT_FOUND);
        }
        return (0, utils_1.classToClass)(get_browser_history_dto_1.BrowserHistory, await this.decryptEntity(entity, true));
    }
    async list(databaseId, mode) {
        this.logger.log('Getting browser history list');
        const entities = await this.repository
            .createQueryBuilder('a')
            .where({ databaseId, mode })
            .select([
            'a.id',
            'a.filter',
            'a.mode',
            'a.encryption',
        ])
            .orderBy('a.createdAt', 'DESC')
            .limit(BROWSER_HISTORY_CONFIG.maxItemsPerModeInDb)
            .getMany();
        this.logger.log('Succeed to get history list');
        const decryptedEntities = await Promise.all(entities.map(async (entity) => {
            try {
                return await this.decryptEntity(entity, true);
            }
            catch (e) {
                return null;
            }
        }));
        return decryptedEntities.map((entity) => (0, utils_1.classToClass)(get_browser_history_dto_1.BrowserHistory, entity));
    }
    async delete(databaseId, id) {
        this.logger.log(`Deleting browser history item: ${id}`);
        try {
            await this.repository.delete({ id, databaseId });
            this.logger.log('Succeed to delete browser history item.');
        }
        catch (error) {
            this.logger.error(`Failed to delete history items: ${id}`, error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async cleanupDatabaseHistory(databaseId, mode) {
        const idsDuplicates = (await this.repository
            .createQueryBuilder()
            .where({ databaseId, mode })
            .select('id')
            .groupBy('filter')
            .having('COUNT(filter) > 1')
            .getRawMany()).map((item) => item.id);
        const idsOverLimit = (await this.repository
            .createQueryBuilder()
            .where({ databaseId, mode })
            .select('id')
            .orderBy('createdAt', 'DESC')
            .offset(BROWSER_HISTORY_CONFIG.maxItemsPerModeInDb + idsDuplicates.length)
            .getRawMany()).map((item) => item.id);
        await this.repository
            .createQueryBuilder()
            .delete()
            .whereInIds([...idsOverLimit, ...idsDuplicates])
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
        return new browser_history_entity_1.BrowserHistoryEntity({
            ...entity,
            filter: await this.decryptField(entity, 'filter', ignoreErrors),
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
            this.logger.error(`Unable to decrypt browser history ${entity.id} fields: ${field}`, error);
            if (!ignoreErrors) {
                throw error;
            }
        }
        return null;
    }
};
BrowserHistoryProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(browser_history_entity_1.BrowserHistoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        encryption_service_1.EncryptionService])
], BrowserHistoryProvider);
exports.BrowserHistoryProvider = BrowserHistoryProvider;
