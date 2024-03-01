"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const common_1 = require("@nestjs/common");
const redis_client_factory_1 = require("./redis.client.factory");
const ioredis_redis_connection_strategy_1 = require("./connection/ioredis.redis.connection.strategy");
const node_redis_connection_strategy_1 = require("./connection/node.redis.connection.strategy");
const redis_client_storage_1 = require("./redis.client.storage");
let RedisModule = class RedisModule {
};
RedisModule = __decorate([
    (0, common_1.Module)({
        providers: [
            redis_client_storage_1.RedisClientStorage,
            redis_client_factory_1.RedisClientFactory,
            ioredis_redis_connection_strategy_1.IoredisRedisConnectionStrategy,
            node_redis_connection_strategy_1.NodeRedisConnectionStrategy,
        ],
        exports: [
            redis_client_storage_1.RedisClientStorage,
            redis_client_factory_1.RedisClientFactory,
        ],
    })
], RedisModule);
exports.RedisModule = RedisModule;
