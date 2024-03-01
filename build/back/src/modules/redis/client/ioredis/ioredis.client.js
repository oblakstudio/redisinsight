"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoredisClient = void 0;
const lodash_1 = require("lodash");
const ioredis_1 = require("ioredis");
const client_1 = require("..");
class IoredisClient extends client_1.RedisClient {
    static prepareCommandOptions(options) {
        let replyEncoding = null;
        if ((options === null || options === void 0 ? void 0 : options.replyEncoding) === 'utf8') {
            replyEncoding = 'utf8';
        }
        return {
            replyEncoding,
        };
    }
    static prepareCommandArgs(args) {
        const strArgs = args.map((arg) => ((0, lodash_1.isNumber)(arg) ? arg.toString() : arg));
        return [...strArgs.shift().split(' '), ...strArgs];
    }
    isConnected() {
        try {
            return this.client.status === 'ready';
        }
        catch (e) {
            return false;
        }
    }
    async nodes() {
        return [this];
    }
    async sendPipeline(commands, options) {
        let batch = commands.map((command) => IoredisClient.prepareCommandArgs(command));
        if (options === null || options === void 0 ? void 0 : options.unknownCommands) {
            batch = commands.map((command) => ['call', ...command]);
        }
        return await this.client.pipeline(batch).exec();
    }
    async sendCommand(command, options) {
        const [cmd, ...args] = IoredisClient.prepareCommandArgs(command);
        return await this.client.sendCommand(new ioredis_1.Command(cmd, args, IoredisClient.prepareCommandOptions(options)));
    }
    async call(command, options) {
        if (IoredisClient.prepareCommandOptions(options).replyEncoding === null) {
            return await this.client.callBuffer(...command);
        }
        return await this.client.call(...command);
    }
    async publish(channel, message) {
        return this.client.publish(channel, message);
    }
    async subscribe(channel) {
        const listenerCount = this.client.listenerCount('message');
        if (listenerCount === 0) {
            this.client.on('message', (messageChannel, message) => {
                this.emit('message', messageChannel, message);
            });
        }
        await this.client.subscribe(channel);
    }
    async pSubscribe(channel) {
        const listenerCount = this.client.listenerCount('pmessage');
        if (listenerCount === 0) {
            this.client.on('pmessage', (pattern, messageChannel, message) => {
                this.emit('pmessage', pattern, messageChannel, message);
            });
        }
        await this.client.psubscribe(channel);
    }
    async unsubscribe(channel) {
        await this.client.unsubscribe(channel);
    }
    async pUnsubscribe(channel) {
        await this.client.punsubscribe(channel);
    }
    async monitor() {
        if (this.client instanceof ioredis_1.default) {
            const monitorClient = this.client.monitor();
            this.client.disconnect();
            return monitorClient;
        }
        return undefined;
    }
    async disconnect() {
        this.client.disconnect();
    }
    async quit() {
        await this.client.quit();
    }
    async getCurrentDbIndex() {
        return (0, lodash_1.get)(this.client, ['options', 'db'], 0);
    }
}
exports.IoredisClient = IoredisClient;
