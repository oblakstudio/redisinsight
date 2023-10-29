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
exports.RejsonRlTypeInfoStrategy = void 0;
const common_1 = require("@nestjs/common");
const browser_tool_service_1 = require("../../../../browser-tool/browser-tool.service");
const dto_1 = require("../../../../../dto");
const browser_tool_commands_1 = require("../../../../../constants/browser-tool-commands");
let RejsonRlTypeInfoStrategy = class RejsonRlTypeInfoStrategy {
    constructor(redisManager) {
        this.logger = new common_1.Logger('RejsonRlTypeInfoStrategy');
        this.redisManager = redisManager;
    }
    async getInfo(clientMetadata, key, type) {
        this.logger.log(`Getting ${dto_1.RedisDataType.JSON} type info.`);
        const [transactionError, transactionResults,] = await this.redisManager.execPipeline(clientMetadata, [
            [browser_tool_commands_1.BrowserToolKeysCommands.Ttl, key],
            [browser_tool_commands_1.BrowserToolKeysCommands.MemoryUsage, key, 'samples', '0'],
        ]);
        if (transactionError) {
            throw transactionError;
        }
        else {
            const result = transactionResults.map((item) => item[1]);
            const [ttl, size] = result;
            const length = await this.getLength(clientMetadata, key);
            return {
                name: key,
                type,
                ttl,
                size: size || null,
                length,
            };
        }
    }
    async getLength(clientMetadata, key) {
        try {
            const objectKeyType = await this.redisManager.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonType, [key, '.'], 'utf8');
            switch (objectKeyType) {
                case 'object':
                    return await this.redisManager.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonObjLen, [key, '.'], 'utf8');
                case 'array':
                    return await this.redisManager.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonArrLen, [key, '.'], 'utf8');
                case 'string':
                    return await this.redisManager.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolRejsonRlCommands.JsonStrLen, [key, '.'], 'utf8');
                default:
                    return undefined;
            }
        }
        catch (error) {
            return undefined;
        }
    }
};
RejsonRlTypeInfoStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [browser_tool_service_1.BrowserToolService])
], RejsonRlTypeInfoStrategy);
exports.RejsonRlTypeInfoStrategy = RejsonRlTypeInfoStrategy;
