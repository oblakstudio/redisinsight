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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZSetBusinessService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const config_1 = require("../../../../utils/config");
const utils_1 = require("../../../../utils");
const dto_1 = require("../../dto");
const sort_1 = require("../../../../constants/sort");
const constants_1 = require("../../../../constants");
const error_messages_1 = require("../../../../constants/error-messages");
const browser_tool_service_1 = require("../browser-tool/browser-tool.service");
const database_recommendation_service_1 = require("../../../database-recommendation/database-recommendation.service");
const browser_tool_commands_1 = require("../../constants/browser-tool-commands");
const class_transformer_1 = require("class-transformer");
const REDIS_SCAN_CONFIG = config_1.default.get('redis_scan');
let ZSetBusinessService = class ZSetBusinessService {
    constructor(browserTool, recommendationService) {
        this.browserTool = browserTool;
        this.recommendationService = recommendationService;
        this.logger = new common_1.Logger('ZSetBusinessService');
    }
    async createZSet(clientMetadata, dto) {
        this.logger.log('Creating ZSet data type.');
        const { keyName } = dto;
        try {
            const isExist = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (isExist) {
                this.logger.error(`Failed to create ZSet data type. ${error_messages_1.default.KEY_NAME_EXIST} key: ${keyName}`);
                return Promise.reject(new common_1.ConflictException(error_messages_1.default.KEY_NAME_EXIST));
            }
            if (dto.expire) {
                await this.createZSetWithExpiration(clientMetadata, dto);
            }
            else {
                await this.createSimpleZSet(clientMetadata, dto);
            }
            this.logger.log('Succeed to create ZSet data type.');
        }
        catch (error) {
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            this.logger.error('Failed to create ZSet data type.', error);
            (0, utils_1.catchAclError)(error);
        }
        return null;
    }
    async getMembers(clientMetadata, getZSetDto) {
        this.logger.log('Getting members of the ZSet data type stored at key.');
        const { keyName, sortOrder } = getZSetDto;
        let result;
        try {
            const total = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolZSetCommands.ZCard, [keyName]);
            if (!total) {
                this.logger.error(`Failed to get members of the ZSet data type. Not Found key: ${keyName}.`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            let members = [];
            if (sortOrder && sortOrder === sort_1.SortOrder.Asc) {
                members = await this.getZRange(clientMetadata, getZSetDto);
            }
            else {
                members = await this.getZRevRange(clientMetadata, getZSetDto);
            }
            this.logger.log('Succeed to get members of the ZSet data type.');
            result = {
                keyName,
                total,
                members,
            };
            this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.RTS, { members, keyName });
        }
        catch (error) {
            this.logger.error('Failed to get members of the ZSet data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            (0, utils_1.catchAclError)(error);
        }
        return (0, class_transformer_1.plainToClass)(dto_1.GetZSetResponse, result);
    }
    async addMembers(clientMetadata, dto) {
        this.logger.log('Adding members to the ZSet data type.');
        const { keyName, members } = dto;
        try {
            const isExist = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (!isExist) {
                this.logger.error(`Failed to add members to ZSet data type. ${error_messages_1.default.KEY_NOT_EXIST} key: ${keyName}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            const args = this.formatMembersDtoToCommandArgs(members);
            await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolZSetCommands.ZAdd, [keyName, ...args]);
            this.logger.log('Succeed to add members to ZSet data type.');
        }
        catch (error) {
            this.logger.error('Failed to add members to Set data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            (0, utils_1.catchAclError)(error);
        }
        return null;
    }
    async updateMember(clientMetadata, dto) {
        this.logger.log('Updating member in ZSet data type.');
        const { keyName, member } = dto;
        try {
            const isExist = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (!isExist) {
                this.logger.error(`Failed to update member in ZSet data type. ${error_messages_1.default.KEY_NOT_EXIST} key: ${keyName}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            const result = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolZSetCommands.ZAdd, [keyName, 'XX', 'CH', `${member.score}`, member.name]);
            if (!result) {
                this.logger.error(`Failed to update member in ZSet data type. ${error_messages_1.default.MEMBER_IN_SET_NOT_EXIST}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.MEMBER_IN_SET_NOT_EXIST));
            }
            this.logger.log('Succeed to update member in ZSet data type.');
        }
        catch (error) {
            this.logger.error('Failed to update member in ZSet data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            (0, utils_1.catchAclError)(error);
        }
        return null;
    }
    async deleteMembers(clientMetadata, dto) {
        this.logger.log('Deleting members from the ZSet data type.');
        const { keyName, members } = dto;
        let result;
        try {
            const isExist = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (!isExist) {
                this.logger.error(`Failed to delete members from the ZSet data type. ${error_messages_1.default.KEY_NOT_EXIST} key: ${keyName}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            result = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolZSetCommands.ZRem, [keyName, ...members]);
        }
        catch (error) {
            this.logger.error('Failed to delete members from the ZSet data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            (0, utils_1.catchAclError)(error);
        }
        this.logger.log('Succeed to delete members from the ZSet data type.');
        return { affected: result };
    }
    async searchMembers(clientMetadata, dto) {
        this.logger.log('Search members of the ZSet data type stored at key.');
        const { keyName } = dto;
        let result = {
            keyName,
            total: 0,
            members: [],
            nextCursor: dto.cursor,
        };
        try {
            result.total = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolZSetCommands.ZCard, [keyName]);
            if (!result.total) {
                this.logger.error(`Failed to search members of the ZSet data type. Not Found key: ${keyName}.`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            if (dto.match && !(0, utils_1.isRedisGlob)(dto.match)) {
                const member = (0, utils_1.unescapeRedisGlob)(dto.match);
                result.nextCursor = 0;
                const score = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolZSetCommands.ZScore, [keyName, member]);
                const formattedScore = (0, lodash_1.isNaN)(parseFloat(score)) ? String(score) : parseFloat(score);
                if (!(0, lodash_1.isNull)(score)) {
                    result.members.push((0, class_transformer_1.plainToClass)(dto_1.ZSetMemberDto, { name: member, score: formattedScore }));
                }
            }
            else {
                const scanResult = await this.scanZSet(clientMetadata, dto);
                result = { ...result, ...scanResult };
            }
            this.logger.log('Succeed to search members of the ZSet data type.');
            return (0, class_transformer_1.plainToClass)(dto_1.SearchZSetMembersResponse, result);
        }
        catch (error) {
            this.logger.error('Failed to search members of the ZSet data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async getZRange(clientMetadata, getZSetDto) {
        const { keyName, offset, count } = getZSetDto;
        const execResult = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolZSetCommands.ZRange, [keyName, offset, offset + count - 1, 'WITHSCORES']);
        return this.formatZRangeWithScoresReply(execResult);
    }
    async getZRevRange(clientMetadata, getZSetDto) {
        const { keyName, offset, count } = getZSetDto;
        const execResult = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolZSetCommands.ZRevRange, [keyName, offset, offset + count - 1, 'WITHSCORES']);
        return this.formatZRangeWithScoresReply(execResult);
    }
    async createSimpleZSet(clientMetadata, dto) {
        const { keyName, members } = dto;
        const args = this.formatMembersDtoToCommandArgs(members);
        return await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolZSetCommands.ZAdd, [keyName, ...args]);
    }
    async createZSetWithExpiration(clientMetadata, dto) {
        const { keyName, members, expire } = dto;
        const args = this.formatMembersDtoToCommandArgs(members);
        const [transactionError, transactionResults,] = await this.browserTool.execMulti(clientMetadata, [
            [browser_tool_commands_1.BrowserToolZSetCommands.ZAdd, keyName, ...args],
            [browser_tool_commands_1.BrowserToolKeysCommands.Expire, keyName, expire],
        ]);
        (0, utils_1.catchTransactionError)(transactionError, transactionResults);
        const execResult = transactionResults.map((item) => item[1]);
        const [added] = execResult;
        return added;
    }
    async scanZSet(clientMetadata, dto) {
        const { keyName } = dto;
        const count = dto.count || REDIS_SCAN_CONFIG.countDefault;
        const match = dto.match !== undefined ? dto.match : '*';
        let result = {
            keyName,
            nextCursor: null,
            members: [],
        };
        while (result.nextCursor !== 0 && result.members.length < count) {
            const scanResult = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolZSetCommands.ZScan, [
                keyName,
                `${result.nextCursor || dto.cursor}`,
                'MATCH',
                match,
                'COUNT',
                count,
            ]);
            const [nextCursor, membersArray] = scanResult;
            const members = this.formatZRangeWithScoresReply(membersArray);
            result = {
                ...result,
                nextCursor: parseInt(nextCursor, 10),
                members: [...result.members, ...members],
            };
        }
        return result;
    }
    formatZRangeWithScoresReply(reply) {
        const result = [];
        while (reply.length) {
            const member = reply.splice(0, 2);
            const score = (0, lodash_1.isNaN)(parseFloat(member[1])) ? String(member[1]) : parseFloat(member[1]);
            result.push((0, class_transformer_1.plainToClass)(dto_1.ZSetMemberDto, {
                name: member[0],
                score,
            }));
        }
        return result;
    }
    formatMembersDtoToCommandArgs(members) {
        return members.reduce((prev, cur) => [
            ...prev,
            ...[`${cur.score}`, cur.name],
        ], []);
    }
};
ZSetBusinessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [browser_tool_service_1.BrowserToolService,
        database_recommendation_service_1.DatabaseRecommendationService])
], ZSetBusinessService);
exports.ZSetBusinessService = ZSetBusinessService;
