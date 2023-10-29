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
const browser_tool_service_1 = require("../browser-tool/browser-tool.service");
const browser_tool_commands_1 = require("../../constants/browser-tool-commands");
const stream_dto_1 = require("../../dto/stream.dto");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
const class_transformer_1 = require("class-transformer");
let StreamService = StreamService_1 = class StreamService {
    constructor(browserTool) {
        this.browserTool = browserTool;
        this.logger = new common_1.Logger('StreamService');
    }
    async getEntries(clientMetadata, dto) {
        try {
            this.logger.log('Getting entries of the Stream data type stored at key.');
            const { keyName, sortOrder } = dto;
            const exists = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (!exists) {
                throw new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST);
            }
            const info = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStreamCommands.XInfoStream, [keyName]);
            let entries = [];
            if (sortOrder && sortOrder === sort_1.SortOrder.Asc) {
                entries = await this.getRange(clientMetadata, dto);
            }
            else {
                entries = await this.getRevRange(clientMetadata, dto);
            }
            this.logger.log('Succeed to get entries from the stream.');
            return (0, class_transformer_1.plainToClass)(stream_dto_1.GetStreamEntriesResponse, {
                keyName,
                total: info[1],
                lastGeneratedId: info[7].toString(),
                firstEntry: StreamService_1.formatArrayToDto(info[11]),
                lastEntry: StreamService_1.formatArrayToDto(info[13]),
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
    async getRange(clientMetadata, dto) {
        const { keyName, start, end, count, } = dto;
        const execResult = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStreamCommands.XRange, [keyName, start, end, 'COUNT', count]);
        return StreamService_1.formatReplyToDto(execResult);
    }
    async getRevRange(clientMetadata, dto) {
        const { keyName, start, end, count, } = dto;
        const execResult = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStreamCommands.XRevRange, [keyName, end, start, 'COUNT', count]);
        return StreamService_1.formatReplyToDto(execResult);
    }
    async createStream(clientMetadata, dto) {
        this.logger.log('Creating stream data type.');
        try {
            const { keyName, entries } = dto;
            const isExist = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (isExist) {
                this.logger.error(`Failed to create stream data type. ${error_messages_1.default.KEY_NAME_EXIST} key: ${keyName}`);
                return Promise.reject(new common_1.ConflictException(error_messages_1.default.KEY_NAME_EXIST));
            }
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
            const [transactionError, transactionResults,] = await this.browserTool.execMulti(clientMetadata, toolCommands);
            (0, utils_1.catchTransactionError)(transactionError, transactionResults);
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
        this.logger.log('Adding entries to stream.');
        try {
            const { keyName, entries } = dto;
            const exists = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (!exists) {
                throw new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST);
            }
            const entriesArray = entries.map((entry) => [
                entry.id,
                ...(0, lodash_1.flatMap)((0, lodash_1.map)(entry.fields, (field) => [field.name, field.value])),
            ]);
            const toolCommands = entriesArray.map((entry) => ([
                browser_tool_commands_1.BrowserToolStreamCommands.XAdd,
                keyName,
                ...entry,
            ]));
            const [transactionError, transactionResults,] = await this.browserTool.execMulti(clientMetadata, toolCommands);
            (0, utils_1.catchTransactionError)(transactionError, transactionResults);
            this.logger.log('Succeed to add entries to the stream.');
            return (0, class_transformer_1.plainToClass)(stream_dto_1.AddStreamEntriesResponse, {
                keyName,
                entries: transactionResults.map((entryResult) => entryResult[1]),
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
        this.logger.log('Deleting entries from the Stream data type.');
        const { keyName, entries } = dto;
        let result;
        try {
            const isExist = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (!isExist) {
                this.logger.error(`Failed to delete entries from the Stream data type. ${error_messages_1.default.KEY_NOT_EXIST} key: ${keyName}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            result = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStreamCommands.XDel, [keyName, ...entries]);
        }
        catch (error) {
            this.logger.error('Failed to delete entries from the Stream data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            (0, utils_1.catchAclError)(error);
        }
        this.logger.log('Succeed to delete entries from the Stream data type.');
        return { affected: result };
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
            fields: (0, lodash_1.chunk)(entry[1] || [], 2).map((field) => (0, class_transformer_1.plainToClass)(stream_dto_1.StreamEntryFieldDto, {
                name: field[0],
                value: field[1],
            })),
        };
    }
};
StreamService = StreamService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [browser_tool_service_1.BrowserToolService])
], StreamService);
exports.StreamService = StreamService;
