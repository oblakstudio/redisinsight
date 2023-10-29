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
exports.KeysBusinessService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const utils_1 = require("../../../../utils");
const error_messages_1 = require("../../../../constants/error-messages");
const dto_1 = require("../../dto");
const browser_tool_commands_1 = require("../../constants/browser-tool-commands");
const browser_tool_service_1 = require("../browser-tool/browser-tool.service");
const browser_tool_cluster_service_1 = require("../browser-tool-cluster/browser-tool-cluster.service");
const database_entity_1 = require("../../../database/entities/database.entity");
const scanner_1 = require("./scanner/scanner");
const constants_2 = require("../../../../common/constants");
const class_transformer_1 = require("class-transformer");
const settings_service_1 = require("../../../settings/settings.service");
const database_service_1 = require("../../../database/database.service");
const database_recommendation_service_1 = require("../../../database-recommendation/database-recommendation.service");
const lodash_1 = require("lodash");
const standalone_strategy_1 = require("./scanner/strategies/standalone.strategy");
const cluster_strategy_1 = require("./scanner/strategies/cluster.strategy");
const key_info_manager_1 = require("./key-info-manager/key-info-manager");
const unsupported_type_info_strategy_1 = require("./key-info-manager/strategies/unsupported-type-info/unsupported-type-info.strategy");
const string_type_info_strategy_1 = require("./key-info-manager/strategies/string-type-info/string-type-info.strategy");
const hash_type_info_strategy_1 = require("./key-info-manager/strategies/hash-type-info/hash-type-info.strategy");
const list_type_info_strategy_1 = require("./key-info-manager/strategies/list-type-info/list-type-info.strategy");
const set_type_info_strategy_1 = require("./key-info-manager/strategies/set-type-info/set-type-info.strategy");
const z_set_type_info_strategy_1 = require("./key-info-manager/strategies/z-set-type-info/z-set-type-info.strategy");
const stream_type_info_strategy_1 = require("./key-info-manager/strategies/stream-type-info/stream-type-info.strategy");
const rejson_rl_type_info_strategy_1 = require("./key-info-manager/strategies/rejson-rl-type-info/rejson-rl-type-info.strategy");
const ts_type_info_strategy_1 = require("./key-info-manager/strategies/ts-type-info/ts-type-info.strategy");
const graph_type_info_strategy_1 = require("./key-info-manager/strategies/graph-type-info/graph-type-info.strategy");
const browser_history_service_1 = require("../browser-history/browser-history.service");
const create_browser_history_dto_1 = require("../../dto/browser-history/create.browser-history.dto");
let KeysBusinessService = class KeysBusinessService {
    constructor(databaseService, browserTool, browserHistory, browserToolCluster, settingsService, recommendationService) {
        this.databaseService = databaseService;
        this.browserTool = browserTool;
        this.browserHistory = browserHistory;
        this.browserToolCluster = browserToolCluster;
        this.settingsService = settingsService;
        this.recommendationService = recommendationService;
        this.logger = new common_1.Logger('KeysBusinessService');
        this.scanner = new scanner_1.Scanner();
        this.keyInfoManager = new key_info_manager_1.KeyInfoManager(new unsupported_type_info_strategy_1.UnsupportedTypeInfoStrategy(browserTool));
        this.scanner.addStrategy(database_entity_1.ConnectionType.STANDALONE, new standalone_strategy_1.StandaloneStrategy(browserTool, settingsService));
        this.scanner.addStrategy(database_entity_1.ConnectionType.CLUSTER, new cluster_strategy_1.ClusterStrategy(browserToolCluster, settingsService));
        this.scanner.addStrategy(database_entity_1.ConnectionType.SENTINEL, new standalone_strategy_1.StandaloneStrategy(browserTool, settingsService));
        this.keyInfoManager.addStrategy(dto_1.RedisDataType.String, new string_type_info_strategy_1.StringTypeInfoStrategy(browserTool));
        this.keyInfoManager.addStrategy(dto_1.RedisDataType.Hash, new hash_type_info_strategy_1.HashTypeInfoStrategy(browserTool));
        this.keyInfoManager.addStrategy(dto_1.RedisDataType.List, new list_type_info_strategy_1.ListTypeInfoStrategy(browserTool));
        this.keyInfoManager.addStrategy(dto_1.RedisDataType.Set, new set_type_info_strategy_1.SetTypeInfoStrategy(browserTool));
        this.keyInfoManager.addStrategy(dto_1.RedisDataType.ZSet, new z_set_type_info_strategy_1.ZSetTypeInfoStrategy(browserTool));
        this.keyInfoManager.addStrategy(dto_1.RedisDataType.Stream, new stream_type_info_strategy_1.StreamTypeInfoStrategy(browserTool));
        this.keyInfoManager.addStrategy(dto_1.RedisDataType.JSON, new rejson_rl_type_info_strategy_1.RejsonRlTypeInfoStrategy(browserTool));
        this.keyInfoManager.addStrategy(dto_1.RedisDataType.TS, new ts_type_info_strategy_1.TSTypeInfoStrategy(browserTool));
        this.keyInfoManager.addStrategy(dto_1.RedisDataType.Graph, new graph_type_info_strategy_1.GraphTypeInfoStrategy(browserTool));
    }
    async getKeys(clientMetadata, dto) {
        var _a;
        try {
            this.logger.log('Getting keys with details.');
            const databaseInstance = await this.databaseService.get(clientMetadata.databaseId);
            const scanner = this.scanner.getStrategy(databaseInstance.connectionType);
            const result = await scanner.getKeys(clientMetadata, dto);
            if (dto.match !== constants_1.DEFAULT_MATCH) {
                await this.browserHistory.create(clientMetadata, (0, class_transformer_1.plainToClass)(create_browser_history_dto_1.CreateBrowserHistoryDto, { filter: (0, lodash_1.pick)(dto, 'type', 'match'), mode: constants_2.BrowserHistoryMode.Pattern }));
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
            const client = await this.browserTool.getRedisClient(clientMetadata);
            const scanner = this.scanner.getStrategy(client.isCluster ? database_entity_1.ConnectionType.CLUSTER : database_entity_1.ConnectionType.STANDALONE);
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
        this.logger.log('Getting key info.');
        try {
            const type = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Type, [key], 'utf8');
            if (type === 'none') {
                this.logger.error(`Failed to get key info. Not found key: ${key}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            const infoManager = this.keyInfoManager.getStrategy(type);
            const result = await infoManager.getInfo(clientMetadata, key, type);
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
        this.logger.log('Deleting keys');
        let result;
        try {
            result = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Del, keys);
        }
        catch (error) {
            this.logger.error('Failed to delete keys.', error);
            (0, utils_1.catchAclError)(error);
        }
        if (!result) {
            this.logger.error('Failed to delete keys. Not Found keys');
            throw new common_1.NotFoundException();
        }
        this.logger.log('Succeed to delete keys');
        return { affected: result };
    }
    async renameKey(clientMetadata, dto) {
        this.logger.log('Renaming key');
        const { keyName, newKeyName } = dto;
        let result;
        try {
            const isExist = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (!isExist) {
                this.logger.error(`Failed to rename key. ${error_messages_1.default.KEY_NOT_EXIST} key: ${keyName}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            result = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.RenameNX, [keyName, newKeyName]);
        }
        catch (error) {
            this.logger.error('Failed to rename key.', error);
            (0, utils_1.catchAclError)(error);
        }
        if (!result) {
            this.logger.error(`Failed to rename key. ${error_messages_1.default.NEW_KEY_NAME_EXIST} key: ${newKeyName}`);
            throw new common_1.BadRequestException(error_messages_1.default.NEW_KEY_NAME_EXIST);
        }
        this.logger.log('Succeed to rename key');
        return (0, class_transformer_1.plainToClass)(dto_1.RenameKeyResponse, { keyName: newKeyName });
    }
    async updateTtl(clientMetadata, dto) {
        if (dto.ttl === -1) {
            return await this.removeKeyExpiration(clientMetadata, dto);
        }
        return await this.setKeyExpiration(clientMetadata, dto);
    }
    async setKeyExpiration(clientMetadata, dto) {
        this.logger.log('Setting a timeout on key.');
        const { keyName, ttl } = dto;
        let result;
        try {
            await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Ttl, [keyName]);
            result = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Expire, [keyName, ttl]);
        }
        catch (error) {
            this.logger.error('Failed to set a timeout on key.', error);
            (0, utils_1.catchAclError)(error);
        }
        if (!result) {
            this.logger.error(`Failed to set a timeout on key. ${error_messages_1.default.KEY_NOT_EXIST} key: ${keyName}`);
            throw new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST);
        }
        this.logger.log('Succeed to set a timeout on key.');
        return { ttl: ttl >= 0 ? ttl : -2 };
    }
    async removeKeyExpiration(clientMetadata, dto) {
        this.logger.log('Removing the existing timeout on key.');
        const { keyName } = dto;
        try {
            const currentTtl = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Ttl, [keyName]);
            if (currentTtl === -2) {
                this.logger.error(`Failed to remove the existing timeout on key. ${error_messages_1.default.KEY_NOT_EXIST} key: ${keyName}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            if (currentTtl > 0) {
                await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Persist, [keyName]);
            }
        }
        catch (error) {
            this.logger.error('Failed to remove the existing timeout on key.', error);
            (0, utils_1.catchAclError)(error);
        }
        this.logger.log('Succeed to remove the existing timeout on key.');
        return { ttl: -1 };
    }
};
KeysBusinessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        browser_tool_service_1.BrowserToolService,
        browser_history_service_1.BrowserHistoryService,
        browser_tool_cluster_service_1.BrowserToolClusterService,
        settings_service_1.SettingsService,
        database_recommendation_service_1.DatabaseRecommendationService])
], KeysBusinessService);
exports.KeysBusinessService = KeysBusinessService;
