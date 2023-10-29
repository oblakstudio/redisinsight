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
exports.HashBusinessService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const utils_1 = require("../../../../utils");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
const config_1 = require("../../../../utils/config");
const browser_tool_service_1 = require("../browser-tool/browser-tool.service");
const browser_tool_commands_1 = require("../../constants/browser-tool-commands");
const class_transformer_1 = require("class-transformer");
const database_recommendation_service_1 = require("../../../database-recommendation/database-recommendation.service");
const hash_dto_1 = require("../../dto/hash.dto");
const REDIS_SCAN_CONFIG = config_1.default.get('redis_scan');
let HashBusinessService = class HashBusinessService {
    constructor(browserTool, recommendationService) {
        this.browserTool = browserTool;
        this.recommendationService = recommendationService;
        this.logger = new common_1.Logger('hashBusinessService');
    }
    async createHash(clientMetadata, dto) {
        this.logger.log('Creating Hash data type.');
        const { keyName, fields } = dto;
        try {
            const isExist = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (isExist) {
                this.logger.error(`Failed to create Hash data type. ${error_messages_1.default.KEY_NAME_EXIST} key: ${keyName}`);
                return Promise.reject(new common_1.ConflictException(error_messages_1.default.KEY_NAME_EXIST));
            }
            const args = (0, lodash_1.flatMap)(fields, ({ field, value }) => [field, value]);
            if (dto.expire) {
                await this.createHashWithExpiration(clientMetadata, keyName, args, dto.expire);
            }
            else {
                await this.createSimpleHash(clientMetadata, keyName, args);
            }
            this.logger.log('Succeed to create Hash data type.');
        }
        catch (error) {
            this.logger.error('Failed to create Hash data type.', error);
            (0, utils_1.catchAclError)(error);
        }
        return null;
    }
    async getFields(clientMetadata, dto) {
        this.logger.log('Getting fields of the Hash data type stored at key.');
        const { keyName } = dto;
        let result = {
            keyName,
            total: 0,
            fields: [],
            nextCursor: dto.cursor,
        };
        try {
            result.total = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolHashCommands.HLen, [keyName]);
            if (!result.total) {
                this.logger.error(`Failed to get fields of the Hash data type. Not Found key: ${keyName}.`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            if (dto.match && !(0, utils_1.isRedisGlob)(dto.match)) {
                const field = (0, utils_1.unescapeRedisGlob)(dto.match);
                result.nextCursor = 0;
                const value = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolHashCommands.HGet, [keyName, field]);
                if (!(0, lodash_1.isNull)(value)) {
                    result.fields.push((0, class_transformer_1.plainToClass)(hash_dto_1.HashFieldDto, { field, value }));
                }
            }
            else {
                const scanResult = await this.scanHash(clientMetadata, dto);
                result = { ...result, ...scanResult };
            }
            this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.BIG_HASHES, { total: result.total, keyName });
            this.logger.log('Succeed to get fields of the Hash data type.');
            return (0, class_transformer_1.plainToClass)(hash_dto_1.GetHashFieldsResponse, result);
        }
        catch (error) {
            this.logger.error('Failed to get fields of the Hash data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async addFields(clientMetadata, dto) {
        this.logger.log('Adding fields to the Hash data type.');
        const { keyName, fields } = dto;
        try {
            const isExist = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (!isExist) {
                this.logger.error(`Failed to add fields to Hash data type. ${error_messages_1.default.KEY_NOT_EXIST} key: ${keyName}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            const args = (0, lodash_1.flatMap)(fields, ({ field, value }) => [field, value]);
            await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolHashCommands.HSet, [keyName, ...args]);
            this.logger.log('Succeed to add fields to Hash data type.');
        }
        catch (error) {
            this.logger.error('Failed to add fields to Hash data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            (0, utils_1.catchAclError)(error);
        }
        return null;
    }
    async deleteFields(clientMetadata, dto) {
        this.logger.log('Deleting fields from the Hash data type.');
        const { keyName, fields } = dto;
        let result;
        try {
            const isExist = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (!isExist) {
                this.logger.error(`Failed to delete fields from the Hash data type. ${error_messages_1.default.KEY_NOT_EXIST} key: ${keyName}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            result = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolHashCommands.HDel, [keyName, ...fields]);
        }
        catch (error) {
            this.logger.error('Failed to delete fields from the Hash data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            (0, utils_1.catchAclError)(error);
        }
        this.logger.log('Succeed to delete fields from the Hash data type.');
        return { affected: result };
    }
    async createSimpleHash(clientMetadata, key, args) {
        await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolHashCommands.HSet, [key, ...args]);
    }
    async createHashWithExpiration(clientMetadata, key, args, expire) {
        const [transactionError, transactionResults,] = await this.browserTool.execMulti(clientMetadata, [
            [browser_tool_commands_1.BrowserToolHashCommands.HSet, key, ...args],
            [browser_tool_commands_1.BrowserToolKeysCommands.Expire, key, expire],
        ]);
        (0, utils_1.catchTransactionError)(transactionError, transactionResults);
    }
    async scanHash(clientMetadata, dto) {
        const { keyName } = dto;
        const count = dto.count || REDIS_SCAN_CONFIG.countDefault;
        const match = dto.match !== undefined ? dto.match : '*';
        let result = {
            keyName,
            nextCursor: null,
            fields: [],
        };
        while (result.nextCursor !== 0 && result.fields.length < count) {
            const scanResult = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolHashCommands.HScan, [
                keyName,
                `${result.nextCursor || dto.cursor}`,
                'MATCH',
                match,
                'COUNT',
                count,
            ]);
            const [nextCursor, fieldsArray] = scanResult;
            const fields = (0, lodash_1.chunk)(fieldsArray, 2).map(([field, value]) => (0, class_transformer_1.plainToClass)(hash_dto_1.HashFieldDto, { field, value }));
            result = {
                ...result,
                nextCursor: parseInt(nextCursor, 10),
                fields: [...result.fields, ...fields],
            };
        }
        return result;
    }
};
HashBusinessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [browser_tool_service_1.BrowserToolService,
        database_recommendation_service_1.DatabaseRecommendationService])
], HashBusinessService);
exports.HashBusinessService = HashBusinessService;
