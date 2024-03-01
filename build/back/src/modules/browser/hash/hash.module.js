"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HashModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashModule = void 0;
const common_1 = require("@nestjs/common");
const nest_router_1 = require("nest-router");
const redis_connection_middleware_1 = require("../../../middleware/redis-connection.middleware");
const hash_service_1 = require("./hash.service");
const hash_controller_1 = require("./hash.controller");
let HashModule = HashModule_1 = class HashModule {
    static register({ route }) {
        return {
            module: HashModule_1,
            imports: [
                nest_router_1.RouterModule.forRoutes([{
                        path: route,
                        module: HashModule_1,
                    }]),
            ],
            controllers: [hash_controller_1.HashController],
            providers: [hash_service_1.HashService],
        };
    }
    configure(consumer) {
        consumer
            .apply(redis_connection_middleware_1.RedisConnectionMiddleware)
            .forRoutes(nest_router_1.RouterModule.resolvePath(hash_controller_1.HashController));
    }
};
HashModule = HashModule_1 = __decorate([
    (0, common_1.Module)({})
], HashModule);
exports.HashModule = HashModule;
