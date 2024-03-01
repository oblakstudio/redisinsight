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
exports.ZSetService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const config_1 = require("../../../utils/config");
const utils_1 = require("../../../utils");
const sort_1 = require("../../../constants/sort");
const constants_1 = require("../../../constants");
const error_messages_1 = require("../../../constants/error-messages");
const database_recommendation_service_1 = require("../../database-recommendation/database-recommendation.service");
const browser_tool_commands_1 = require("../constants/browser-tool-commands");
const class_transformer_1 = require("class-transformer");
const dto_1 = require("./dto");
const database_client_factory_1 = require("../../database/providers/database.client.factory");
const utils_2 = require("../utils");
const REDIS_SCAN_CONFIG = config_1.default.get('redis_scan');
let ZSetService = class ZSetService {
    constructor(databaseClientFactory, recommendationService) {
        this.databaseClientFactory = databaseClientFactory;
        this.recommendationService = recommendationService;
        this.logger = new common_1.Logger('ZSetService');
    }
    async createZSet(clientMetadata, dto) {
        try {
            this.logger.log('Creating ZSet data type.');
            const { keyName, expire } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyExists)(keyName, client);
            if (expire) {
                await this.createZSetWithExpiration(client, dto);
            }
            else {
                await this.createSimpleZSet(client, dto);
            }
            this.logger.log('Succeed to create ZSet data type.');
            return null;
        }
        catch (error) {
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            this.logger.error('Failed to create ZSet data type.', error);
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async getMembers(clientMetadata, getZSetDto) {
        try {
            this.logger.log('Getting members of the ZSet data type stored at key.');
            const { keyName, sortOrder } = getZSetDto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const total = await client.sendCommand([browser_tool_commands_1.BrowserToolZSetCommands.ZCard, keyName]);
            if (!total) {
                this.logger.error(`Failed to get members of the ZSet data type. Not Found key: ${keyName}.`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            let members = [];
            if (sortOrder && sortOrder === sort_1.SortOrder.Asc) {
                members = await this.getZRange(client, getZSetDto);
            }
            else {
                members = await this.getZRevRange(client, getZSetDto);
            }
            this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.RTS, { members, keyName });
            this.logger.log('Succeed to get members of the ZSet data type.');
            return (0, class_transformer_1.plainToClass)(dto_1.GetZSetResponse, {
                keyName,
                total,
                members,
            });
        }
        catch (error) {
            this.logger.error('Failed to get members of the ZSet data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async addMembers(clientMetadata, dto) {
        try {
            this.logger.log('Adding members to the ZSet data type.');
            const { keyName, members } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const args = this.formatMembersDtoToCommandArgs(members);
            await client.sendCommand([browser_tool_commands_1.BrowserToolZSetCommands.ZAdd, keyName, ...args]);
            this.logger.log('Succeed to add members to ZSet data type.');
            return null;
        }
        catch (error) {
            this.logger.error('Failed to add members to Set data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async updateMember(clientMetadata, dto) {
        try {
            this.logger.log('Updating member in ZSet data type.');
            const { keyName, member } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const result = await client.sendCommand([
                browser_tool_commands_1.BrowserToolZSetCommands.ZAdd,
                keyName,
                'XX',
                'CH',
                `${member.score}`,
                member.name,
            ]);
            if (!result) {
                this.logger.error(`Failed to update member in ZSet data type. ${error_messages_1.default.MEMBER_IN_SET_NOT_EXIST}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.MEMBER_IN_SET_NOT_EXIST));
            }
            this.logger.log('Succeed to update member in ZSet data type.');
            return null;
        }
        catch (error) {
            this.logger.error('Failed to update member in ZSet data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async deleteMembers(clientMetadata, dto) {
        try {
            this.logger.log('Deleting members from the ZSet data type.');
            const { keyName, members } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const result = await client.sendCommand([browser_tool_commands_1.BrowserToolZSetCommands.ZRem, keyName, ...members]);
            this.logger.log('Succeed to delete members from the ZSet data type.');
            return { affected: result };
        }
        catch (error) {
            this.logger.error('Failed to delete members from the ZSet data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async searchMembers(clientMetadata, dto) {
        try {
            this.logger.log('Search members of the ZSet data type stored at key.');
            const { keyName, cursor, match } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            let result = {
                keyName,
                total: 0,
                members: [],
                nextCursor: cursor,
            };
            result.total = await client.sendCommand([browser_tool_commands_1.BrowserToolZSetCommands.ZCard, keyName]);
            if (!result.total) {
                this.logger.error(`Failed to search members of the ZSet data type. Not Found key: ${keyName}.`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            if (match && !(0, utils_1.isRedisGlob)(match)) {
                const member = (0, utils_1.unescapeRedisGlob)(match);
                result.nextCursor = 0;
                const score = await client.sendCommand([browser_tool_commands_1.BrowserToolZSetCommands.ZScore, keyName, member]);
                const formattedScore = (0, lodash_1.isNaN)(parseFloat(score)) ? String(score) : parseFloat(score);
                if (!(0, lodash_1.isNull)(score)) {
                    result.members.push((0, class_transformer_1.plainToClass)(dto_1.ZSetMemberDto, { name: member, score: formattedScore }));
                }
            }
            else {
                const scanResult = await this.scanZSet(client, dto);
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
    async getZRange(client, getZSetDto) {
        const { keyName, offset, count } = getZSetDto;
        const execResult = await client.sendCommand([
            browser_tool_commands_1.BrowserToolZSetCommands.ZRange,
            keyName,
            offset,
            offset + count - 1,
            'WITHSCORES',
        ]);
        return this.formatZRangeWithScoresReply(execResult);
    }
    async getZRevRange(client, getZSetDto) {
        const { keyName, offset, count } = getZSetDto;
        const execResult = await client.sendCommand([
            browser_tool_commands_1.BrowserToolZSetCommands.ZRevRange,
            keyName,
            offset,
            offset + count - 1,
            'WITHSCORES',
        ]);
        return this.formatZRangeWithScoresReply(execResult);
    }
    async createSimpleZSet(client, dto) {
        const { keyName, members } = dto;
        const args = this.formatMembersDtoToCommandArgs(members);
        return await client.sendCommand([browser_tool_commands_1.BrowserToolZSetCommands.ZAdd, keyName, ...args]);
    }
    async createZSetWithExpiration(client, dto) {
        const { keyName, members, expire } = dto;
        const args = this.formatMembersDtoToCommandArgs(members);
        const transactionResults = await client.sendPipeline([
            [browser_tool_commands_1.BrowserToolZSetCommands.ZAdd, keyName, ...args],
            [browser_tool_commands_1.BrowserToolKeysCommands.Expire, keyName, expire],
        ]);
        (0, utils_1.catchMultiTransactionError)(transactionResults);
        const execResult = transactionResults.map((item) => item[1]);
        const [added] = execResult;
        return added;
    }
    async scanZSet(client, dto) {
        const { keyName, cursor } = dto;
        const count = dto.count || REDIS_SCAN_CONFIG.countDefault;
        const match = dto.match !== undefined ? dto.match : '*';
        let result = {
            keyName,
            nextCursor: null,
            members: [],
        };
        while (result.nextCursor !== 0 && result.members.length < count) {
            const scanResult = await client.sendCommand([
                browser_tool_commands_1.BrowserToolZSetCommands.ZScan,
                keyName,
                `${result.nextCursor || cursor}`,
                'MATCH',
                match,
                'COUNT',
                count,
            ]);
            const nextCursor = scanResult[0];
            const membersArray = scanResult[1];
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
ZSetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory,
        database_recommendation_service_1.DatabaseRecommendationService])
], ZSetService);
exports.ZSetService = ZSetService;
