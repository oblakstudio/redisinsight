"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusterNodeRedisClient = void 0;
const client_1 = require("..");
class ClusterNodeRedisClient extends client_1.NodeRedisClient {
    getConnectionType() {
        return client_1.RedisClientConnectionType.CLUSTER;
    }
    async nodes(role) {
        let nodes = [];
        switch (role) {
            case client_1.RedisClientNodeRole.PRIMARY:
                nodes = this.client.masters;
                break;
            case client_1.RedisClientNodeRole.SECONDARY:
                nodes = this.client.replicas;
                break;
            default:
                nodes = this.client.masters.concat(this.client.replicas);
        }
        return nodes.map((node) => new client_1.StandaloneNodeRedisClient(this.clientMetadata, node.client, {
            host: node.host,
            port: node.port,
        }));
    }
    async sendPipeline(commands, options) {
        return Promise.all(commands.map((cmd) => this.sendCommand(cmd, options)
            .then((res) => [null, res])
            .catch((e) => [e, null])));
    }
    async sendCommand(command, options) {
        return this.client.sendCommand(undefined, false, client_1.NodeRedisClient.prepareCommandArgs(command), client_1.NodeRedisClient.prepareCommandOptions(options));
    }
    async call(command, options) {
        return this.sendCommand(command, options);
    }
}
exports.ClusterNodeRedisClient = ClusterNodeRedisClient;
