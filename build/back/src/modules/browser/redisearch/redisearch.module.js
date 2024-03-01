"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RedisearchModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisearchModule = void 0;
const common_1 = require("@nestjs/common");
const nest_router_1 = require("nest-router");
const redisearch_service_1 = require("./redisearch.service");
const redisearch_controller_1 = require("./redisearch.controller");
let RedisearchModule = RedisearchModule_1 = class RedisearchModule {
    static register({ route }) {
        return {
            module: RedisearchModule_1,
            imports: [
                nest_router_1.RouterModule.forRoutes([{
                        path: route,
                        module: RedisearchModule_1,
                    }]),
            ],
            controllers: [redisearch_controller_1.RedisearchController],
            providers: [
                redisearch_service_1.RedisearchService,
            ],
        };
    }
};
RedisearchModule = RedisearchModule_1 = __decorate([
    (0, common_1.Module)({})
], RedisearchModule);
exports.RedisearchModule = RedisearchModule;
