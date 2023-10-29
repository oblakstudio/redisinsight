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
exports.BrowserToolClusterService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const redis_consumer_abstract_service_1 = require("../../../redis/redis-consumer.abstract.service");
const redis_service_1 = require("../../../redis/redis.service");
const models_1 = require("../../../../common/models");
const errors_1 = require("../../../cli/constants/errors");
const error_messages_1 = require("../../../../constants/error-messages");
const cli_helper_1 = require("../../../../utils/cli-helper");
const redis_connection_helper_1 = require("../../../../utils/redis-connection-helper");
const database_service_1 = require("../../../database/database.service");
const redis_connection_factory_1 = require("../../../redis/redis-connection.factory");
let BrowserToolClusterService = class BrowserToolClusterService extends redis_consumer_abstract_service_1.RedisConsumerAbstractService {
    constructor(redisService, redisConnectionFactory, databaseService) {
        super(models_1.ClientContext.Browser, redisService, redisConnectionFactory, databaseService);
        this.redisService = redisService;
        this.redisConnectionFactory = redisConnectionFactory;
        this.databaseService = databaseService;
        this.logger = new common_1.Logger('BrowserToolClusterService');
    }
    async execCommand(clientMetadata, toolCommand, args) {
        const client = await this.getRedisClient(clientMetadata);
        this.logger.log(`Execute command '${toolCommand}', connectionName: ${(0, redis_connection_helper_1.getConnectionName)(client)}`);
        const [command, ...commandArgs] = toolCommand.split(' ');
        return client.call(command, [...commandArgs, ...args]);
    }
    async execPipeline(clientMetadata, toolCommands) {
        const client = await this.getRedisClient(clientMetadata);
        const pipelineSummery = (0, cli_helper_1.getRedisPipelineSummary)(toolCommands);
        this.logger.log(`Execute pipeline ${pipelineSummery.summary}, length: ${pipelineSummery.length}, connectionName: ${(0, redis_connection_helper_1.getConnectionName)(client)}`);
        return this.execPipelineFromClient(client, toolCommands);
    }
    async execCommandFromNodes(clientMetadata, toolCommand, args, nodeRole = 'all') {
        const client = await this.getRedisClient(clientMetadata);
        const nodes = client.nodes(nodeRole);
        this.logger.log(`Execute command '${toolCommand}' from nodes, connectionName: ${(0, redis_connection_helper_1.getConnectionName)(client)}`);
        return await Promise.all(nodes.map(async (node) => {
            const { host, port } = node.options;
            const [command, ...commandArgs] = toolCommand.split(' ');
            const result = await node.call(command, [
                ...commandArgs,
                ...args,
            ]);
            return {
                result,
                host,
                port,
            };
        }));
    }
    async execCommandFromNode(clientMetadata, toolCommand, args, exactNode, replyEncoding = 'utf8') {
        const client = await this.getRedisClient(clientMetadata);
        this.logger.log(`Execute command '${toolCommand}' from node, connectionName: ${(0, redis_connection_helper_1.getConnectionName)(client)}`);
        const [command, ...commandArgs] = toolCommand.split(' ');
        const { host, port } = exactNode;
        const allClusterNodes = client.nodes('all');
        const node = allClusterNodes.find((item) => {
            const { options } = item;
            return (options === null || options === void 0 ? void 0 : options.host) === host && options.port === port;
        });
        if (!node) {
            this.logger.error(`Cluster node not found. ${JSON.stringify(exactNode)}`);
            throw new errors_1.ClusterNodeNotFoundError(error_messages_1.default.CLUSTER_NODE_NOT_FOUND(`${exactNode.host}:${exactNode.port}`));
        }
        const result = await node.sendCommand(new ioredis_1.default.Command(command, [...commandArgs, ...args], {
            replyEncoding,
        }));
        return {
            host,
            port,
            result,
        };
    }
    async getNodes(clientMetadata, nodeRole = 'all') {
        const client = await this.getRedisClient(clientMetadata);
        return client.nodes(nodeRole);
    }
};
BrowserToolClusterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        redis_connection_factory_1.RedisConnectionFactory,
        database_service_1.DatabaseService])
], BrowserToolClusterService);
exports.BrowserToolClusterService = BrowserToolClusterService;
