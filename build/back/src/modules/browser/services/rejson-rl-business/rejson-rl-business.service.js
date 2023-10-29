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
exports.RejsonRlBusinessService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const error_messages_1 = require("../../../../constants/error-messages");
const utils_1 = require("../../../../utils");
const config_1 = require("../../../../utils/config");
const browser_tool_commands_1 = require("../../constants/browser-tool-commands");
const browser_tool_service_1 = require("../browser-tool/browser-tool.service");
let RejsonRlBusinessService = class RejsonRlBusinessService {
    constructor(browserTool) {
        this.browserTool = browserTool;
        this.logger = new common_1.Logger('JsonBusinessService');
    }
    async forceGetJson(clientMetadata, keyName, path) {
        const data = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonGet, [keyName, path], 'utf8');
        if (data === null) {
            throw new common_1.BadRequestException(`There is no such path: "${path}" in key: "${keyName}"`);
        }
        return JSON.parse(data);
    }
    async estimateSize(clientMetadata, keyName, path) {
        let size = 0;
        try {
            size = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonDebug, ['MEMORY', keyName, path]);
        }
        catch (error) {
            this.logger.error('Failed to estimate size of json.', error);
        }
        if (size === null) {
            throw new common_1.BadRequestException(`There is no such path: "${path}" in key: "${keyName}"`);
        }
        return size;
    }
    async getObjectKeys(clientMetadata, keyName, path) {
        return this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonObjKeys, [keyName, path], 'utf8');
    }
    async getJsonDataType(clientMetadata, keyName, path) {
        return this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonType, [keyName, path], 'utf8');
    }
    async getDetails(clientMetadata, keyName, path, key) {
        const details = {
            key,
            path,
            cardinality: 1,
        };
        const objectKeyType = await this.getJsonDataType(clientMetadata, keyName, path);
        details['type'] = objectKeyType;
        switch (objectKeyType) {
            case 'object':
                details['cardinality'] = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonObjLen, [keyName, path], 'utf8');
                break;
            case 'array':
                details['cardinality'] = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonArrLen, [keyName, path], 'utf8');
                break;
            default:
                details['value'] = await this.forceGetJson(clientMetadata, keyName, path);
                break;
        }
        return details;
    }
    async safeGetJsonByType(clientMetadata, keyName, path, type) {
        const result = [];
        let objectKeys;
        let arrayLength;
        switch (type) {
            case 'object':
                objectKeys = await this.getObjectKeys(clientMetadata, keyName, path);
                for (const objectKey of objectKeys) {
                    const rootPath = path === '.' ? '' : path;
                    const childPath = objectKey.includes('"')
                        ? `['${objectKey}']`
                        : `["${objectKey}"]`;
                    const fullObjectKeyPath = `${rootPath}${childPath}`;
                    result.push(await this.getDetails(clientMetadata, keyName, fullObjectKeyPath, objectKey));
                }
                break;
            case 'array':
                arrayLength = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonArrLen, [keyName, path], 'utf8');
                for (let i = 0; i < arrayLength; i += 1) {
                    const fullObjectKeyPath = `${path === '.' ? '' : path}[${i}]`;
                    result.push(await this.getDetails(clientMetadata, keyName, fullObjectKeyPath, i));
                }
                break;
            default:
                return this.forceGetJson(clientMetadata, keyName, path);
        }
        return result;
    }
    async create(clientMetadata, dto) {
        this.logger.log('Creating REJSON-RL data type.');
        const { keyName, data, expire } = dto;
        try {
            const result = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonSet, [keyName, '.', data, 'NX']);
            if (!result) {
                throw new common_1.ConflictException(error_messages_1.default.KEY_NAME_EXIST);
            }
            this.logger.log('Succeed to create REJSON-RL key type.');
            if (expire) {
                try {
                    await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Expire, [keyName, expire]);
                }
                catch (err) {
                    this.logger.error(`Unable to set expire ${expire} for REJSON-RL key ${keyName}.`);
                }
            }
        }
        catch (error) {
            this.logger.error('Failed to create REJSON-RL key type.', error);
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            if (error.message.includes(constants_1.RedisErrorCodes.UnknownCommand)) {
                throw new common_1.BadRequestException(error_messages_1.default.REDIS_MODULE_IS_REQUIRED('RedisJSON'));
            }
            (0, utils_1.catchAclError)(error);
        }
    }
    async getJson(clientMetadata, dto) {
        this.logger.log('Getting json by key.');
        const { keyName, path, forceRetrieve } = dto;
        const result = {
            downloaded: true,
            path,
            data: null,
        };
        try {
            if (forceRetrieve) {
                result.data = await this.forceGetJson(clientMetadata, keyName, path);
                return result;
            }
            const jsonSize = await this.estimateSize(clientMetadata, keyName, path);
            if (jsonSize > config_1.default.get('modules')['json']['sizeThreshold']) {
                const type = await this.getJsonDataType(clientMetadata, keyName, path);
                result.downloaded = false;
                result.type = type;
                result.data = await this.safeGetJsonByType(clientMetadata, keyName, path, type);
            }
            else {
                result.data = await this.forceGetJson(clientMetadata, keyName, path);
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
        this.logger.log('Modifying REJSON-RL data type.');
        const { keyName, path, data } = dto;
        try {
            const exists = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (!exists) {
                throw new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST);
            }
            await this.getJsonDataType(clientMetadata, keyName, path);
            await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonSet, [keyName, path, data]);
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
        this.logger.log('Modifying REJSON-RL data type.');
        const { keyName, path, data } = dto;
        try {
            const exists = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (!exists) {
                throw new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST);
            }
            await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonArrAppend, [keyName, path, ...data]);
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
        this.logger.log('Removing REJSON-RL data.');
        const { keyName, path } = dto;
        try {
            const exists = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Exists, [keyName]);
            if (!exists) {
                throw new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST);
            }
            const affected = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonDel, [keyName, path]);
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
RejsonRlBusinessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [browser_tool_service_1.BrowserToolService])
], RejsonRlBusinessService);
exports.RejsonRlBusinessService = RejsonRlBusinessService;
