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
exports.SetService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../constants");
const error_messages_1 = require("../../../constants/error-messages");
const config_1 = require("../../../utils/config");
const utils_1 = require("../../../utils");
const browser_tool_commands_1 = require("../constants/browser-tool-commands");
const class_transformer_1 = require("class-transformer");
const dto_1 = require("./dto");
const database_client_factory_1 = require("../../database/providers/database.client.factory");
const utils_2 = require("../utils");
const REDIS_SCAN_CONFIG = config_1.default.get('redis_scan');
let SetService = class SetService {
    constructor(databaseClientFactory) {
        this.databaseClientFactory = databaseClientFactory;
        this.logger = new common_1.Logger('SetService');
    }
    async createSet(clientMetadata, dto) {
        try {
            this.logger.log('Creating Set data type.');
            const { keyName, expire } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyExists)(keyName, client);
            if (expire) {
                await this.createSetWithExpiration(client, dto);
            }
            else {
                await this.createSimpleSet(client, dto);
            }
            this.logger.log('Succeed to create Set data type.');
            return null;
        }
        catch (error) {
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            this.logger.error('Failed to create Set data type.', error);
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async getMembers(clientMetadata, dto) {
        try {
            this.logger.log('Getting members of the Set data type stored at key.');
            const { keyName, cursor, match } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            let result = {
                keyName,
                total: 0,
                members: [],
                nextCursor: cursor,
            };
            result.total = await client.sendCommand([browser_tool_commands_1.BrowserToolSetCommands.SCard, keyName]);
            if (!result.total) {
                this.logger.error(`Failed to get members of the Set data type. Not Found key: ${keyName}.`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            if (match && !(0, utils_1.isRedisGlob)(match)) {
                const member = (0, utils_1.unescapeRedisGlob)(match);
                result.nextCursor = 0;
                const memberIsExist = await client.sendCommand([
                    browser_tool_commands_1.BrowserToolSetCommands.SIsMember,
                    keyName,
                    member,
                ]);
                if (memberIsExist) {
                    result.members.push(member);
                }
            }
            else {
                const scanResult = await this.scanSet(client, dto);
                result = { ...result, ...scanResult };
            }
            this.logger.log('Succeed to get members of the Set data type.');
            return (0, class_transformer_1.plainToClass)(dto_1.GetSetMembersResponse, result);
        }
        catch (error) {
            this.logger.error('Failed to get members of the Set data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async addMembers(clientMetadata, dto) {
        try {
            this.logger.log('Adding members to the Set data type.');
            const { keyName, members } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            await client.sendCommand([browser_tool_commands_1.BrowserToolSetCommands.SAdd, keyName, ...members]);
            this.logger.log('Succeed to add members to Set data type.');
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
    async deleteMembers(clientMetadata, dto) {
        try {
            this.logger.log('Deleting members from the Set data type.');
            const { keyName, members } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const result = await client.sendCommand([
                browser_tool_commands_1.BrowserToolSetCommands.SRem,
                keyName,
                ...members,
            ]);
            this.logger.log('Succeed to delete members from the Set data type.');
            return { affected: result };
        }
        catch (error) {
            this.logger.error('Failed to delete members from the Set data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async createSimpleSet(client, dto) {
        const { keyName, members } = dto;
        await client.sendCommand([browser_tool_commands_1.BrowserToolSetCommands.SAdd, keyName, ...members]);
    }
    async createSetWithExpiration(client, dto) {
        const { keyName, members, expire } = dto;
        const transactionResults = await client.sendPipeline([
            [browser_tool_commands_1.BrowserToolSetCommands.SAdd, keyName, ...members],
            [browser_tool_commands_1.BrowserToolKeysCommands.Expire, keyName, expire],
        ]);
        (0, utils_1.catchMultiTransactionError)(transactionResults);
        const execResult = transactionResults.map((item) => item[1]);
        const [added] = execResult;
        return added;
    }
    async scanSet(client, dto) {
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
                browser_tool_commands_1.BrowserToolSetCommands.SScan,
                keyName,
                `${result.nextCursor || cursor}`,
                'MATCH',
                match,
                'COUNT',
                count,
            ]);
            const nextCursor = scanResult[0];
            const members = scanResult[1];
            result = {
                ...result,
                nextCursor: parseInt(nextCursor, 10),
                members: [...result.members, ...members],
            };
        }
        return result;
    }
};
SetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory])
], SetService);
exports.SetService = SetService;
