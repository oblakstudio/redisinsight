"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var KeysModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysModule = void 0;
const common_1 = require("@nestjs/common");
const nest_router_1 = require("nest-router");
const redis_connection_middleware_1 = require("../../../middleware/redis-connection.middleware");
const keys_controller_1 = require("./keys.controller");
const standalone_scanner_strategy_1 = require("./scanner/strategies/standalone.scanner.strategy");
const cluster_scanner_strategy_1 = require("./scanner/strategies/cluster.scanner.strategy");
const scanner_1 = require("./scanner/scanner");
const keys_service_1 = require("./keys.service");
const key_info_provider_1 = require("./key-info/key-info.provider");
const graph_key_info_strategy_1 = require("./key-info/strategies/graph.key-info.strategy");
const hash_key_info_strategy_1 = require("./key-info/strategies/hash.key-info.strategy");
const list_key_info_strategy_1 = require("./key-info/strategies/list.key-info.strategy");
const rejson_rl_key_info_strategy_1 = require("./key-info/strategies/rejson-rl.key-info.strategy");
const set_key_info_strategy_1 = require("./key-info/strategies/set.key-info.strategy");
const stream_key_info_strategy_1 = require("./key-info/strategies/stream.key-info.strategy");
const string_key_info_strategy_1 = require("./key-info/strategies/string.key-info.strategy");
const ts_key_info_strategy_1 = require("./key-info/strategies/ts.key-info.strategy");
const unsupported_key_info_strategy_1 = require("./key-info/strategies/unsupported.key-info.strategy");
const z_set_key_info_strategy_1 = require("./key-info/strategies/z-set.key-info.strategy");
let KeysModule = KeysModule_1 = class KeysModule {
    static register({ route }) {
        return {
            module: KeysModule_1,
            imports: [
                nest_router_1.RouterModule.forRoutes([{
                        path: route,
                        module: KeysModule_1,
                    }]),
            ],
            controllers: [keys_controller_1.KeysController],
            providers: [
                scanner_1.Scanner,
                standalone_scanner_strategy_1.StandaloneScannerStrategy,
                cluster_scanner_strategy_1.ClusterScannerStrategy,
                keys_service_1.KeysService,
                key_info_provider_1.KeyInfoProvider,
                standalone_scanner_strategy_1.StandaloneScannerStrategy,
                cluster_scanner_strategy_1.ClusterScannerStrategy,
                graph_key_info_strategy_1.GraphKeyInfoStrategy,
                hash_key_info_strategy_1.HashKeyInfoStrategy,
                list_key_info_strategy_1.ListKeyInfoStrategy,
                rejson_rl_key_info_strategy_1.RejsonRlKeyInfoStrategy,
                set_key_info_strategy_1.SetKeyInfoStrategy,
                stream_key_info_strategy_1.StreamKeyInfoStrategy,
                string_key_info_strategy_1.StringKeyInfoStrategy,
                ts_key_info_strategy_1.TsKeyInfoStrategy,
                unsupported_key_info_strategy_1.UnsupportedKeyInfoStrategy,
                z_set_key_info_strategy_1.ZSetKeyInfoStrategy,
            ],
        };
    }
    configure(consumer) {
        consumer
            .apply(redis_connection_middleware_1.RedisConnectionMiddleware)
            .forRoutes(nest_router_1.RouterModule.resolvePath(keys_controller_1.KeysController));
    }
};
KeysModule = KeysModule_1 = __decorate([
    (0, common_1.Module)({})
], KeysModule);
exports.KeysModule = KeysModule;
