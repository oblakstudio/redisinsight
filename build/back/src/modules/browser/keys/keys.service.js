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
exports.KeysService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../constants");
const utils_1 = require("../../../utils");
const error_messages_1 = require("../../../constants/error-messages");
const dto_1 = require("./dto");
const browser_tool_commands_1 = require("../constants/browser-tool-commands");
const scanner_1 = require("./scanner/scanner");
const constants_2 = require("../../../common/constants");
const class_transformer_1 = require("class-transformer");
const database_recommendation_service_1 = require("../../database-recommendation/database-recommendation.service");
const lodash_1 = require("lodash");
const browser_history_service_1 = require("../browser-history/browser-history.service");
const dto_2 = require("../browser-history/dto");
const key_info_provider_1 = require("./key-info/key-info.provider");
const database_client_factory_1 = require("../../database/providers/database.client.factory");
const utils_2 = require("../utils");
let KeysService = class KeysService {
    constructor(databaseClientFactory, scanner, keyInfoProvider, browserHistory, recommendationService) {
        this.databaseClientFactory = databaseClientFactory;
        this.scanner = scanner;
        this.keyInfoProvider = keyInfoProvider;
        this.browserHistory = browserHistory;
        this.recommendationService = recommendationService;
        this.logger = new common_1.Logger('KeysService');
    }
    async getKeys(clientMetadata, dto) {
        var _a;
        try {
            this.logger.log('Getting keys with details.');
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const scanner = this.scanner.getStrategy(client.getConnectionType());
            const result = await scanner.getKeys(client, dto);
            if (dto.match !== constants_1.DEFAULT_MATCH) {
                await this.browserHistory.create(clientMetadata, (0, class_transformer_1.plainToClass)(dto_2.CreateBrowserHistoryDto, { filter: (0, lodash_1.pick)(dto, 'type', 'match'), mode: constants_2.BrowserHistoryMode.Pattern }));
            }
            this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.USE_SMALLER_KEYS, (_a = result[0]) === null || _a === void 0 ? void 0 : _a.total);
            return result.map((nodeResult) => (0, class_transformer_1.plainToClass)(dto_1.GetKeysWithDetailsResponse, nodeResult));
        }
        catch (error) {
            this.logger.error(`Failed to get keys with details info. ${error.message}.`);
            if (error.message.includes(constants_1.RedisErrorCodes.CommandSyntaxError)
                && dto.type) {
                throw new common_1.BadRequestException(error_messages_1.default.SCAN_PER_KEY_TYPE_NOT_SUPPORT());
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async getKeysInfo(clientMetadata, dto) {
        try {
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const scanner = this.scanner.getStrategy(client.getConnectionType());
            const result = await scanner.getKeysInfo(client, dto.keys, dto.type);
            this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.SEARCH_JSON, { keys: result, client, databaseId: clientMetadata.databaseId });
            this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.FUNCTIONS_WITH_STREAMS, { keys: result, client, databaseId: clientMetadata.databaseId });
            return (0, class_transformer_1.plainToClass)(dto_1.GetKeyInfoResponse, result);
        }
        catch (error) {
            this.logger.error(`Failed to get keys info: ${error.message}.`);
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async getKeyInfo(clientMetadata, key) {
        try {
            this.logger.log('Getting key info.');
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const type = await client.sendCommand([
                browser_tool_commands_1.BrowserToolKeysCommands.Type,
                key,
            ], {
                replyEncoding: 'utf8',
            });
            if (type === 'none') {
                this.logger.error(`Failed to get key info. Not found key: ${key}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            const result = await this.keyInfoProvider.getStrategy(type).getInfo(client, key, type);
            this.logger.log('Succeed to get key info');
            this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.BIG_SETS, result);
            this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.BIG_STRINGS, result);
            this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.COMPRESSION_FOR_LIST, result);
            return (0, class_transformer_1.plainToClass)(dto_1.GetKeyInfoResponse, result);
        }
        catch (error) {
            this.logger.error('Failed to get key info.', error);
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async deleteKeys(clientMetadata, keys) {
        try {
            this.logger.log('Deleting keys');
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const result = await client.sendCommand([
                browser_tool_commands_1.BrowserToolKeysCommands.Del,
                ...keys,
            ]);
            if (!result) {
                this.logger.error('Failed to delete keys. Not Found keys');
                return Promise.reject(new common_1.NotFoundException());
            }
            this.logger.log('Succeed to delete keys');
            return { affected: result };
        }
        catch (error) {
            this.logger.error('Failed to delete keys.', error);
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async renameKey(clientMetadata, dto) {
        try {
            this.logger.log('Renaming key');
            const { keyName, newKeyName } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const result = await client.sendCommand([
                browser_tool_commands_1.BrowserToolKeysCommands.RenameNX,
                keyName,
                newKeyName,
            ]);
            if (!result) {
                this.logger.error(`Failed to rename key. ${error_messages_1.default.NEW_KEY_NAME_EXIST} key: ${newKeyName}`);
                return Promise.reject(new common_1.BadRequestException(error_messages_1.default.NEW_KEY_NAME_EXIST));
            }
            this.logger.log('Succeed to rename key');
            return (0, class_transformer_1.plainToClass)(dto_1.RenameKeyResponse, { keyName: newKeyName });
        }
        catch (error) {
            this.logger.error('Failed to rename key.', error);
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async updateTtl(clientMetadata, dto) {
        if (dto.ttl === -1) {
            return await this.removeKeyExpiration(clientMetadata, dto);
        }
        return await this.setKeyExpiration(clientMetadata, dto);
    }
    async setKeyExpiration(clientMetadata, dto) {
        try {
            this.logger.log('Setting a timeout on key.');
            const { keyName, ttl } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const result = await client.sendCommand([
                browser_tool_commands_1.BrowserToolKeysCommands.Expire,
                keyName,
                ttl,
            ]);
            if (!result) {
                this.logger.error(`Failed to set a timeout on key. ${error_messages_1.default.KEY_NOT_EXIST} key: ${keyName}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            this.logger.log('Succeed to set a timeout on key.');
            return {
                ttl: ttl >= 0 ? ttl : -2,
            };
        }
        catch (error) {
            this.logger.error('Failed to set a timeout on key.', error);
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async removeKeyExpiration(clientMetadata, dto) {
        try {
            this.logger.log('Removing the existing timeout on key.');
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const currentTtl = await client.sendCommand([
                browser_tool_commands_1.BrowserToolKeysCommands.Ttl,
                dto.keyName,
            ]);
            if (currentTtl === -2) {
                this.logger.error(`Failed to remove the existing timeout on key. ${error_messages_1.default.KEY_NOT_EXIST} key: ${dto.keyName}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            if (currentTtl > 0) {
                await client.sendCommand([
                    browser_tool_commands_1.BrowserToolKeysCommands.Persist,
                    dto.keyName,
                ]);
            }
            this.logger.log('Succeed to remove the existing timeout on key.');
            return { ttl: -1 };
        }
        catch (error) {
            this.logger.error('Failed to remove the existing timeout on key.', error);
            throw (0, utils_1.catchAclError)(error);
        }
    }
};
KeysService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory,
        scanner_1.Scanner,
        key_info_provider_1.KeyInfoProvider,
        browser_history_service_1.BrowserHistoryService,
        database_recommendation_service_1.DatabaseRecommendationService])
], KeysService);
exports.KeysService = KeysService;
