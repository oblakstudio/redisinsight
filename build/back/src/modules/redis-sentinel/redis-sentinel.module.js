"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisSentinelModule = void 0;
const common_1 = require("@nestjs/common");
const redis_sentinel_service_1 = require("./redis-sentinel.service");
const redis_sentinel_controller_1 = require("./redis-sentinel.controller");
const redis_sentinel_analytics_1 = require("./redis-sentinel.analytics");
let RedisSentinelModule = class RedisSentinelModule {
};
RedisSentinelModule = __decorate([
    (0, common_1.Module)({
        controllers: [redis_sentinel_controller_1.RedisSentinelController],
        providers: [
            redis_sentinel_service_1.RedisSentinelService,
            redis_sentinel_analytics_1.RedisSentinelAnalytics,
        ],
        exports: [
            redis_sentinel_service_1.RedisSentinelService,
            redis_sentinel_analytics_1.RedisSentinelAnalytics,
        ],
    })
], RedisSentinelModule);
exports.RedisSentinelModule = RedisSentinelModule;
