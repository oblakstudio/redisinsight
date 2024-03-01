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
exports.LocalCommandExecutionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lodash_1 = require("lodash");
const class_transformer_1 = require("class-transformer");
const encryption_service_1 = require("../../encryption/encryption.service");
const command_execution_entity_1 = require("../entities/command-execution.entity");
const command_execution_1 = require("../models/command-execution");
const model_encryptor_1 = require("../../encryption/model.encryptor");
const error_messages_1 = require("../../../constants/error-messages");
const utils_1 = require("../../../utils");
const short_command_execution_1 = require("../models/short-command-execution");
const cli_dto_1 = require("../../cli/dto/cli.dto");
const command_execution_repository_1 = require("./command-execution.repository");
const config_1 = require("../../../utils/config");
const WORKBENCH_CONFIG = config_1.default.get('workbench');
let LocalCommandExecutionRepository = class LocalCommandExecutionRepository extends command_execution_repository_1.CommandExecutionRepository {
    constructor(commandExecutionRepository, encryptionService) {
        super();
        this.commandExecutionRepository = commandExecutionRepository;
        this.encryptionService = encryptionService;
        this.logger = new common_1.Logger('LocalCommandExecutionRepository');
        this.modelEncryptor = new model_encryptor_1.ModelEncryptor(encryptionService, ['command', 'result']);
    }
    async createMany(commandExecutions) {
        let entities = await Promise.all(commandExecutions.map(async (commandExecution) => {
            const entity = (0, class_transformer_1.plainToClass)(command_execution_entity_1.CommandExecutionEntity, commandExecution);
            if (JSON.stringify(entity.result).length > WORKBENCH_CONFIG.maxResultSize) {
                entity.result = JSON.stringify([
                    {
                        status: cli_dto_1.CommandExecutionStatus.Success,
                        response: error_messages_1.default.WORKBENCH_RESPONSE_TOO_BIG(),
                    },
                ]);
                entity['isNotStored'] = true;
            }
            return this.modelEncryptor.encryptEntity(entity);
        }));
        entities = await this.commandExecutionRepository.save(entities);
        const response = await Promise.all(entities.map((entity, idx) => (0, utils_1.classToClass)(command_execution_1.CommandExecution, {
            ...entity,
            command: commandExecutions[idx].command,
            mode: commandExecutions[idx].mode,
            result: commandExecutions[idx].result,
            summary: commandExecutions[idx].summary,
            executionTime: commandExecutions[idx].executionTime,
        })));
        try {
            await this.cleanupDatabaseHistory(entities[0].databaseId);
        }
        catch (e) {
            this.logger.error('Error when trying to cleanup history after insert', e);
        }
        return response;
    }
    async getList(databaseId) {
        this.logger.log('Getting command executions');
        const entities = await this.commandExecutionRepository
            .createQueryBuilder('e')
            .where({ databaseId })
            .select([
            'e.id',
            'e.command',
            'e.databaseId',
            'e.createdAt',
            'e.encryption',
            'e.mode',
            'e.summary',
            'e.resultsMode',
            'e.executionTime',
            'e.db',
        ])
            .orderBy('e.createdAt', 'DESC')
            .limit(WORKBENCH_CONFIG.maxItemsPerDb)
            .getMany();
        this.logger.log('Succeed to get command executions');
        const decryptedEntities = await Promise.all(entities.map(async (entity) => {
            try {
                return await this.modelEncryptor.decryptEntity(entity);
            }
            catch (e) {
                return null;
            }
        }));
        return (0, lodash_1.filter)(decryptedEntities, (entity) => !(0, lodash_1.isNull)(entity))
            .map((entity) => (0, utils_1.classToClass)(short_command_execution_1.ShortCommandExecution, entity));
    }
    async getOne(databaseId, id) {
        this.logger.log('Getting command executions');
        const entity = await this.commandExecutionRepository.findOneBy({ id, databaseId });
        if (!entity) {
            this.logger.error(`Command execution with id:${id} and databaseId:${databaseId} was not Found`);
            throw new common_1.NotFoundException(error_messages_1.default.COMMAND_EXECUTION_NOT_FOUND);
        }
        this.logger.log(`Succeed to get command execution ${id}`);
        const decryptedEntity = await this.modelEncryptor.decryptEntity(entity, true);
        return (0, utils_1.classToClass)(command_execution_1.CommandExecution, decryptedEntity);
    }
    async delete(databaseId, id) {
        this.logger.log('Delete command execution');
        await this.commandExecutionRepository.delete({ id, databaseId });
        this.logger.log('Command execution deleted');
    }
    async deleteAll(databaseId) {
        this.logger.log('Delete all command executions');
        await this.commandExecutionRepository.delete({ databaseId });
        this.logger.log('Command executions deleted');
    }
    async cleanupDatabaseHistory(databaseId) {
        const idsToDelete = (await this.commandExecutionRepository
            .createQueryBuilder()
            .where({ databaseId })
            .select('id')
            .orderBy('createdAt', 'DESC')
            .offset(WORKBENCH_CONFIG.maxItemsPerDb)
            .getRawMany()).map((item) => item.id);
        await this.commandExecutionRepository
            .createQueryBuilder()
            .delete()
            .whereInIds(idsToDelete)
            .execute();
    }
};
LocalCommandExecutionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(command_execution_entity_1.CommandExecutionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        encryption_service_1.EncryptionService])
], LocalCommandExecutionRepository);
exports.LocalCommandExecutionRepository = LocalCommandExecutionRepository;
