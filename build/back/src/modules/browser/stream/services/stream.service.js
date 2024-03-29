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
var StreamService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamService = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../../utils");
const sort_1 = require("../../../../constants/sort");
const browser_tool_commands_1 = require("../../constants/browser-tool-commands");
const dto_1 = require("../dto");
const constants_1 = require("../../../../constants");
const class_transformer_1 = require("class-transformer");
const database_client_factory_1 = require("../../../database/providers/database.client.factory");
const utils_2 = require("../../utils");
const utils_3 = require("../../../redis/utils");
let StreamService = StreamService_1 = class StreamService {
    constructor(databaseClientFactory) {
        this.databaseClientFactory = databaseClientFactory;
        this.logger = new common_1.Logger('StreamService');
    }
    async getEntries(clientMetadata, dto) {
        try {
            this.logger.log('Getting entries of the Stream data type stored at key.');
            const { keyName, sortOrder } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const info = (0, utils_3.convertArrayReplyToObject)(await client.sendCommand([
                browser_tool_commands_1.BrowserToolStreamCommands.XInfoStream,
                keyName,
            ]));
            let entries = [];
            if (sortOrder && sortOrder === sort_1.SortOrder.Asc) {
                entries = await this.getRange(client, dto);
            }
            else {
                entries = await this.getRevRange(client, dto);
            }
            this.logger.log('Succeed to get entries from the stream.');
            return (0, class_transformer_1.plainToClass)(dto_1.GetStreamEntriesResponse, {
                keyName,
                total: info['length'],
                lastGeneratedId: info['last-generated-id'].toString(),
                firstEntry: StreamService_1.formatArrayToDto(info['first-entry']),
                lastEntry: StreamService_1.formatArrayToDto(info['last-entry']),
                entries,
            });
        }
        catch (error) {
            this.logger.error('Failed to get entries from the stream.', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async getRange(client, dto) {
        const { keyName, start, end, count, } = dto;
        const execResult = await client.sendCommand([
            browser_tool_commands_1.BrowserToolStreamCommands.XRange,
            keyName,
            start,
            end,
            'COUNT',
            count,
        ]);
        return StreamService_1.formatReplyToDto(execResult);
    }
    async getRevRange(client, dto) {
        const { keyName, start, end, count, } = dto;
        const execResult = await client.sendCommand([
            browser_tool_commands_1.BrowserToolStreamCommands.XRevRange,
            keyName,
            end,
            start,
            'COUNT',
            count,
        ]);
        return StreamService_1.formatReplyToDto(execResult);
    }
    async createStream(clientMetadata, dto) {
        try {
            this.logger.log('Creating stream data type.');
            const { keyName, entries } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyExists)(keyName, client);
            const entriesArray = entries.map((entry) => [
                entry.id,
                ...(0, lodash_1.flatMap)((0, lodash_1.map)(entry.fields, (field) => [field.name, field.value])),
            ]);
            const toolCommands = entriesArray.map((entry) => ([
                browser_tool_commands_1.BrowserToolStreamCommands.XAdd,
                keyName,
                ...entry,
            ]));
            if (dto.expire) {
                toolCommands.push([browser_tool_commands_1.BrowserToolKeysCommands.Expire, keyName, dto.expire]);
            }
            const transactionResults = await client.sendPipeline(toolCommands);
            (0, utils_1.catchMultiTransactionError)(transactionResults);
            this.logger.log('Succeed to create stream.');
            return undefined;
        }
        catch (error) {
            this.logger.error('Failed to create stream.', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if ((error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType))
                || (error === null || error === void 0 ? void 0 : error.message.includes('ID specified in XADD is equal or smaller'))) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async addEntries(clientMetadata, dto) {
        try {
            this.logger.log('Adding entries to stream.');
            const { keyName, entries } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const entriesArray = entries.map((entry) => [
                entry.id,
                ...(0, lodash_1.flatMap)((0, lodash_1.map)(entry.fields, (field) => [field.name, field.value])),
            ]);
            const toolCommands = entriesArray.map((entry) => ([
                browser_tool_commands_1.BrowserToolStreamCommands.XAdd,
                keyName,
                ...entry,
            ]));
            const transactionResults = await client.sendPipeline(toolCommands);
            (0, utils_1.catchMultiTransactionError)(transactionResults);
            this.logger.log('Succeed to add entries to the stream.');
            return (0, class_transformer_1.plainToClass)(dto_1.AddStreamEntriesResponse, {
                keyName,
                entries: transactionResults.map((entryResult) => entryResult[1].toString()),
            });
        }
        catch (error) {
            this.logger.error('Failed to add entries to the stream.', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if ((error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType))
                || (error === null || error === void 0 ? void 0 : error.message.includes('ID specified in XADD is equal or smaller'))) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async deleteEntries(clientMetadata, dto) {
        try {
            this.logger.log('Deleting entries from the Stream data type.');
            const { keyName, entries } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const result = await client.sendCommand([
                browser_tool_commands_1.BrowserToolStreamCommands.XDel,
                keyName,
                ...entries,
            ]);
            this.logger.log('Succeed to delete entries from the Stream data type.');
            return { affected: result };
        }
        catch (error) {
            this.logger.error('Failed to delete entries from the Stream data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    static formatReplyToDto(reply) {
        return reply.map(StreamService_1.formatArrayToDto);
    }
    static formatArrayToDto(entry) {
        if (!(entry === null || entry === void 0 ? void 0 : entry.length)) {
            return null;
        }
        return {
            id: entry[0].toString(),
            fields: (0, lodash_1.chunk)(entry[1] || [], 2).map((field) => (0, class_transformer_1.plainToClass)(dto_1.StreamEntryFieldDto, {
                name: field[0],
                value: field[1],
            })),
        };
    }
};
StreamService = StreamService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory])
], StreamService);
exports.StreamService = StreamService;
