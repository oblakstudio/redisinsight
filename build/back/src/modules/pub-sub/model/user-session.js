"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSession = void 0;
const constants_1 = require("../constants");
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../constants/error-messages");
const pub_sub_ws_exception_1 = require("../errors/pub-sub-ws.exception");
class UserSession {
    constructor(userClient, redisClient) {
        this.logger = new common_1.Logger('UserSession');
        this.subscriptions = new Map();
        this.id = userClient.getId();
        this.userClient = userClient;
        this.redisClient = redisClient;
        redisClient.on(constants_1.RedisClientSubscriberEvents.Message, this.handleMessage.bind(this));
        redisClient.on(constants_1.RedisClientSubscriberEvents.End, this.handleDisconnect.bind(this));
    }
    getId() { return this.id; }
    getUserClient() { return this.userClient; }
    getRedisClient() { return this.redisClient; }
    async subscribe(subscription) {
        var _a;
        this.logger.debug(`Subscribe ${subscription} ${this}. Getting Redis client...`);
        const client = await ((_a = this.redisClient) === null || _a === void 0 ? void 0 : _a.getClient());
        if (!client) {
            throw new Error('There is no Redis client initialized');
        }
        if (!this.subscriptions.has(subscription.getId())) {
            this.subscriptions.set(subscription.getId(), subscription);
            this.logger.debug(`Subscribe to Redis ${subscription} ${this}`);
            await subscription.subscribe(client);
        }
    }
    async unsubscribe(subscription) {
        var _a;
        this.logger.debug(`Unsubscribe ${subscription} ${this}`);
        this.subscriptions.delete(subscription.getId());
        const client = await ((_a = this.redisClient) === null || _a === void 0 ? void 0 : _a.getClient());
        if (client) {
            this.logger.debug(`Unsubscribe from Redis ${subscription} ${this}`);
            await subscription.unsubscribe(client);
            if (!this.subscriptions.size) {
                this.logger.debug(`Unsubscribe: Destroy RedisClient ${this}`);
                this.redisClient.destroy();
            }
        }
    }
    handleMessage(id, message) {
        const subscription = this.subscriptions.get(id);
        if (subscription) {
            subscription.pushMessage(message);
        }
    }
    handleDisconnect() {
        this.logger.debug(`Handle disconnect ${this}`);
        this.userClient.getSocket().emit(constants_1.PubSubServerEvents.Exception, new pub_sub_ws_exception_1.PubSubWsException(error_messages_1.default.NO_CONNECTION_TO_REDIS_DB));
        this.destroy();
    }
    destroy() {
        this.logger.debug(`Destroy ${this}`);
        this.subscriptions = new Map();
        this.redisClient.destroy();
        this.logger.debug(`Destroyed ${this}`);
    }
    toString() {
        return `UserSession:${JSON.stringify({
            id: this.id,
            subscriptionsSize: this.subscriptions.size,
            subscriptions: [...this.subscriptions.keys()],
        })}`;
    }
}
exports.UserSession = UserSession;
