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
var ConsumerGroupService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerGroupService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const utils_1 = require("../../../../utils");
const browser_tool_commands_1 = require("../../constants/browser-tool-commands");
const error_messages_1 = require("../../../../constants/error-messages");
const dto_1 = require("../dto");
const class_transformer_1 = require("class-transformer");
const database_client_factory_1 = require("../../../database/providers/database.client.factory");
const utils_2 = require("../../utils");
let ConsumerGroupService = ConsumerGroupService_1 = class ConsumerGroupService {
    constructor(databaseClientFactory) {
        this.databaseClientFactory = databaseClientFactory;
        this.logger = new common_1.Logger('ConsumerGroupService');
    }
    async getGroups(clientMetadata, dto) {
        try {
            this.logger.log('Getting consumer groups list.');
            const { keyName } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const groups = ConsumerGroupService_1.formatReplyToDto(await client.sendCommand([
                browser_tool_commands_1.BrowserToolStreamCommands.XInfoGroups,
                keyName,
            ]));
            return await Promise.all(groups.map((group) => this.getGroupInfo(client, dto, group)));
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async getGroupInfo(client, dto, group) {
        const info = await client.sendCommand([
            browser_tool_commands_1.BrowserToolStreamCommands.XPending,
            dto.keyName,
            group.name,
        ]);
        return (0, class_transformer_1.plainToClass)(dto_1.ConsumerGroupDto, {
            ...group,
            smallestPendingId: (info === null || info === void 0 ? void 0 : info[1]) || null,
            greatestPendingId: (info === null || info === void 0 ? void 0 : info[2]) || null,
        });
    }
    async createGroups(clientMetadata, dto) {
        try {
            this.logger.log('Creating consumer groups.');
            const { keyName, consumerGroups } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const toolCommands = consumerGroups.map((group) => ([
                browser_tool_commands_1.BrowserToolStreamCommands.XGroupCreate,
                keyName,
                group.name,
                group.lastDeliveredId,
            ]));
            const transactionResults = await client.sendPipeline(toolCommands);
            (0, utils_1.catchMultiTransactionError)(transactionResults);
            this.logger.log('Stream consumer group(s) created.');
            return undefined;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.BusyGroup)) {
                throw new common_1.ConflictException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async updateGroup(clientMetadata, dto) {
        try {
            this.logger.log('Updating consumer group.');
            const { keyName, name, lastDeliveredId } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            await client.sendCommand([
                browser_tool_commands_1.BrowserToolStreamCommands.XGroupSetId,
                keyName,
                name,
                lastDeliveredId,
            ]);
            this.logger.log('Consumer group was updated.');
            return undefined;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.NoGroup)) {
                throw new common_1.NotFoundException(error_messages_1.default.CONSUMER_GROUP_NOT_FOUND);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async deleteGroup(clientMetadata, dto) {
        try {
            this.logger.log('Deleting consumer group.');
            const { keyName, consumerGroups } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const toolCommands = consumerGroups.map((group) => ([
                browser_tool_commands_1.BrowserToolStreamCommands.XGroupDestroy,
                keyName,
                group,
            ]));
            const transactionResults = await client.sendPipeline(toolCommands);
            (0, utils_1.catchMultiTransactionError)(transactionResults);
            this.logger.log('Consumer group(s) successfully deleted.');
            return { affected: toolCommands.length };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    static formatReplyToDto(reply) {
        return reply.map(ConsumerGroupService_1.formatArrayToDto);
    }
    static formatArrayToDto(entry) {
        if (!(entry === null || entry === void 0 ? void 0 : entry.length)) {
            return null;
        }
        const [, name, , consumers, , pending, , lastDeliveredId] = entry;
        return (0, class_transformer_1.plainToClass)(dto_1.ConsumerGroupDto, {
            name,
            consumers,
            pending,
            lastDeliveredId: lastDeliveredId.toString(),
            smallestPendingId: null,
            greatestPendingId: null,
        });
    }
};
ConsumerGroupService = ConsumerGroupService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory])
], ConsumerGroupService);
exports.ConsumerGroupService = ConsumerGroupService;
