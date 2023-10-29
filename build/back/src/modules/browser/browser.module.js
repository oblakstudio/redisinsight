"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserModule = void 0;
const common_1 = require("@nestjs/common");
const nest_router_1 = require("nest-router");
const redis_connection_middleware_1 = require("../../middleware/redis-connection.middleware");
const stream_controller_1 = require("./controllers/stream/stream.controller");
const stream_service_1 = require("./services/stream/stream.service");
const consumer_group_controller_1 = require("./controllers/stream/consumer-group.controller");
const consumer_group_service_1 = require("./services/stream/consumer-group.service");
const consumer_controller_1 = require("./controllers/stream/consumer.controller");
const consumer_service_1 = require("./services/stream/consumer.service");
const redisearch_controller_1 = require("./controllers/redisearch/redisearch.controller");
const redisearch_service_1 = require("./services/redisearch/redisearch.service");
const hash_controller_1 = require("./controllers/hash/hash.controller");
const keys_controller_1 = require("./controllers/keys/keys.controller");
const keys_business_service_1 = require("./services/keys-business/keys-business.service");
const string_controller_1 = require("./controllers/string/string.controller");
const list_controller_1 = require("./controllers/list/list.controller");
const set_controller_1 = require("./controllers/set/set.controller");
const z_set_controller_1 = require("./controllers/z-set/z-set.controller");
const rejson_rl_controller_1 = require("./controllers/rejson-rl/rejson-rl.controller");
const hash_business_service_1 = require("./services/hash-business/hash-business.service");
const set_business_service_1 = require("./services/set-business/set-business.service");
const string_business_service_1 = require("./services/string-business/string-business.service");
const list_business_service_1 = require("./services/list-business/list-business.service");
const z_set_business_service_1 = require("./services/z-set-business/z-set-business.service");
const rejson_rl_business_service_1 = require("./services/rejson-rl-business/rejson-rl-business.service");
const browser_tool_service_1 = require("./services/browser-tool/browser-tool.service");
const browser_tool_cluster_service_1 = require("./services/browser-tool-cluster/browser-tool-cluster.service");
const browser_history_service_1 = require("./services/browser-history/browser-history.service");
const browser_history_provider_1 = require("./providers/history/browser-history.provider");
const browser_history_controller_1 = require("./controllers/history/browser-history.controller");
let BrowserModule = class BrowserModule {
    configure(consumer) {
        consumer
            .apply(redis_connection_middleware_1.RedisConnectionMiddleware)
            .forRoutes(nest_router_1.RouterModule.resolvePath(keys_controller_1.KeysController), nest_router_1.RouterModule.resolvePath(string_controller_1.StringController), nest_router_1.RouterModule.resolvePath(hash_controller_1.HashController), nest_router_1.RouterModule.resolvePath(list_controller_1.ListController), nest_router_1.RouterModule.resolvePath(set_controller_1.SetController), nest_router_1.RouterModule.resolvePath(z_set_controller_1.ZSetController), nest_router_1.RouterModule.resolvePath(rejson_rl_controller_1.RejsonRlController), nest_router_1.RouterModule.resolvePath(stream_controller_1.StreamController), nest_router_1.RouterModule.resolvePath(consumer_group_controller_1.ConsumerGroupController), nest_router_1.RouterModule.resolvePath(consumer_controller_1.ConsumerController));
    }
};
BrowserModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            keys_controller_1.KeysController,
            string_controller_1.StringController,
            list_controller_1.ListController,
            set_controller_1.SetController,
            z_set_controller_1.ZSetController,
            rejson_rl_controller_1.RejsonRlController,
            redisearch_controller_1.RedisearchController,
            hash_controller_1.HashController,
            stream_controller_1.StreamController,
            consumer_group_controller_1.ConsumerGroupController,
            consumer_controller_1.ConsumerController,
            browser_history_controller_1.BrowserHistoryController,
        ],
        providers: [
            keys_business_service_1.KeysBusinessService,
            string_business_service_1.StringBusinessService,
            list_business_service_1.ListBusinessService,
            set_business_service_1.SetBusinessService,
            z_set_business_service_1.ZSetBusinessService,
            rejson_rl_business_service_1.RejsonRlBusinessService,
            redisearch_service_1.RedisearchService,
            hash_business_service_1.HashBusinessService,
            stream_service_1.StreamService,
            consumer_group_service_1.ConsumerGroupService,
            consumer_service_1.ConsumerService,
            browser_tool_service_1.BrowserToolService,
            browser_tool_cluster_service_1.BrowserToolClusterService,
            browser_history_service_1.BrowserHistoryService,
            browser_history_provider_1.BrowserHistoryProvider,
        ],
    })
], BrowserModule);
exports.BrowserModule = BrowserModule;
