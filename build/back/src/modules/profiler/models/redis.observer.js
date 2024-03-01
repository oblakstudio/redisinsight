"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisObserver = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../constants");
const constants_2 = require("../constants");
const error_messages_1 = require("../../../constants/error-messages");
const event_emitter_1 = require("@nestjs/event-emitter");
class RedisObserver extends event_emitter_1.EventEmitter2 {
    constructor() {
        super();
        this.logger = new common_1.Logger('RedisObserver');
        this.profilerClients = new Map();
        this.profilerClientsListeners = new Map();
        this.shardsObservers = [];
        this.status = constants_2.RedisObserverStatus.Empty;
    }
    init(func) {
        this.status = constants_2.RedisObserverStatus.Initializing;
        return func()
            .then((redis) => {
            this.redis = redis;
            this.status = constants_2.RedisObserverStatus.Connected;
        })
            .then(() => this.connect())
            .then(() => {
            this.emit('connect');
            return Promise.resolve();
        })
            .catch((err) => {
            this.status = constants_2.RedisObserverStatus.Error;
            this.emit('connect_error', err);
        });
    }
    async subscribe(profilerClient) {
        if (this.status !== constants_2.RedisObserverStatus.Ready) {
            await this.connect();
        }
        if (this.profilerClients.has(profilerClient.id)) {
            return;
        }
        if (!this.profilerClientsListeners.get(profilerClient.id)) {
            this.profilerClientsListeners.set(profilerClient.id, []);
        }
        const profilerListeners = this.profilerClientsListeners.get(profilerClient.id);
        this.shardsObservers.forEach((observer) => {
            const monitorListenerFn = (time, args, source, database) => {
                profilerClient.handleOnData({
                    time, args, database, source, shardOptions: observer.options,
                });
            };
            const endListenerFn = () => {
                profilerClient.handleOnDisconnect();
                this.clear();
            };
            observer.on('monitor', monitorListenerFn);
            observer.on('end', endListenerFn);
            profilerListeners.push(monitorListenerFn, endListenerFn);
            this.logger.debug(`Subscribed to shard observer. Current listeners: ${observer.listenerCount('monitor')}`);
        });
        this.profilerClients.set(profilerClient.id, profilerClient);
        this.logger.debug(`Profiler Client with id:${profilerClient.id} was added`);
        this.logCurrentState();
    }
    removeShardsListeners(profilerClientId) {
        this.shardsObservers.forEach((observer) => {
            (this.profilerClientsListeners.get(profilerClientId) || []).forEach((listener) => {
                observer.removeListener('monitor', listener);
                observer.removeListener('end', listener);
            });
            this.logger.debug(`Unsubscribed from from shard observer. Current listeners: ${observer.listenerCount('monitor')}`);
        });
    }
    unsubscribe(id) {
        this.removeShardsListeners(id);
        this.profilerClients.delete(id);
        this.profilerClientsListeners.delete(id);
        if (this.profilerClients.size === 0) {
            this.clear();
        }
        this.logger.debug(`Profiler Client with id:${id} was unsubscribed`);
        this.logCurrentState();
    }
    disconnect(id) {
        this.removeShardsListeners(id);
        const profilerClient = this.profilerClients.get(id);
        if (profilerClient) {
            profilerClient.destroy();
        }
        this.profilerClients.delete(id);
        this.profilerClientsListeners.delete(id);
        if (this.profilerClients.size === 0) {
            this.clear();
        }
        this.logger.debug(`Profiler Client with id:${id} was disconnected`);
        this.logCurrentState();
    }
    logCurrentState() {
        this.logger.debug(`Status: ${this.status}; Shards: ${this.shardsObservers.length}; Listeners: ${this.getProfilerClientsSize()}`);
    }
    clear() {
        this.profilerClients.clear();
        this.shardsObservers.forEach((observer) => {
            observer.removeAllListeners('monitor');
            observer.removeAllListeners('end');
            observer.disconnect();
        });
        this.shardsObservers = [];
        this.status = constants_2.RedisObserverStatus.End;
    }
    getProfilerClientsSize() {
        return this.profilerClients.size;
    }
    async connect() {
        var _a;
        try {
            this.shardsObservers = await Promise.all((await this.redis.nodes()).map(RedisObserver.createShardObserver));
            this.shardsObservers.forEach((observer) => {
                observer.on('error', (e) => {
                    this.logger.error('Error on shard observer', e);
                });
            });
            this.status = constants_2.RedisObserverStatus.Ready;
        }
        catch (error) {
            this.status = constants_2.RedisObserverStatus.Error;
            if ((_a = error === null || error === void 0 ? void 0 : error.message) === null || _a === void 0 ? void 0 : _a.includes(constants_1.RedisErrorCodes.NoPermission)) {
                throw new common_1.ForbiddenException(error.message);
            }
            throw new common_1.ServiceUnavailableException(error_messages_1.default.NO_CONNECTION_TO_REDIS_DB);
        }
    }
    static async createShardObserver(redis) {
        return await redis.monitor();
    }
}
exports.RedisObserver = RedisObserver;
