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
exports.HashService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const utils_1 = require("../../../utils");
const error_messages_1 = require("../../../constants/error-messages");
const constants_1 = require("../../../constants");
const config_1 = require("../../../utils/config");
const browser_tool_commands_1 = require("../constants/browser-tool-commands");
const class_transformer_1 = require("class-transformer");
const database_recommendation_service_1 = require("../../database-recommendation/database-recommendation.service");
const dto_1 = require("./dto");
const database_client_factory_1 = require("../../database/providers/database.client.factory");
const utils_2 = require("../utils");
const REDIS_SCAN_CONFIG = config_1.default.get('redis_scan');
let HashService = class HashService {
    constructor(databaseClientFactory, recommendationService) {
        this.databaseClientFactory = databaseClientFactory;
        this.recommendationService = recommendationService;
        this.logger = new common_1.Logger('HashService');
    }
    async createHash(clientMetadata, dto) {
        try {
            this.logger.log('Creating Hash data type.');
            const { keyName, fields, expire } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyExists)(keyName, client);
            const args = (0, lodash_1.flatMap)(fields, ({ field, value }) => [field, value]);
            if (expire) {
                await this.createHashWithExpiration(client, keyName, args, expire);
            }
            else {
                await this.createSimpleHash(client, keyName, args);
            }
            this.logger.log('Succeed to create Hash data type.');
            return null;
        }
        catch (error) {
            this.logger.error('Failed to create Hash data type.', error);
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async getFields(clientMetadata, dto) {
        try {
            this.logger.log('Getting fields of the Hash data type stored at key.');
            const { keyName, cursor, match } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            let result = {
                keyName,
                total: 0,
                fields: [],
                nextCursor: cursor,
            };
            result.total = await client.sendCommand([browser_tool_commands_1.BrowserToolHashCommands.HLen, keyName]);
            if (!result.total) {
                this.logger.error(`Failed to get fields of the Hash data type. Not Found key: ${keyName}.`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            if (match && !(0, utils_1.isRedisGlob)(match)) {
                const field = (0, utils_1.unescapeRedisGlob)(match);
                result.nextCursor = 0;
                const value = await client.sendCommand([browser_tool_commands_1.BrowserToolHashCommands.HGet, keyName, field]);
                if (!(0, lodash_1.isNull)(value)) {
                    result.fields.push((0, class_transformer_1.plainToClass)(dto_1.HashFieldDto, { field, value }));
                }
            }
            else {
                const scanResult = await this.scanHash(client, dto);
                result = { ...result, ...scanResult };
            }
            this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.BIG_HASHES, { total: result.total, keyName });
            this.logger.log('Succeed to get fields of the Hash data type.');
            return (0, class_transformer_1.plainToClass)(dto_1.GetHashFieldsResponse, result);
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
        try {
            this.logger.log('Adding fields to the Hash data type.');
            const { keyName, fields } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const args = (0, lodash_1.flatMap)(fields, ({ field, value }) => [field, value]);
            await client.sendCommand([browser_tool_commands_1.BrowserToolHashCommands.HSet, keyName, ...args]);
            this.logger.log('Succeed to add fields to Hash data type.');
            return null;
        }
        catch (error) {
            this.logger.error('Failed to add fields to Hash data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async deleteFields(clientMetadata, dto) {
        try {
            this.logger.log('Deleting fields from the Hash data type.');
            const { keyName, fields } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const result = await client.sendCommand([browser_tool_commands_1.BrowserToolHashCommands.HDel, keyName, ...fields]);
            this.logger.log('Succeed to delete fields from the Hash data type.');
            return { affected: result };
        }
        catch (error) {
            this.logger.error('Failed to delete fields from the Hash data type.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async createSimpleHash(client, key, args) {
        await client.sendCommand([browser_tool_commands_1.BrowserToolHashCommands.HSet, key, ...args]);
    }
    async createHashWithExpiration(client, key, args, expire) {
        const transactionResults = await client.sendPipeline([
            [browser_tool_commands_1.BrowserToolHashCommands.HSet, key, ...args],
            [browser_tool_commands_1.BrowserToolKeysCommands.Expire, key, expire],
        ]);
        (0, utils_1.catchMultiTransactionError)(transactionResults);
    }
    async scanHash(client, dto) {
        const { keyName, cursor } = dto;
        const count = dto.count || REDIS_SCAN_CONFIG.countDefault;
        const match = dto.match !== undefined ? dto.match : '*';
        let result = {
            keyName,
            nextCursor: null,
            fields: [],
        };
        while (result.nextCursor !== 0 && result.fields.length < count) {
            const scanResult = await client.sendCommand([
                browser_tool_commands_1.BrowserToolHashCommands.HScan,
                keyName,
                `${result.nextCursor || cursor}`,
                'MATCH',
                match,
                'COUNT',
                count,
            ]);
            const nextCursor = scanResult[0];
            const fieldsArray = scanResult[1];
            const fields = (0, lodash_1.chunk)(fieldsArray, 2).map(([field, value]) => (0, class_transformer_1.plainToClass)(dto_1.HashFieldDto, { field, value }));
            result = {
                ...result,
                nextCursor: parseInt(nextCursor, 10),
                fields: [...result.fields, ...fields],
            };
        }
        return result;
    }
};
HashService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory,
        database_recommendation_service_1.DatabaseRecommendationService])
], HashService);
exports.HashService = HashService;
