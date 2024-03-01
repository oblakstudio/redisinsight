"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StreamModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamModule = void 0;
const common_1 = require("@nestjs/common");
const nest_router_1 = require("nest-router");
const redis_connection_middleware_1 = require("../../../middleware/redis-connection.middleware");
const stream_controller_1 = require("./controllers/stream.controller");
const consumer_controller_1 = require("./controllers/consumer.controller");
const consumer_group_controller_1 = require("./controllers/consumer-group.controller");
const stream_service_1 = require("./services/stream.service");
const consumer_service_1 = require("./services/consumer.service");
const consumer_group_service_1 = require("./services/consumer-group.service");
let StreamModule = StreamModule_1 = class StreamModule {
    static register({ route }) {
        return {
            module: StreamModule_1,
            imports: [
                nest_router_1.RouterModule.forRoutes([{
                        path: route,
                        module: StreamModule_1,
                    }]),
            ],
            controllers: [
                stream_controller_1.StreamController,
                consumer_controller_1.ConsumerController,
                consumer_group_controller_1.ConsumerGroupController,
            ],
            providers: [
                stream_service_1.StreamService,
                consumer_service_1.ConsumerService,
                consumer_group_service_1.ConsumerGroupService,
            ],
        };
    }
    configure(consumer) {
        consumer
            .apply(redis_connection_middleware_1.RedisConnectionMiddleware)
            .forRoutes(nest_router_1.RouterModule.resolvePath(stream_controller_1.StreamController), nest_router_1.RouterModule.resolvePath(consumer_group_controller_1.ConsumerGroupController), nest_router_1.RouterModule.resolvePath(consumer_controller_1.ConsumerController));
    }
};
StreamModule = StreamModule_1 = __decorate([
    (0, common_1.Module)({})
], StreamModule);
exports.StreamModule = StreamModule;
