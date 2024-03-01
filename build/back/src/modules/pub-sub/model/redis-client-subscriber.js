"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClientSubscriber = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("../constants");
class RedisClientSubscriber extends event_emitter_1.EventEmitter2 {
    constructor(databaseId, connectFn) {
        super();
        this.logger = new common_1.Logger('RedisClientSubscriber');
        this.databaseId = databaseId;
        this.connectFn = connectFn;
    }
    async getClient() {
        try {
            this.logger.debug(`Get client ${this}`);
            switch (this.status) {
                case constants_1.RedisClientSubscriberStatus.Connected:
                    return this.client;
                case constants_1.RedisClientSubscriberStatus.Connecting:
                    break;
                case constants_1.RedisClientSubscriberStatus.Error:
                case constants_1.RedisClientSubscriberStatus.End:
                default:
                    await this.connect();
                    return this.client;
            }
            return new Promise((resolve, reject) => {
                this.once(constants_1.RedisClientSubscriberEvents.Connected, resolve);
                this.once(constants_1.RedisClientSubscriberEvents.ConnectionError, reject);
            });
        }
        catch (e) {
            this.logger.error('Unable to connect to Redis', e);
            this.status = constants_1.RedisClientSubscriberStatus.Error;
            this.emit(constants_1.RedisClientSubscriberEvents.ConnectionError, e);
            throw e;
        }
    }
    async connect() {
        this.status = constants_1.RedisClientSubscriberStatus.Connecting;
        this.client = await this.connectFn();
        this.status = constants_1.RedisClientSubscriberStatus.Connected;
        this.emit(constants_1.RedisClientSubscriberEvents.Connected, this.client);
        this.client.on('message', (channel, message) => {
            this.emit(constants_1.RedisClientSubscriberEvents.Message, `s:${channel}`, {
                channel,
                message,
                time: Date.now(),
            });
        });
        this.client.on('pmessage', (pattern, channel, message) => {
            this.emit(constants_1.RedisClientSubscriberEvents.Message, `p:${pattern}`, {
                channel,
                message,
                time: Date.now(),
            });
        });
        this.client.on('end', () => {
            this.status = constants_1.RedisClientSubscriberStatus.End;
            this.emit(constants_1.RedisClientSubscriberEvents.End);
        });
    }
    destroy() {
        var _a, _b;
        (_a = this.client) === null || _a === void 0 ? void 0 : _a.removeAllListeners();
        (_b = this.client) === null || _b === void 0 ? void 0 : _b.quit();
        this.client = null;
        this.status = constants_1.RedisClientSubscriberStatus.End;
    }
    toString() {
        return `RedisClient:${JSON.stringify({
            databaseId: this.databaseId,
            status: this.status,
        })}`;
    }
}
exports.RedisClientSubscriber = RedisClientSubscriber;
