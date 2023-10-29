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
const browser_tool_service_1 = require("../browser-tool/browser-tool.service");
const error_messages_1 = require("../../../../constants/error-messages");
const stream_dto_1 = require("../../dto/stream.dto");
const class_transformer_1 = require("class-transformer");
let ConsumerGroupService = ConsumerGroupService_1 = class ConsumerGroupService {
    constructor(browserTool) {
        this.browserTool = browserTool;
        this.logger = new common_1.Logger('ConsumerGroupService');
    }
    async getGroups(clientMetadata, dto) {
        try {
            this.logger.log('Getting consumer groups list.');
            const exists = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [dto.keyName]);
            if (!exists) {
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            const groups = ConsumerGroupService_1.formatReplyToDto(await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStreamCommands.XInfoGroups, [dto.keyName]));
            return await Promise.all(groups.map((group) => this.getGroupInfo(clientMetadata, dto, group)));
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
    async getGroupInfo(clientMetadata, dto, group) {
        const info = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStreamCommands.XPending, [dto.keyName, group.name]);
        return (0, class_transformer_1.plainToClass)(stream_dto_1.ConsumerGroupDto, {
            ...group,
            smallestPendingId: (info === null || info === void 0 ? void 0 : info[1]) || null,
            greatestPendingId: (info === null || info === void 0 ? void 0 : info[2]) || null,
        });
    }
    async createGroups(clientMetadata, dto) {
        try {
            this.logger.log('Creating consumer groups.');
            const { keyName, consumerGroups } = dto;
            const exists = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (!exists) {
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            const toolCommands = consumerGroups.map((group) => ([
                browser_tool_commands_1.BrowserToolStreamCommands.XGroupCreate,
                keyName,
                group.name,
                group.lastDeliveredId,
            ]));
            const [transactionError, transactionResults,] = await this.browserTool.execMulti(clientMetadata, toolCommands);
            (0, utils_1.catchTransactionError)(transactionError, transactionResults);
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
            const exists = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [dto.keyName]);
            if (!exists) {
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStreamCommands.XGroupSetId, [dto.keyName, dto.name, dto.lastDeliveredId]);
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
            const exists = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [dto.keyName]);
            if (!exists) {
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            const toolCommands = dto.consumerGroups.map((group) => ([
                browser_tool_commands_1.BrowserToolStreamCommands.XGroupDestroy,
                dto.keyName,
                group,
            ]));
            const [transactionError, transactionResults,] = await this.browserTool.execMulti(clientMetadata, toolCommands);
            (0, utils_1.catchTransactionError)(transactionError, transactionResults);
            this.logger.log('Consumer group(s) successfully deleted.');
            return {
                affected: toolCommands.length,
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
    static formatReplyToDto(reply) {
        return reply.map(ConsumerGroupService_1.formatArrayToDto);
    }
    static formatArrayToDto(entry) {
        if (!(entry === null || entry === void 0 ? void 0 : entry.length)) {
            return null;
        }
        const [, name, , consumers, , pending, , lastDeliveredId] = entry;
        return (0, class_transformer_1.plainToClass)(stream_dto_1.ConsumerGroupDto, {
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
    __metadata("design:paramtypes", [browser_tool_service_1.BrowserToolService])
], ConsumerGroupService);
exports.ConsumerGroupService = ConsumerGroupService;
