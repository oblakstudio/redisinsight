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
exports.DatabaseInfoProvider = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../utils");
const constants_1 = require("../../../constants");
const lodash_1 = require("lodash");
const feature_service_1 = require("../../feature/feature.service");
const constants_2 = require("../../feature/constants");
const utils_2 = require("../../redis/utils");
const client_1 = require("../../redis/client");
let DatabaseInfoProvider = class DatabaseInfoProvider {
    constructor(featureService) {
        this.featureService = featureService;
    }
    async filterRawModules(modules) {
        var _a, _b;
        let filteredModules = modules;
        try {
            const filterModules = await this.featureService.getByName(constants_2.KnownFeatures.RedisModuleFilter);
            if ((filterModules === null || filterModules === void 0 ? void 0 : filterModules.flag) && ((_b = (_a = filterModules.data) === null || _a === void 0 ? void 0 : _a.hideByName) === null || _b === void 0 ? void 0 : _b.length)) {
                filteredModules = modules.filter(({ name }) => {
                    const match = filterModules.data.hideByName.find((filter) => filter.expression
                        && (new RegExp(filter.expression, filter.options)).test(name));
                    return !match;
                });
            }
        }
        catch (e) {
        }
        return filteredModules;
    }
    async determineDatabaseModules(client) {
        try {
            const reply = await client.call(['module', 'list'], { replyEncoding: 'utf8' });
            const modules = await this.filterRawModules(reply.map((module) => (0, utils_2.convertArrayReplyToObject)(module)));
            return modules.map(({ name, ver }) => {
                var _a;
                return ({
                    name: (_a = constants_1.SUPPORTED_REDIS_MODULES[name]) !== null && _a !== void 0 ? _a : name,
                    version: ver,
                    semanticVersion: constants_1.SUPPORTED_REDIS_MODULES[name]
                        ? (0, utils_1.convertIntToSemanticVersion)(ver)
                        : undefined,
                });
            });
        }
        catch (e) {
            return this.determineDatabaseModulesUsingInfo(client);
        }
    }
    async determineDatabaseServer(client) {
        var _a;
        try {
            const reply = (0, utils_1.convertRedisInfoReplyToObject)(await client.call(['info', 'server'], { replyEncoding: 'utf8' }));
            return (_a = reply['server']) === null || _a === void 0 ? void 0 : _a.redis_version;
        }
        catch (e) {
        }
        return null;
    }
    async determineDatabaseModulesUsingInfo(client) {
        const modules = [];
        await Promise.all(Array.from(constants_1.REDIS_MODULES_COMMANDS, async ([moduleName, commands]) => {
            try {
                let commandsInfo = await client.call(['command', 'info', ...commands], { replyEncoding: 'utf8' });
                commandsInfo = commandsInfo.filter((info) => !(0, lodash_1.isNil)(info));
                if (commandsInfo.length) {
                    modules.push({ name: moduleName });
                }
            }
            catch (e) {
            }
        }));
        return await this.filterRawModules(modules);
    }
    async getRedisGeneralInfo(client) {
        if (client.getConnectionType() === client_1.RedisClientConnectionType.CLUSTER) {
            return this.getRedisMasterNodesGeneralInfo(client);
        }
        return this.getRedisNodeGeneralInfo(client);
    }
    async getRedisNodeGeneralInfo(client) {
        try {
            const info = (0, utils_1.convertRedisInfoReplyToObject)(await client.sendCommand(['info'], { replyEncoding: 'utf8' }));
            const serverInfo = info['server'];
            const memoryInfo = info['memory'];
            const keyspaceInfo = info['keyspace'];
            const clientsInfo = info['clients'];
            const statsInfo = info['stats'];
            const replicationInfo = info['replication'];
            const databases = await this.getDatabasesCount(client, keyspaceInfo);
            return {
                version: serverInfo === null || serverInfo === void 0 ? void 0 : serverInfo.redis_version,
                databases,
                role: (0, lodash_1.get)(replicationInfo, 'role') || undefined,
                totalKeys: this.getRedisNodeTotalKeysCount(keyspaceInfo),
                usedMemory: parseInt((0, lodash_1.get)(memoryInfo, 'used_memory'), 10) || undefined,
                connectedClients: parseInt((0, lodash_1.get)(clientsInfo, 'connected_clients'), 10) || undefined,
                uptimeInSeconds: parseInt((0, lodash_1.get)(serverInfo, 'uptime_in_seconds'), 10) || undefined,
                hitRatio: this.getRedisHitRatio(statsInfo),
                cashedScripts: parseInt((0, lodash_1.get)(memoryInfo, 'number_of_cached_scripts'), 10) || undefined,
                server: serverInfo,
            };
        }
        catch (error) {
            throw (0, utils_1.catchAclError)(error);
        }
    }
    async getRedisMasterNodesGeneralInfo(client) {
        const nodesResult = await Promise.all((await client.nodes()).map(async (node) => this.getRedisNodeGeneralInfo(node)));
        return nodesResult.reduce((prev, cur) => ({
            version: cur.version,
            usedMemory: prev.usedMemory + cur.usedMemory,
            totalKeys: prev.totalKeys + cur.totalKeys,
            nodes: (prev === null || prev === void 0 ? void 0 : prev.nodes) ? [...prev.nodes, cur] : [prev, cur],
        }));
    }
    async getDatabasesCount(client, keyspaceInfo) {
        try {
            const reply = await client.call(['config', 'get', 'databases'], { replyEncoding: 'utf8' });
            return reply.length ? parseInt(reply[1], 10) : 1;
        }
        catch (e) {
            return this.getDatabaseCountFromKeyspace(keyspaceInfo);
        }
    }
    async getClientListInfo(client) {
        try {
            const clientListResponse = await client.call(['client', 'list'], { replyEncoding: 'utf8' });
            return clientListResponse
                .split(/\r?\n/)
                .filter(Boolean)
                .map((r) => (0, utils_2.convertMultilineReplyToObject)(r, ' ', '='));
        }
        catch (error) {
            throw (0, utils_1.catchAclError)(error);
        }
    }
    getDatabaseCountFromKeyspace(keyspaceInfo) {
        try {
            const keySpaces = Object.keys(keyspaceInfo);
            const matches = keySpaces[keySpaces.length - 1].match(/(\d+)/);
            return matches[0] ? parseInt(matches[0], 10) + 1 : 1;
        }
        catch (e) {
            return 1;
        }
    }
    getRedisNodeTotalKeysCount(keyspaceInfo) {
        try {
            return Object.values(keyspaceInfo).reduce((prev, cur) => {
                const { keys } = (0, utils_2.convertMultilineReplyToObject)(cur, ',', '=');
                return prev + parseInt(keys, 10);
            }, 0);
        }
        catch (error) {
            return undefined;
        }
    }
    getRedisHitRatio(statsInfo) {
        try {
            const keyspaceHits = (0, lodash_1.get)(statsInfo, 'keyspace_hits');
            const keyspaceMisses = (0, lodash_1.get)(statsInfo, 'keyspace_misses');
            return (0, utils_1.calculateRedisHitRatio)(keyspaceHits, keyspaceMisses);
        }
        catch (error) {
            return undefined;
        }
    }
};
DatabaseInfoProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [feature_service_1.FeatureService])
], DatabaseInfoProvider);
exports.DatabaseInfoProvider = DatabaseInfoProvider;
