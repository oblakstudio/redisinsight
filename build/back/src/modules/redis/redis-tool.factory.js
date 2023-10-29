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
exports.RedisToolFactory = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("./redis.service");
const redis_tool_service_1 = require("./redis-tool.service");
const database_service_1 = require("../database/database.service");
const redis_connection_factory_1 = require("./redis-connection.factory");
let RedisToolFactory = class RedisToolFactory {
    constructor(redisService, redisConnectionFactory, databaseService) {
        this.redisService = redisService;
        this.redisConnectionFactory = redisConnectionFactory;
        this.databaseService = databaseService;
    }
    createRedisTool(clientContext, options = {}) {
        return new redis_tool_service_1.RedisToolService(clientContext, this.redisService, this.redisConnectionFactory, this.databaseService, options);
    }
};
RedisToolFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        redis_connection_factory_1.RedisConnectionFactory,
        database_service_1.DatabaseService])
], RedisToolFactory);
exports.RedisToolFactory = RedisToolFactory;
