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
const browser_tool_service_1 = require("../browser-tool/browser-tool.service");
const error_messages_1 = require("../../../../constants/error-messages");
const stream_dto_1 = require("../../dto/stream.dto");
const class_transformer_1 = require("class-transformer");
let ConsumerService = ConsumerService_1 = class ConsumerService {
    constructor(browserTool) {
        this.browserTool = browserTool;
        this.logger = new common_1.Logger('ConsumerService');
    }
    async getConsumers(clientMetadata, dto) {
        try {
            this.logger.log('Getting consumers list.');
            const exists = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [dto.keyName]);
            if (!exists) {
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            return ConsumerService_1.formatReplyToDto(await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStreamCommands.XInfoConsumers, [dto.keyName, dto.groupName]));
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
            const exists = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [dto.keyName]);
            if (!exists) {
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            const toolCommands = dto.consumerNames.map((consumerName) => ([
                browser_tool_commands_1.BrowserToolStreamCommands.XGroupDelConsumer,
                dto.keyName,
                dto.groupName,
                consumerName,
            ]));
            const [transactionError, transactionResults,] = await this.browserTool.execMulti(clientMetadata, toolCommands);
            (0, utils_1.catchTransactionError)(transactionError, transactionResults);
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
            const exists = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [dto.keyName]);
            if (!exists) {
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            return ConsumerService_1.formatReplyToPendingEntriesDto(await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStreamCommands.XPending, [dto.keyName, dto.groupName, dto.start, dto.end, dto.count, dto.consumerName]));
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
            const exists = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [dto.keyName]);
            if (!exists) {
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            const affected = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStreamCommands.XAck, [dto.keyName, dto.groupName, ...dto.entries]);
            this.logger.log('Successfully acknowledged pending entries.');
            return {
                affected,
            };
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
            const exists = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [dto.keyName]);
            if (!exists) {
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            const args = [dto.keyName, dto.groupName, dto.consumerName, dto.minIdleTime, ...dto.entries];
            if (dto.idle !== undefined) {
                args.push('idle', dto.idle);
            }
            else if (dto.time !== undefined) {
                args.push('time', dto.time);
            }
            if (dto.retryCount !== undefined) {
                args.push('retrycount', dto.retryCount);
            }
            if (dto.force) {
                args.push('force');
            }
            args.push('justid');
            const affected = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStreamCommands.XClaim, args, 'utf8');
            this.logger.log('Successfully claimed pending entries.');
            return {
                affected,
            };
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
        return (0, class_transformer_1.plainToClass)(stream_dto_1.ConsumerDto, {
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
        return (0, class_transformer_1.plainToClass)(stream_dto_1.PendingEntryDto, {
            id: `${entry[0]}`,
            consumerName: entry[1],
            idle: +entry[2],
            delivered: +entry[3],
        });
    }
};
ConsumerService = ConsumerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [browser_tool_service_1.BrowserToolService])
], ConsumerService);
exports.ConsumerService = ConsumerService;
