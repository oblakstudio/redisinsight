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
exports.LocalPluginStateRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const encryption_service_1 = require("../../encryption/encryption.service");
const error_messages_1 = require("../../../constants/error-messages");
const utils_1 = require("../../../utils");
const plugin_state_entity_1 = require("../entities/plugin-state.entity");
const plugin_state_1 = require("../models/plugin-state");
const plugin_state_repository_1 = require("./plugin-state.repository");
const model_encryptor_1 = require("../../encryption/model.encryptor");
let LocalPluginStateRepository = class LocalPluginStateRepository extends plugin_state_repository_1.PluginStateRepository {
    constructor(repository, encryptionService) {
        super();
        this.repository = repository;
        this.encryptionService = encryptionService;
        this.logger = new common_1.Logger('LocalPluginStateRepository');
        this.modelEncryptor = new model_encryptor_1.ModelEncryptor(encryptionService, ['state']);
    }
    async upsert(pluginState) {
        const entity = (0, class_transformer_1.plainToClass)(plugin_state_entity_1.PluginStateEntity, pluginState);
        try {
            await this.repository.save(await this.modelEncryptor.encryptEntity(entity));
        }
        catch (e) {
            if (e.code === 'SQLITE_CONSTRAINT') {
                throw new common_1.NotFoundException(error_messages_1.default.COMMAND_EXECUTION_NOT_FOUND);
            }
            throw e;
        }
    }
    async getOne(visualizationId, commandExecutionId) {
        this.logger.log('Getting plugin state');
        const entity = await this.repository.findOneBy({ visualizationId, commandExecutionId });
        if (!entity) {
            this.logger.error(`Plugin state ${commandExecutionId}:${visualizationId} was not Found`);
            throw new common_1.NotFoundException(error_messages_1.default.PLUGIN_STATE_NOT_FOUND);
        }
        this.logger.log(`Succeed to get plugin state ${commandExecutionId}:${visualizationId}`);
        const decryptedEntity = await this.modelEncryptor.decryptEntity(entity, true);
        return (0, utils_1.classToClass)(plugin_state_1.PluginState, decryptedEntity);
    }
};
LocalPluginStateRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plugin_state_entity_1.PluginStateEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        encryption_service_1.EncryptionService])
], LocalPluginStateRepository);
exports.LocalPluginStateRepository = LocalPluginStateRepository;
