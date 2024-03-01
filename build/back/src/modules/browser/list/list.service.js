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
exports.ListService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const constants_1 = require("../../../constants");
const error_messages_1 = require("../../../constants/error-messages");
const utils_1 = require("../../../utils");
const dto_1 = require("./dto");
const browser_tool_commands_1 = require("../constants/browser-tool-commands");
const class_transformer_1 = require("class-transformer");
const database_client_factory_1 = require("../../database/providers/database.client.factory");
const utils_2 = require("../utils");
let ListService = class ListService {
    constructor(databaseClientFactory) {
        this.databaseClientFactory = databaseClientFactory;
        this.logger = new common_1.Logger('ListService');
    }
    async createList(clientMetadata, dto) {
        try {
            this.logger.log('Creating list data type.');
            const { keyName, expire } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyExists)(keyName, client);
            if (expire) {
                await this.createListWithExpiration(client, dto);
            }
            else {
                await this.createSimpleList(client, dto);
            }
            this.logger.log('Succeed to create list data type.');
            return null;
        }
        catch (error) {
            this.logger.error('Failed to create list data type.', error);
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async pushElement(clientMetadata, dto) {
        try {
            this.logger.log('Insert element at the tail/head of the list data type.');
            const { keyName, element, destination } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const total = await client.sendCommand([
                browser_tool_commands_1.BrowserToolListCommands[destination === dto_1.ListElementDestination.Tail ? 'RPushX' : 'LPushX'],
                keyName,
                element,
            ]);
            if (!total) {
                this.logger.error(`Failed to inserts element at the ${destination} of the list data type. Key not found. key: ${keyName}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            this.logger.log(`Succeed to insert element at the ${destination} of the list data type.`);
            return (0, class_transformer_1.plainToClass)(dto_1.PushListElementsResponse, { keyName, total });
        }
        catch (error) {
            this.logger.error('Failed to inserts element to the list data type.', error);
            if (error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async getElements(clientMetadata, dto) {
        try {
            this.logger.log('Getting elements of the list stored at key.');
            const { keyName, offset, count } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const total = (await client.sendCommand([browser_tool_commands_1.BrowserToolListCommands.LLen, keyName]));
            if (!total) {
                this.logger.error(`Failed to get elements of the list. Key not found. key: ${keyName}`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            const elements = await client.sendCommand([
                browser_tool_commands_1.BrowserToolListCommands.Lrange,
                keyName,
                offset,
                offset + count - 1,
            ]);
            this.logger.log('Succeed to get elements of the list.');
            return (0, class_transformer_1.plainToClass)(dto_1.GetListElementsResponse, { keyName, total, elements });
        }
        catch (error) {
            this.logger.error('Failed to to get elements of the list.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async getElement(clientMetadata, index, dto) {
        try {
            this.logger.log('Getting List element by index.');
            const { keyName } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            const value = await client.sendCommand([browser_tool_commands_1.BrowserToolListCommands.LIndex, keyName, index]);
            if (value === null) {
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.INDEX_OUT_OF_RANGE()));
            }
            this.logger.log('Succeed to get List element by index.');
            return (0, class_transformer_1.plainToClass)(dto_1.GetListElementResponse, { keyName, value });
        }
        catch (error) {
            this.logger.error('Failed to to get List element by index.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async setElement(clientMetadata, dto) {
        try {
            this.logger.log('Setting the list element at index');
            const { keyName, element, index } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            await (0, utils_2.checkIfKeyNotExists)(keyName, client);
            await client.sendCommand([browser_tool_commands_1.BrowserToolListCommands.LSet, keyName, index, element]);
            this.logger.log('Succeed to set the list element at index.');
            return (0, class_transformer_1.plainToClass)(dto_1.SetListElementResponse, { index, element });
        }
        catch (error) {
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            if (error === null || error === void 0 ? void 0 : error.message.includes('index out of range')) {
                throw new common_1.BadRequestException(error.message);
            }
            this.logger.error('Failed to set the list element at index.', error);
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async deleteElements(clientMetadata, dto) {
        var _a, _b;
        try {
            this.logger.log('Deleting elements from the list stored at key.');
            const { keyName, count, destination } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const execArgs = !!count && count > 1 ? [keyName, count] : [keyName];
            let result;
            if (destination === dto_1.ListElementDestination.Head) {
                result = await client.sendCommand([browser_tool_commands_1.BrowserToolListCommands.LPop, ...execArgs]);
            }
            else {
                result = await client.sendCommand([browser_tool_commands_1.BrowserToolListCommands.RPop, ...execArgs]);
            }
            if ((0, lodash_1.isNull)(result)) {
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST));
            }
            return (0, class_transformer_1.plainToClass)(dto_1.DeleteListElementsResponse, {
                elements: (0, lodash_1.isArray)(result) ? [...result] : [result],
            });
        }
        catch (error) {
            this.logger.error('Failed to delete elements from the list stored at key.', error);
            if (error === null || error === void 0 ? void 0 : error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            if ((error === null || error === void 0 ? void 0 : error.message.includes('wrong number of arguments')) && ((_b = (_a = error === null || error === void 0 ? void 0 : error.command) === null || _a === void 0 ? void 0 : _a.args) === null || _b === void 0 ? void 0 : _b.length) === 2) {
                throw new common_1.BadRequestException(error_messages_1.default.REMOVING_MULTIPLE_ELEMENTS_NOT_SUPPORT());
            }
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async createSimpleList(client, dto) {
        const { keyName, element } = dto;
        await client.sendCommand([browser_tool_commands_1.BrowserToolListCommands.LPush, keyName, element]);
    }
    async createListWithExpiration(client, dto) {
        const { keyName, element, expire } = dto;
        const transactionResults = await client.sendPipeline([
            [browser_tool_commands_1.BrowserToolListCommands.LPush, keyName, element],
            [browser_tool_commands_1.BrowserToolKeysCommands.Expire, keyName, expire],
        ]);
        (0, utils_1.catchMultiTransactionError)(transactionResults);
    }
};
ListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory])
], ListService);
exports.ListService = ListService;
