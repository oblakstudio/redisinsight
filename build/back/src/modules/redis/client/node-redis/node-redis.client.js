"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeRedisClient = void 0;
const lodash_1 = require("lodash");
const client_1 = require("..");
class NodeRedisClient extends client_1.RedisClient {
    static prepareCommandOptions(options) {
        let replyEncoding = null;
        if ((options === null || options === void 0 ? void 0 : options.replyEncoding) === 'utf8') {
            replyEncoding = 'utf8';
        }
        return {
            returnBuffers: (0, lodash_1.isNull)(replyEncoding),
        };
    }
    static prepareCommandArgs(args) {
        const strArgs = args.map((arg) => ((0, lodash_1.isNumber)(arg) ? arg.toString() : arg));
        return [...strArgs.shift().split(' '), ...strArgs];
    }
    async nodes() {
        return [this];
    }
    isConnected() {
        return true;
    }
    async publish(channel, message) {
        return this.client.publish(channel, message);
    }
    async subscribe(channel) {
        const listener = (message, messageChannel) => {
            this.emit('message', messageChannel, message);
        };
        return this.client.subscribe(channel, listener);
    }
    async pSubscribe(channel) {
        const listener = (message, messageChannel) => {
            this.emit('pmessage', channel, messageChannel, message);
        };
        return this.client.pSubscribe(channel, listener);
    }
    async unsubscribe(channel) {
        return this.client.unsubscribe(channel);
    }
    async pUnsubscribe(channel) {
        return this.client.pUnsubscribe(channel);
    }
    async monitor() {
        throw new Error('Not implemented');
    }
    async disconnect() {
        this.client.disconnect();
    }
    async quit() {
        await this.client.quit();
    }
    async getCurrentDbIndex() {
        return this.clientMetadata.db || 0;
    }
}
exports.NodeRedisClient = NodeRedisClient;
