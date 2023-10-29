"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConsumerAbstractService = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../../utils");
const client_not_found_error_exception_1 = require("./exceptions/client-not-found-error.exception");
const redis_tool_options_1 = require("./redis-tool-options");
class RedisConsumerAbstractService {
    constructor(consumer, redisService, redisConnectionFactory, databaseService, options = {}) {
        this.options = redis_tool_options_1.DEFAULT_REDIS_TOOL_OPTIONS;
        this.consumer = consumer;
        this.options = { ...this.options, ...options };
        this.redisService = redisService;
        this.redisConnectionFactory = redisConnectionFactory;
        this.databaseService = databaseService;
    }
    prepareCommands(toolCommands) {
        return toolCommands.map((item) => {
            const [toolCommand, ...args] = item;
            const [command, ...commandArgs] = toolCommand.split(' ');
            return [command, ...commandArgs, ...args];
        });
    }
    async execPipelineFromClient(client, toolCommands) {
        return new Promise((resolve, reject) => {
            try {
                client
                    .pipeline(this.prepareCommands(toolCommands))
                    .exec((error, result) => {
                    resolve([error, result]);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    async execMultiFromClient(client, toolCommands) {
        return new Promise((resolve, reject) => {
            try {
                client
                    .multi(this.prepareCommands(toolCommands))
                    .exec((error, result) => {
                    resolve([error, result]);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    async getRedisClient(clientMetadata) {
        const redisClientInstance = this.redisService.getClientInstance({
            ...clientMetadata,
            context: this.consumer,
        });
        if (!redisClientInstance || !this.redisService.isClientConnected(redisClientInstance.client)) {
            this.redisService.removeClientInstance(clientMetadata);
            if (!this.options.enableAutoConnection)
                throw new client_not_found_error_exception_1.ClientNotFoundErrorException();
            return await this.createNewClient(clientMetadata);
        }
        return redisClientInstance.client;
    }
    getRedisClientNamespace(clientMetadata) {
        try {
            const clientInstance = this.redisService.getClientInstance({
                ...clientMetadata,
                context: this.consumer,
            });
            return (clientInstance === null || clientInstance === void 0 ? void 0 : clientInstance.client) ? (0, utils_1.getConnectionNamespace)(clientInstance.client) : '';
        }
        catch (e) {
            return '';
        }
    }
    async createNewClient(clientMetadata) {
        var _a;
        const instanceDto = await this.databaseService.get(clientMetadata.databaseId);
        const uniqueId = clientMetadata.uniqueId || (0, uuid_1.v4)();
        const connectionName = (0, utils_1.generateRedisConnectionName)(clientMetadata.context || this.consumer, uniqueId);
        try {
            const client = await this.redisConnectionFactory.createRedisConnection({
                ...clientMetadata,
                context: this.consumer,
            }, instanceDto, connectionName);
            return (_a = this.redisService.setClientInstance({
                ...clientMetadata,
                context: clientMetadata.context || this.consumer,
            }, client)) === null || _a === void 0 ? void 0 : _a.client;
        }
        catch (error) {
            throw (0, utils_1.catchRedisConnectionError)(error, instanceDto);
        }
    }
}
exports.RedisConsumerAbstractService = RedisConsumerAbstractService;
