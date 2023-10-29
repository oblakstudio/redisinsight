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
const redis_tool_factory_1 = require("./redis-tool.factory");
const redis_service_1 = require("./redis.service");
const redis_connection_factory_1 = require("./redis-connection.factory");
let RedisModule = class RedisModule {
};
RedisModule = __decorate([
    (0, common_1.Module)({
        providers: [
            redis_service_1.RedisService,
            redis_tool_factory_1.RedisToolFactory,
            redis_connection_factory_1.RedisConnectionFactory,
        ],
        exports: [
            redis_service_1.RedisService,
            redis_tool_factory_1.RedisToolFactory,
            redis_connection_factory_1.RedisConnectionFactory,
        ],
    })
], RedisModule);
exports.RedisModule = RedisModule;
