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
exports.RedisClientStorage = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const client_1 = require("./client");
const config_1 = require("../../utils/config");
const REDIS_CLIENTS_CONFIG = config_1.default.get('redis_clients');
let RedisClientStorage = class RedisClientStorage {
    constructor() {
        this.logger = new common_1.Logger('RedisClientStorage');
        this.clients = new Map();
        this.syncInterval = setInterval(this.syncClients.bind(this), REDIS_CLIENTS_CONFIG.syncInterval);
    }
    onModuleDestroy() {
        clearInterval(this.syncInterval);
    }
    syncClients() {
        try {
            this.clients.forEach((client) => {
                if (client.isIdle()) {
                    client.disconnect().catch((e) => this.logger.warn('Unable to disconnect client after idle', e));
                    this.clients.delete(client.id);
                }
            });
        }
        catch (e) {
        }
    }
    findClients(clientMetadata) {
        return [...this.clients.values()]
            .filter((redisClient) => (0, lodash_1.isMatch)(redisClient['clientMetadata'], clientMetadata))
            .map((client) => client.id);
    }
    async get(id) {
        const client = this.clients.get(id);
        if (client) {
            if (!client.isConnected()) {
                await this.remove(client.id);
                return null;
            }
            client.setLastUsed();
        }
        return client;
    }
    async getByMetadata(clientMetadata) {
        return this.get(client_1.RedisClient.generateId(client_1.RedisClient.prepareClientMetadata(clientMetadata)));
    }
    async set(client) {
        var _a;
        if (!client.clientMetadata.databaseId
            || !client.clientMetadata.context
            || !((_a = client.clientMetadata.sessionMetadata) === null || _a === void 0 ? void 0 : _a.sessionId)
            || !client.clientMetadata.sessionMetadata.userId) {
            throw new common_1.BadRequestException('Client metadata missed required properties');
        }
        const existingClient = this.clients.get(client.id);
        if (existingClient) {
            if (existingClient.isConnected()) {
                await client.disconnect().catch();
                return this.get(client.id);
            }
            await existingClient.disconnect().catch();
        }
        this.clients.set(client.id, client);
        return client;
    }
    async remove(id) {
        const client = this.clients.get(id);
        if (client) {
            await client.disconnect()
                .catch((e) => this.logger.warn('Unable to disconnect client', e));
            this.clients.delete(id);
            return 1;
        }
        return 0;
    }
    async removeByMetadata(clientMetadata) {
        return this.remove(client_1.RedisClient.generateId(client_1.RedisClient.prepareClientMetadata(clientMetadata)));
    }
    async removeManyByMetadata(clientMetadata) {
        const toRemove = this.findClients(clientMetadata);
        this.logger.debug(`Trying to remove ${toRemove.length} clients`);
        return (0, lodash_1.sum)(await Promise.all(toRemove.map(this.remove.bind(this))));
    }
};
RedisClientStorage = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisClientStorage);
exports.RedisClientStorage = RedisClientStorage;
