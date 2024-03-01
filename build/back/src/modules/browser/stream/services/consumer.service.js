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
var ConsumerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const utils_1 = require("../../../../utils");
const browser_tool_commands_1 = require("../../constants/browser-tool-commands");
const error_messages_1 = require("../../../../constants/error-messages");
const dto_1 = require("../dto");
const class_transformer_1 = require("class-transformer");
const utils_2 = require("../../utils");
const database_client_factory_1 = require("../../../database/providers/database.client.factory");
let ConsumerService = ConsumerService_1 = class ConsumerService {
    constructor(databaseClientFactory) {
        this.databaseClientFactory = databaseClientFactory;
        this.logger = new common_1.Logger('ConsumerService');
    }
    async getConsumers(clientMetadata, dto) {
        try {
            this.logger.log('Getting consumers list.');
            const { keyName, groupName } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            return ConsumerService_1.formatReplyToDto(await client.sendCommand([
                browser_tool_commands_1.BrowserToolStreamCommands.XInfoConsumers,
                keyName,
                groupName,
            ]));
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.NoGroup)) {
                throw new common_1.NotFoundException(error_messages_1.default.CONSUMER_GROUP_NOT_FOUND);
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async deleteConsumers(clientMetadata, dto) {
        try {
            this.logger.log('Deleting consumers from the group.');
            const { keyName, groupName, consumerNames } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const toolCommands = consumerNames.map((consumerName) => ([
                browser_tool_commands_1.BrowserToolStreamCommands.XGroupDelConsumer,
                keyName,
                groupName,
                consumerName,
            ]));
            const transactionResults = await client.sendPipeline(toolCommands);
            (0, utils_1.catchMultiTransactionError)(transactionResults);
            return undefined;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.NoGroup)) {
                throw new common_1.NotFoundException(error_messages_1.default.CONSUMER_GROUP_NOT_FOUND);
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async getPendingEntries(clientMetadata, dto) {
        try {
            this.logger.log('Getting pending entries list.');
            const { keyName, groupName, start, end, count, consumerName, } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            return ConsumerService_1.formatReplyToPendingEntriesDto(await client.sendCommand([
                browser_tool_commands_1.BrowserToolStreamCommands.XPending,
                keyName,
                groupName,
                start,
                end,
                count,
                consumerName,
            ]));
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.NoGroup)) {
                throw new common_1.NotFoundException(error_messages_1.default.CONSUMER_GROUP_NOT_FOUND);
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async ackPendingEntries(clientMetadata, dto) {
        try {
            this.logger.log('Acknowledging pending entries.');
            const { keyName, groupName, entries } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const affected = await client.sendCommand([
                browser_tool_commands_1.BrowserToolStreamCommands.XAck,
                keyName,
                groupName,
                ...entries,
            ]);
            this.logger.log('Successfully acknowledged pending entries.');
            return { affected };
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
    async claimPendingEntries(clientMetadata, dto) {
        try {
            this.logger.log('Claiming pending entries.');
            const { keyName, groupName, consumerName, minIdleTime, entries, idle, time, retryCount, force, } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const args = [keyName, groupName, consumerName, minIdleTime, ...entries];
            if (idle !== undefined) {
                args.push('idle', idle);
            }
            else if (time !== undefined) {
                args.push('time', time);
            }
            if (retryCount !== undefined) {
                args.push('retrycount', retryCount);
            }
            if (force) {
                args.push('force');
            }
            args.push('justid');
            const affected = await client.sendCommand([
                browser_tool_commands_1.BrowserToolStreamCommands.XClaim,
                ...args,
            ], { replyEncoding: 'utf8' });
            this.logger.log('Successfully claimed pending entries.');
            return { affected };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.NoGroup)) {
                throw new common_1.NotFoundException(error_messages_1.default.CONSUMER_GROUP_NOT_FOUND);
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    static formatReplyToDto(reply) {
        return reply.map(ConsumerService_1.formatArrayToDto);
    }
    static formatArrayToDto(entry) {
        if (!(entry === null || entry === void 0 ? void 0 : entry.length)) {
            return null;
        }
        const [, name, , pending, , idle] = entry;
        return (0, class_transformer_1.plainToClass)(dto_1.ConsumerDto, {
            name,
            pending,
            idle,
        });
    }
    static formatReplyToPendingEntriesDto(reply) {
        return reply.map(ConsumerService_1.formatArrayToPendingEntryDto);
    }
    static formatArrayToPendingEntryDto(entry) {
        if (!(entry === null || entry === void 0 ? void 0 : entry.length)) {
            return null;
        }
        return (0, class_transformer_1.plainToClass)(dto_1.PendingEntryDto, {
            id: `${entry[0]}`,
            consumerName: entry[1],
            idle: +entry[2],
            delivered: +entry[3],
        });
    }
};
ConsumerService = ConsumerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory])
], ConsumerService);
exports.ConsumerService = ConsumerService;
