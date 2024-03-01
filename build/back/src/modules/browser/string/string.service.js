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
exports.StringService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../constants");
const utils_1 = require("../../../utils");
const dto_1 = require("./dto");
const browser_tool_commands_1 = require("../constants/browser-tool-commands");
const class_transformer_1 = require("class-transformer");
const database_recommendation_service_1 = require("../../database-recommendation/database-recommendation.service");
const stream_1 = require("stream");
const database_client_factory_1 = require("../../database/providers/database.client.factory");
const utils_2 = require("../utils");
let StringService = class StringService {
    constructor(databaseClientFactory, recommendationService) {
        this.databaseClientFactory = databaseClientFactory;
        this.recommendationService = recommendationService;
        this.logger = new common_1.Logger('StringService');
    }
    async setString(clientMetadata, dto) {
        try {
            this.logger.log('Setting string key type.');
            const { keyName, value, expire } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyExists)(keyName, client);
            if (expire) {
                await client.sendCommand([
                    browser_tool_commands_1.BrowserToolStringCommands.Set,
                    keyName,
                    value,
                    'EX',
                    `${expire}`,
                    'NX',
                ]);
            }
            else {
                await client.sendCommand([
                    browser_tool_commands_1.BrowserToolStringCommands.Set,
                    keyName,
                    value,
                    'NX',
                ]);
            }
            this.logger.log('Succeed to set string key type.');
            return null;
        }
        catch (error) {
            this.logger.error('Failed to set string key type', error);
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async getStringValue(clientMetadata, dto) {
        try {
            this.logger.log('Getting string value.');
            const { keyName, start, end } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            let value;
            if (end) {
                value = await client.sendCommand([
                    browser_tool_commands_1.BrowserToolStringCommands.Getrange,
                    keyName,
                    `${start}`,
                    `${end}`,
                ]);
            }
            else {
                value = await client.sendCommand([browser_tool_commands_1.BrowserToolStringCommands.Get, keyName]);
            }
            this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.STRING_TO_JSON, { value, keyName });
            this.logger.log('Succeed to get string value.');
            return (0, class_transformer_1.plainToClass)(dto_1.GetStringValueResponse, { value, keyName });
        }
        catch (error) {
            this.logger.error('Failed to get string value.', error);
            if (error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async downloadStringValue(clientMetadata, dto) {
        const result = await this.getStringValue(clientMetadata, dto);
        const stream = stream_1.Readable.from(result.value);
        return { stream };
    }
    async updateStringValue(clientMetadata, dto) {
        try {
            this.logger.log('Updating string value.');
            const { keyName, value } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const ttl = await client.sendCommand([browser_tool_commands_1.BrowserToolKeysCommands.Ttl, keyName]);
            const result = await client.sendCommand([browser_tool_commands_1.BrowserToolStringCommands.Set, keyName, value, 'XX']);
            if (result && ttl > 0) {
                await client.sendCommand([browser_tool_commands_1.BrowserToolKeysCommands.Expire, keyName, ttl]);
            }
            this.logger.log('Succeed to update string value.');
            return null;
        }
        catch (error) {
            this.logger.error('Failed to update string value.', error);
            throw (0, utils_1.catchAclError)(error);
        }
    }
};
StringService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory,
        database_recommendation_service_1.DatabaseRecommendationService])
], StringService);
exports.StringService = StringService;
