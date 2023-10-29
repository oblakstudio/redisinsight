"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisToolService = void 0;
const common_1 = require("@nestjs/common");
const Redis = require("ioredis");
const IORedis = require("ioredis");
const uuid_1 = require("uuid");
const error_messages_1 = require("../../constants/error-messages");
const redis_consumer_abstract_service_1 = require("./redis-consumer.abstract.service");
const errors_1 = require("../cli/constants/errors");
const cli_dto_1 = require("../cli/dto/cli.dto");
const redis_connection_helper_1 = require("../../utils/redis-connection-helper");
class RedisToolService extends redis_consumer_abstract_service_1.RedisConsumerAbstractService {
    constructor(appTool, redisService, redisConnectionFactory, databaseService, options = {}) {
        super(appTool, redisService, redisConnectionFactory, databaseService, options);
        this.appTool = appTool;
        this.redisService = redisService;
        this.redisConnectionFactory = redisConnectionFactory;
        this.databaseService = databaseService;
        this.logger = new common_1.Logger(`${appTool}ToolService`);
    }
    async execCommand(clientMetadata, toolCommand, args, replyEncoding) {
        const client = await this.getRedisClient(clientMetadata);
        this.logger.log(`Execute command '${toolCommand}', connectionName: ${(0, redis_connection_helper_1.getConnectionName)(client)}`);
        const [command, ...commandArgs] = toolCommand.split(' ');
        return client.sendCommand(new Redis.Command(command, [...commandArgs, ...args], {
            replyEncoding,
        }));
    }
    async execCommandForNodes(clientMetadata, toolCommand, args, nodeRole, replyEncoding) {
        const [command, ...commandArgs] = toolCommand.split(' ');
        const nodes = await this.getClusterNodes(clientMetadata, nodeRole);
        return await Promise.all(nodes.map(async (node) => {
            const { host, port } = node.options;
            this.logger.log(`Execute command '${toolCommand}', connectionName: ${(0, redis_connection_helper_1.getConnectionName)(node)}`);
            try {
                const response = await node.sendCommand(new Redis.Command(command, [...commandArgs, ...args], {
                    replyEncoding,
                }));
                return {
                    host,
                    port,
                    response,
                    status: cli_dto_1.CommandExecutionStatus.Success,
                };
            }
            catch (error) {
                return {
                    host,
                    port,
                    error,
                    response: error.message,
                    status: cli_dto_1.CommandExecutionStatus.Fail,
                };
            }
        }));
    }
    async execCommandForNode(clientMetadata, toolCommand, args, nodeRole, nodeAddress, replyEncoding) {
        const [command, ...commandArgs] = toolCommand.split(' ');
        const nodes = await this.getClusterNodes(clientMetadata, nodeRole);
        let node = nodes.find((item) => {
            const { host, port } = item.options;
            return `${host}:${port}` === nodeAddress;
        });
        if (!node) {
            node = nodeRole === cli_dto_1.ClusterNodeRole.All
                ? nodeAddress
                : `${nodeAddress} [${nodeRole.toLowerCase()}]`;
            throw new errors_1.ClusterNodeNotFoundError(error_messages_1.default.CLUSTER_NODE_NOT_FOUND(node));
        }
        const { host, port } = node.options;
        this.logger.log(`Execute command '${toolCommand}', connectionName: ${(0, redis_connection_helper_1.getConnectionName)(node)}`);
        try {
            const response = await node.sendCommand(new Redis.Command(command, [...commandArgs, ...args], {
                replyEncoding,
            }));
            return {
                response,
                host,
                port,
                status: cli_dto_1.CommandExecutionStatus.Success,
            };
        }
        catch (error) {
            return {
                response: error.message,
                host,
                port,
                error,
                status: cli_dto_1.CommandExecutionStatus.Fail,
            };
        }
    }
    async execPipeline() {
        throw new Error('CLI ERROR: Pipeline not supported');
    }
    async createNewToolClient(clientMetadata) {
        const uniqueId = (0, uuid_1.v4)();
        await this.createNewClient({
            ...clientMetadata,
            uniqueId,
        });
        return uniqueId;
    }
    async reCreateToolClient(clientMetadata) {
        this.redisService.removeClientInstance(clientMetadata);
        await this.createNewClient(clientMetadata);
        return clientMetadata.uniqueId;
    }
    async deleteToolClient(clientMetadata) {
        return this.redisService.removeClientInstance(clientMetadata);
    }
    async getClusterNodes(clientMetadata, role) {
        const client = await this.getRedisClient(clientMetadata);
        if (!(client instanceof IORedis.Cluster)) {
            throw new errors_1.WrongDatabaseTypeError(error_messages_1.default.WRONG_DATABASE_TYPE);
        }
        let nodes;
        switch (role) {
            case cli_dto_1.ClusterNodeRole.Master:
                nodes = client.nodes('master');
                break;
            case cli_dto_1.ClusterNodeRole.Slave:
                nodes = client.nodes('slave');
                break;
            default:
                nodes = client.nodes('all');
        }
        return nodes;
    }
}
exports.RedisToolService = RedisToolService;
