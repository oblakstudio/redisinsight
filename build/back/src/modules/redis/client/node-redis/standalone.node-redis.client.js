"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandaloneNodeRedisClient = void 0;
const client_1 = require("..");
const node_redis_client_1 = require("./node-redis.client");
class StandaloneNodeRedisClient extends node_redis_client_1.NodeRedisClient {
    getConnectionType() {
        return client_1.RedisClientConnectionType.STANDALONE;
    }
    async sendPipeline(commands, options) {
        return Promise.all(commands.map((cmd) => this.sendCommand(cmd, options)
            .then((res) => [null, res])
            .catch((e) => [e, null])));
    }
    async sendCommand(command, options) {
        return this.client.sendCommand(node_redis_client_1.NodeRedisClient.prepareCommandArgs(command), node_redis_client_1.NodeRedisClient.prepareCommandOptions(options));
    }
    async call(command, options) {
        return this.sendCommand(command, options);
    }
}
exports.StandaloneNodeRedisClient = StandaloneNodeRedisClient;
