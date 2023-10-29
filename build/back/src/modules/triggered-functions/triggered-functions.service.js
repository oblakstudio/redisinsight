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
exports.TriggeredFunctionsService = void 0;
const ioredis_1 = require("ioredis");
const common_1 = require("@nestjs/common");
const utils_1 = require("../../utils");
const lodash_1 = require("lodash");
const class_transformer_1 = require("class-transformer");
const database_connection_service_1 = require("../database/database-connection.service");
const models_1 = require("./models");
const utils_2 = require("./utils");
const error_messages_1 = require("../../constants/error-messages");
let TriggeredFunctionsService = class TriggeredFunctionsService {
    constructor(databaseConnectionService) {
        this.databaseConnectionService = databaseConnectionService;
        this.logger = new common_1.Logger('TriggeredFunctionsService');
    }
    async libraryList(clientMetadata) {
        let client;
        try {
            client = await this.databaseConnectionService.getOrCreateClient(clientMetadata);
            const reply = await client.sendCommand(new ioredis_1.Command('TFUNCTION', ['LIST'], { replyEncoding: 'utf8' }));
            const libraries = reply.map((lib) => (0, utils_2.getShortLibraryInformation)(lib));
            return libraries.map((lib) => (0, class_transformer_1.plainToClass)(models_1.ShortLibrary, lib));
        }
        catch (e) {
            this.logger.error('Unable to get database libraries', e);
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async details(clientMetadata, name) {
        let client;
        try {
            client = await this.databaseConnectionService.getOrCreateClient(clientMetadata);
            const reply = await client.sendCommand(new ioredis_1.Command('TFUNCTION', ['LIST', 'WITHCODE', 'LIBRARY', name], { replyEncoding: 'utf8' }));
            if (!reply.length) {
                this.logger.error(`Failed to get library details. Not Found library: ${name}.`);
                return Promise.reject(new common_1.NotFoundException(error_messages_1.default.LIBRARY_NOT_EXIST));
            }
            const library = (0, utils_2.getLibraryInformation)(reply[0]);
            return (0, class_transformer_1.plainToClass)(models_1.Library, library);
        }
        catch (e) {
            this.logger.error('Unable to get library details', e);
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async functionsList(clientMetadata) {
        let client;
        try {
            client = await this.databaseConnectionService.getOrCreateClient(clientMetadata);
            const reply = await client.sendCommand(new ioredis_1.Command('TFUNCTION', ['LIST', 'vvv'], { replyEncoding: 'utf8' }));
            const functions = reply.reduce((prev, cur) => (0, lodash_1.concat)(prev, (0, utils_2.getLibraryFunctions)(cur)), []);
            return functions.map((func) => (0, class_transformer_1.plainToClass)(models_1.Function, func));
        }
        catch (e) {
            this.logger.error('Unable to get all triggered functions', e);
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async upload(clientMetadata, dto, isExist = false) {
        let client;
        try {
            const { code, configuration, } = dto;
            const commandArgs = isExist ? ['LOAD', 'REPLACE'] : ['LOAD'];
            if (configuration) {
                commandArgs.push('CONFIG', configuration);
            }
            commandArgs.push(code);
            client = await this.databaseConnectionService.getOrCreateClient(clientMetadata);
            if (client.isCluster) {
                await this.refreshCluster(client);
            }
            await client.sendCommand(new ioredis_1.Command('TFUNCTION', [...commandArgs], { replyEncoding: 'utf8' }));
            this.logger.log('Succeed to upload library.');
            return undefined;
        }
        catch (e) {
            this.logger.error('Unable to upload library', e);
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async delete(clientMetadata, libraryName) {
        let client;
        try {
            client = await this.databaseConnectionService.getOrCreateClient(clientMetadata);
            if (client.isCluster) {
                await this.refreshCluster(client);
            }
            await client.sendCommand(new ioredis_1.Command('TFUNCTION', ['DELETE', libraryName], { replyEncoding: 'utf8' }));
            this.logger.log('Succeed to delete library.');
            return undefined;
        }
        catch (e) {
            this.logger.error('Unable to delete library', e);
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async refreshCluster(client) {
        const nodes = client.nodes('master');
        await Promise.all(nodes.map(async (node) => {
            await node.sendCommand(new ioredis_1.Command('REDISGEARS_2.REFRESHCLUSTER'));
        }));
    }
};
TriggeredFunctionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_connection_service_1.DatabaseConnectionService])
], TriggeredFunctionsService);
exports.TriggeredFunctionsService = TriggeredFunctionsService;
