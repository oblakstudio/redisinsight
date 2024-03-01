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
exports.SlowLogService = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const commands_1 = require("./constants/commands");
const utils_1 = require("../../utils");
const slow_log_analytics_service_1 = require("./slow-log-analytics.service");
const utils_2 = require("../redis/utils");
const database_client_factory_1 = require("../database/providers/database.client.factory");
const client_1 = require("../redis/client");
let SlowLogService = class SlowLogService {
    constructor(databaseClientFactory, analyticsService) {
        this.databaseClientFactory = databaseClientFactory;
        this.analyticsService = analyticsService;
        this.logger = new common_1.Logger('SlowLogService');
    }
    async getSlowLogs(clientMetadata, dto) {
        try {
            this.logger.log('Getting slow logs');
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const nodes = await client.nodes();
            return (0, lodash_1.concat)(...(await Promise.all(nodes.map((node) => this.getNodeSlowLogs(node, dto)))));
        }
        catch (e) {
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async getNodeSlowLogs(node, dto) {
        const resp = await node.call([commands_1.SlowLogCommands.SlowLog, commands_1.SlowLogArguments.Get, dto.count], { replyEncoding: 'utf8' });
        return resp.map((log) => {
            const [id, time, durationUs, args, source, client] = log;
            return {
                id,
                time,
                durationUs,
                args: args.join(' '),
                source,
                client,
            };
        });
    }
    async reset(clientMetadata) {
        try {
            this.logger.log('Resetting slow logs');
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const nodes = await client.nodes();
            await Promise.all(nodes.map((node) => node.call([commands_1.SlowLogCommands.SlowLog, commands_1.SlowLogArguments.Reset])));
        }
        catch (e) {
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async getConfig(clientMetadata) {
        try {
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const resp = (0, utils_2.convertArrayReplyToObject)(await client.call([commands_1.SlowLogCommands.Config, commands_1.SlowLogArguments.Get, 'slowlog*'], { replyEncoding: 'utf8' }));
            return {
                slowlogMaxLen: parseInt(resp['slowlog-max-len'], 10) || 0,
                slowlogLogSlowerThan: parseInt(resp['slowlog-log-slower-than'], 10) || 0,
            };
        }
        catch (e) {
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async updateConfig(clientMetadata, dto) {
        try {
            const commands = [];
            const config = await this.getConfig(clientMetadata);
            const { slowlogLogSlowerThan, slowlogMaxLen } = config;
            if (dto.slowlogLogSlowerThan !== undefined) {
                commands.push({
                    command: commands_1.SlowLogCommands.Config,
                    args: [commands_1.SlowLogArguments.Set, 'slowlog-log-slower-than', dto.slowlogLogSlowerThan],
                    analytics: () => this.analyticsService.slowlogLogSlowerThanUpdated(clientMetadata.databaseId, slowlogLogSlowerThan, dto.slowlogLogSlowerThan),
                });
                config.slowlogLogSlowerThan = dto.slowlogLogSlowerThan;
            }
            if (dto.slowlogMaxLen !== undefined) {
                commands.push({
                    command: commands_1.SlowLogCommands.Config,
                    args: [commands_1.SlowLogArguments.Set, 'slowlog-max-len', dto.slowlogMaxLen],
                    analytics: () => this.analyticsService.slowlogMaxLenUpdated(clientMetadata.databaseId, slowlogMaxLen, dto.slowlogMaxLen),
                });
                config.slowlogMaxLen = dto.slowlogMaxLen;
            }
            if (commands.length) {
                const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
                if (client.getConnectionType() === client_1.RedisClientConnectionType.CLUSTER) {
                    return Promise.reject(new common_1.BadRequestException('Configuration slowlog for cluster is deprecated'));
                }
                await Promise.all(commands.map((command) => client.call([
                    command.command, ...command.args,
                ]).then(command.analytics)));
            }
            return config;
        }
        catch (e) {
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
};
SlowLogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory,
        slow_log_analytics_service_1.SlowLogAnalyticsService])
], SlowLogService);
exports.SlowLogService = SlowLogService;
