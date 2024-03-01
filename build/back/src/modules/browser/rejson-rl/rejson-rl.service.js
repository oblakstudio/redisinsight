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
exports.RejsonRlService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../constants");
const error_messages_1 = require("../../../constants/error-messages");
const utils_1 = require("../../../utils");
const config_1 = require("../../../utils/config");
const browser_tool_commands_1 = require("../constants/browser-tool-commands");
const database_client_factory_1 = require("../../database/providers/database.client.factory");
const utils_2 = require("../utils");
let RejsonRlService = class RejsonRlService {
    constructor(databaseClientFactory) {
        this.databaseClientFactory = databaseClientFactory;
        this.logger = new common_1.Logger('JsonService');
    }
    async forceGetJson(client, keyName, path) {
        const data = await client.sendCommand([
            browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonGet,
            keyName, path,
        ], { replyEncoding: 'utf8' });
        if (data === null) {
            throw new common_1.BadRequestException(`There is no such path: "${path}" in key: "${keyName}"`);
        }
        return JSON.parse(data);
    }
    async estimateSize(client, keyName, path) {
        let size = 0;
        try {
            size = await client.sendCommand([
                browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonDebug,
                'MEMORY',
                keyName,
                path,
            ]);
        }
        catch (error) {
            this.logger.error('Failed to estimate size of json.', error);
        }
        if (size === null) {
            throw new common_1.BadRequestException(`There is no such path: "${path}" in key: "${keyName}"`);
        }
        return size;
    }
    async getObjectKeys(client, keyName, path) {
        return await client.sendCommand([
            browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonObjKeys,
            keyName,
            path,
        ], { replyEncoding: 'utf8' });
    }
    async getJsonDataType(client, keyName, path) {
        return await client.sendCommand([
            browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonType,
            keyName,
            path,
        ], { replyEncoding: 'utf8' });
    }
    async getDetails(client, keyName, path, key) {
        const details = {
            key,
            path,
            cardinality: 1,
        };
        const objectKeyType = await this.getJsonDataType(client, keyName, path);
        details['type'] = objectKeyType;
        switch (objectKeyType) {
            case 'object':
                details['cardinality'] = await client.sendCommand([
                    browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonObjLen,
                    keyName,
                    path,
                ], { replyEncoding: 'utf8' });
                break;
            case 'array':
                details['cardinality'] = await client.sendCommand([
                    browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonArrLen,
                    keyName,
                    path,
                ], { replyEncoding: 'utf8' });
                break;
            default:
                details['value'] = await this.forceGetJson(client, keyName, path);
                break;
        }
        return details;
    }
    async safeGetJsonByType(client, keyName, path, type) {
        const result = [];
        let objectKeys;
        let arrayLength;
        switch (type) {
            case 'object':
                objectKeys = await this.getObjectKeys(client, keyName, path);
                for (const objectKey of objectKeys) {
                    const rootPath = path === '.' ? '' : path;
                    const childPath = objectKey.includes('"')
                        ? `['${objectKey}']`
                        : `["${objectKey}"]`;
                    const fullObjectKeyPath = `${rootPath}${childPath}`;
                    result.push(await this.getDetails(client, keyName, fullObjectKeyPath, objectKey));
                }
                break;
            case 'array':
                arrayLength = await client.sendCommand([
                    browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonArrLen,
                    keyName,
                    path,
                ], { replyEncoding: 'utf8' });
                for (let i = 0; i < arrayLength; i += 1) {
                    const fullObjectKeyPath = `${path === '.' ? '' : path}[${i}]`;
                    result.push(await this.getDetails(client, keyName, fullObjectKeyPath, i));
                }
                break;
            default:
                return this.forceGetJson(client, keyName, path);
        }
        return result;
    }
    async create(clientMetadata, dto) {
        try {
            this.logger.log('Creating REJSON-RL data type.');
            const { keyName, data, expire } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyExists)(keyName, client);
            await client.sendCommand([
                browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonSet,
                keyName,
                '.',
                data,
                'NX',
            ]);
            if (expire) {
                try {
                    await client.sendCommand([
                        browser_tool_commands_1.BrowserToolKeysCommands.Expire,
                        keyName,
                        expire,
                    ]);
                }
                catch (err) {
                    this.logger.error(`Unable to set expire ${expire} for REJSON-RL key ${keyName}.`);
                }
            }
            this.logger.log('Succeed to create REJSON-RL key type.');
        }
        catch (error) {
            this.logger.error('Failed to create REJSON-RL key type.', error);
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            if (error.message.includes(constants_1.RedisErrorCodes.UnknownCommand)) {
                throw new common_1.BadRequestException(error_messages_1.default.REDIS_MODULE_IS_REQUIRED('RedisJSON'));
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async getJson(clientMetadata, dto) {
        try {
            this.logger.log('Getting json by key.');
            const { keyName, path, forceRetrieve } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const result = {
                downloaded: true,
                path,
                data: null,
            };
            if (forceRetrieve) {
                result.data = await this.forceGetJson(client, keyName, path);
                return result;
            }
            const jsonSize = await this.estimateSize(client, keyName, path);
            if (jsonSize > config_1.default.get('modules')['json']['sizeThreshold']) {
                const type = await this.getJsonDataType(client, keyName, path);
                result.downloaded = false;
                result.type = type;
                result.data = await this.safeGetJsonByType(client, keyName, path, type);
            }
            else {
                result.data = await this.forceGetJson(client, keyName, path);
            }
            return result;
        }
        catch (error) {
            this.logger.error('Failed to get json.', error);
            if (error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            if (error.message.includes(constants_1.RedisErrorCodes.UnknownCommand)) {
                throw new common_1.BadRequestException(error_messages_1.default.REDIS_MODULE_IS_REQUIRED('RedisJSON'));
            }
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async jsonSet(clientMetadata, dto) {
        try {
            this.logger.log('Modifying REJSON-RL data type.');
            const { keyName, path, data } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            await this.getJsonDataType(client, keyName, path);
            await client.sendCommand([
                browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonSet,
                keyName,
                path,
                data,
            ]);
            this.logger.log('Succeed to modify REJSON-RL key type.');
        }
        catch (error) {
            this.logger.error('Failed to modify REJSON-RL key type.', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error.message.includes('index')
                && error.message.includes('out of range')) {
                throw new common_1.NotFoundException(error_messages_1.default.PATH_NOT_EXISTS());
            }
            if (error.message.includes(constants_1.RedisErrorCodes.UnknownCommand)) {
                throw new common_1.BadRequestException(error_messages_1.default.REDIS_MODULE_IS_REQUIRED('RedisJSON'));
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async arrAppend(clientMetadata, dto) {
        try {
            this.logger.log('Modifying REJSON-RL data type.');
            const { keyName, path, data } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            await client.sendCommand([
                browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonArrAppend,
                keyName,
                path,
                ...data,
            ]);
            this.logger.log('Succeed to modify REJSON-RL key type.');
        }
        catch (error) {
            this.logger.error('Failed to modify REJSON-RL key type', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error.message.includes(constants_1.RedisErrorCodes.UnknownCommand)) {
                throw new common_1.BadRequestException(error_messages_1.default.REDIS_MODULE_IS_REQUIRED('RedisJSON'));
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async remove(clientMetadata, dto) {
        try {
            this.logger.log('Removing REJSON-RL data.');
            const { keyName, path } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const affected = await client.sendCommand([
                browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonDel,
                keyName,
                path,
            ]);
            this.logger.log('Succeed to remove REJSON-RL path.');
            return { affected };
        }
        catch (error) {
            this.logger.error('Failed to remove REJSON-RL path.', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error.message.includes(constants_1.RedisErrorCodes.UnknownCommand)) {
                throw new common_1.BadRequestException(error_messages_1.default.REDIS_MODULE_IS_REQUIRED('RedisJSON'));
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
};
RejsonRlService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory])
], RejsonRlService);
exports.RejsonRlService = RejsonRlService;
