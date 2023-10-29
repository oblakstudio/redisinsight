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
exports.BrowserToolService = void 0;
const Redis = require("ioredis");
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../../../redis/redis.service");
const redis_consumer_abstract_service_1 = require("../../../redis/redis-consumer.abstract.service");
const cli_helper_1 = require("../../../../utils/cli-helper");
const redis_connection_helper_1 = require("../../../../utils/redis-connection-helper");
const database_service_1 = require("../../../database/database.service");
const models_1 = require("../../../../common/models");
const redis_connection_factory_1 = require("../../../redis/redis-connection.factory");
let BrowserToolService = class BrowserToolService extends redis_consumer_abstract_service_1.RedisConsumerAbstractService {
    constructor(redisService, redisConnectionFactory, databaseService) {
        super(models_1.ClientContext.Browser, redisService, redisConnectionFactory, databaseService);
        this.redisService = redisService;
        this.redisConnectionFactory = redisConnectionFactory;
        this.databaseService = databaseService;
        this.logger = new common_1.Logger('BrowserToolService');
    }
    async execCommand(clientMetadata, toolCommand, args, replyEncoding = null) {
        const client = await this.getRedisClient(clientMetadata);
        this.logger.log(`Execute command '${toolCommand}', connectionName: ${(0, redis_connection_helper_1.getConnectionName)(client)}`);
        const [command, ...commandArgs] = toolCommand.split(' ');
        return client.sendCommand(new Redis.Command(command, [...commandArgs, ...args], {
            replyEncoding,
        }));
    }
    async execPipeline(clientMetadata, toolCommands) {
        const client = await this.getRedisClient(clientMetadata);
        const pipelineSummery = (0, cli_helper_1.getRedisPipelineSummary)(toolCommands);
        this.logger.log(`Execute pipeline ${pipelineSummery.summary}, length: ${pipelineSummery.length}, connectionName: ${(0, redis_connection_helper_1.getConnectionName)(client)}`);
        return this.execPipelineFromClient(client, toolCommands);
    }
    async execMulti(clientMetadata, toolCommands) {
        const client = await this.getRedisClient(clientMetadata);
        const pipelineSummery = (0, cli_helper_1.getRedisPipelineSummary)(toolCommands);
        this.logger.log(`Execute pipeline ${pipelineSummery.summary}, length: ${pipelineSummery.length}, connectionName: ${(0, redis_connection_helper_1.getConnectionName)(client)}`);
        return this.execMultiFromClient(client, toolCommands);
    }
};
BrowserToolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        redis_connection_factory_1.RedisConnectionFactory,
        database_service_1.DatabaseService])
], BrowserToolService);
exports.BrowserToolService = BrowserToolService;
