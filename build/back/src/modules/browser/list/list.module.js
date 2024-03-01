"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ListModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListModule = void 0;
const common_1 = require("@nestjs/common");
const nest_router_1 = require("nest-router");
const redis_connection_middleware_1 = require("../../../middleware/redis-connection.middleware");
const list_service_1 = require("./list.service");
const list_controller_1 = require("./list.controller");
let ListModule = ListModule_1 = class ListModule {
    static register({ route }) {
        return {
            module: ListModule_1,
            imports: [
                nest_router_1.RouterModule.forRoutes([{
                        path: route,
                        module: ListModule_1,
                    }]),
            ],
            controllers: [list_controller_1.ListController],
            providers: [list_service_1.ListService],
        };
    }
    configure(consumer) {
        consumer
            .apply(redis_connection_middleware_1.RedisConnectionMiddleware)
            .forRoutes(nest_router_1.RouterModule.resolvePath(list_controller_1.ListController));
    }
};
ListModule = ListModule_1 = __decorate([
    (0, common_1.Module)({})
], ListModule);
exports.ListModule = ListModule;
