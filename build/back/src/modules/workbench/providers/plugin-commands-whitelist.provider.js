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
exports.PluginCommandsWhitelistProvider = void 0;
const common_1 = require("@nestjs/common");
const redis_tool_service_1 = require("../../redis/redis-tool.service");
const lodash_1 = require("lodash");
const constants_1 = require("../../../constants");
let PluginCommandsWhitelistProvider = class PluginCommandsWhitelistProvider {
    constructor(redisTool) {
        this.redisTool = redisTool;
        this.databasesCommands = new Map();
    }
    async getWhitelistCommands(clientMetadata) {
        return this.databasesCommands.get(clientMetadata.databaseId)
            || this.determineWhitelistCommandsForDatabase(clientMetadata);
    }
    async determineWhitelistCommandsForDatabase(clientMetadata) {
        const client = await this.redisTool.getRedisClient(clientMetadata);
        const commands = await this.calculateWhiteListCommands(client);
        this.databasesCommands.set(clientMetadata.databaseId, commands);
        return commands;
    }
    async calculateWhiteListCommands(client) {
        let pluginWhiteListCommands = [];
        try {
            const availableCommands = await client.call('command');
            const readOnlyCommands = (0, lodash_1.map)((0, lodash_1.filter)(availableCommands, (command) => (0, lodash_1.get)(command, [2], [])
                .includes('readonly')), (command) => command[0]);
            const blackListCommands = [...constants_1.pluginUnsupportedCommands, ...constants_1.pluginBlockingCommands];
            try {
                const dangerousCommands = await client.call('acl', ['cat', 'dangerous']);
                blackListCommands.push(...dangerousCommands);
            }
            catch (e) {
            }
            try {
                const blockingCommands = await client.call('acl', ['cat', 'blocking']);
                blackListCommands.push(...blockingCommands);
            }
            catch (e) {
            }
            pluginWhiteListCommands = (0, lodash_1.filter)(readOnlyCommands, (command) => !blackListCommands.includes(command));
        }
        catch (e) {
        }
        return pluginWhiteListCommands.map((cmd) => cmd.toLowerCase());
    }
};
PluginCommandsWhitelistProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_tool_service_1.RedisToolService])
], PluginCommandsWhitelistProvider);
exports.PluginCommandsWhitelistProvider = PluginCommandsWhitelistProvider;
