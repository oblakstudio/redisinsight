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
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const config_1 = require("../../utils/config");
const models_1 = require("../../common/models");
const REDIS_CLIENTS_CONFIG = config_1.default.get('redis_clients');
let RedisService = RedisService_1 = class RedisService {
    constructor() {
        this.clients = new Map();
        setInterval(this.syncClients.bind(this), 60 * 1000);
    }
    onModuleDestroy() {
        clearInterval(this.syncInterval);
    }
    syncClients() {
        [...this.clients.keys()].forEach((id) => {
            try {
                const redisClient = this.clients.get(id);
                if (redisClient && (Date.now() - redisClient.lastTimeUsed) >= REDIS_CLIENTS_CONFIG.maxIdleThreshold) {
                    redisClient.client.disconnect();
                    this.clients.delete(id);
                }
            }
            catch (e) {
            }
        });
    }
    getClientInstance(clientMetadata) {
        const metadata = RedisService_1.prepareClientMetadata(clientMetadata);
        const found = this.clients.get(RedisService_1.generateId(metadata));
        if (found) {
            found.lastTimeUsed = Date.now();
        }
        return found;
    }
    setClientInstance(clientMetadata, client) {
        const metadata = RedisService_1.prepareClientMetadata(clientMetadata);
        const id = RedisService_1.generateId(metadata);
        const found = this.clients.get(id);
        const clientInstance = {
            id,
            clientMetadata: metadata,
            client,
            lastTimeUsed: Date.now(),
        };
        if (found) {
            if (this.isClientConnected(found.client)) {
                found.lastTimeUsed = Date.now();
                client.disconnect();
                return found;
            }
            found.client.disconnect();
        }
        this.clients.set(id, clientInstance);
        return clientInstance;
    }
    removeClientInstance(clientMetadata) {
        const metadata = RedisService_1.prepareClientMetadata(clientMetadata);
        const id = RedisService_1.generateId(metadata);
        const found = this.clients.get(id);
        if (found) {
            found.client.disconnect();
            this.clients.delete(id);
            return 1;
        }
        return 0;
    }
    removeClientInstances(clientMetadata) {
        const toRemove = this.findClientInstances(clientMetadata);
        toRemove.forEach((redisClient) => {
            redisClient.client.disconnect();
            this.clients.delete(redisClient.id);
        });
        return toRemove.length;
    }
    findClientInstances(clientMetadata) {
        const findOptions = (0, lodash_1.omit)(clientMetadata, 'sessionMetadata');
        return [...this.clients.values()]
            .filter((redisClient) => (0, lodash_1.isMatch)(redisClient.clientMetadata, findOptions));
    }
    isClientConnected(client) {
        try {
            return client.status === 'ready';
        }
        catch (e) {
            return false;
        }
    }
    static prepareClientMetadata(clientMetadata) {
        return {
            ...clientMetadata,
            db: clientMetadata.context === models_1.ClientContext.CLI ? null : clientMetadata.db,
        };
    }
    static generateId(cm) {
        const empty = '(nil)';
        const separator = '_';
        const id = [
            cm.databaseId,
            cm.context,
            cm.uniqueId || empty,
            (0, lodash_1.isNumber)(cm.db) ? cm.db : empty,
        ].join(separator);
        return [
            id,
        ].join(separator);
    }
};
RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
exports.RedisService = RedisService;
