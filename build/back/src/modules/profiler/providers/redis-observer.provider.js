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
exports.RedisObserverProvider = void 0;
const common_1 = require("@nestjs/common");
const redis_observer_1 = require("../models/redis.observer");
const constants_1 = require("../constants");
const promise_with_timeout_1 = require("../../../utils/promise-with-timeout");
const error_messages_1 = require("../../../constants/error-messages");
const config_1 = require("../../../utils/config");
const models_1 = require("../../../common/models");
const database_client_factory_1 = require("../../database/providers/database.client.factory");
const redis_client_factory_1 = require("../../redis/redis.client.factory");
const serverConfig = config_1.default.get('server');
let RedisObserverProvider = class RedisObserverProvider {
    constructor(databaseClientFactory) {
        this.databaseClientFactory = databaseClientFactory;
        this.logger = new common_1.Logger('RedisObserverProvider');
        this.redisObservers = new Map();
    }
    async getOrCreateObserver(instanceId) {
        this.logger.log('Getting redis observer...');
        let redisObserver = this.redisObservers.get(instanceId);
        try {
            if (!redisObserver) {
                this.logger.debug('Creating new RedisObserver');
                redisObserver = new redis_observer_1.RedisObserver();
                this.redisObservers.set(instanceId, redisObserver);
                redisObserver.init(this.getRedisClientFn({
                    sessionMetadata: undefined,
                    databaseId: instanceId,
                    context: models_1.ClientContext.Profiler,
                })).catch();
            }
            else {
                switch (redisObserver.status) {
                    case constants_1.RedisObserverStatus.Ready:
                        this.logger.debug(`Using existing RedisObserver with status: ${redisObserver.status}`);
                        return redisObserver;
                    case constants_1.RedisObserverStatus.Empty:
                    case constants_1.RedisObserverStatus.End:
                    case constants_1.RedisObserverStatus.Error:
                        this.logger.debug(`Trying to reconnect. Current status: ${redisObserver.status}`);
                        redisObserver.init(this.getRedisClientFn({
                            sessionMetadata: undefined,
                            databaseId: instanceId,
                            context: models_1.ClientContext.Profiler,
                        })).catch();
                        break;
                    case constants_1.RedisObserverStatus.Initializing:
                    case constants_1.RedisObserverStatus.Wait:
                    case constants_1.RedisObserverStatus.Connected:
                    default:
                        this.logger.debug(`Waiting for ready. Current status: ${redisObserver.status}`);
                }
            }
            return new Promise((resolve, reject) => {
                redisObserver.once('connect', () => {
                    resolve(redisObserver);
                });
                redisObserver.once('connect_error', (e) => {
                    reject(e);
                });
            });
        }
        catch (error) {
            this.logger.error(`Failed to get monitor observer. ${error.message}.`, JSON.stringify(error));
            throw error;
        }
    }
    async getObserver(instanceId) {
        return this.redisObservers.get(instanceId);
    }
    async removeObserver(instanceId) {
        this.redisObservers.delete(instanceId);
    }
    getRedisClientFn(clientMetadata) {
        return async () => (0, promise_with_timeout_1.withTimeout)(this.databaseClientFactory.createClient(clientMetadata, { clientLib: redis_client_factory_1.RedisClientLib.IOREDIS }), serverConfig.requestTimeout, new common_1.ServiceUnavailableException(error_messages_1.default.NO_CONNECTION_TO_REDIS_DB));
    }
};
RedisObserverProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory])
], RedisObserverProvider);
exports.RedisObserverProvider = RedisObserverProvider;
