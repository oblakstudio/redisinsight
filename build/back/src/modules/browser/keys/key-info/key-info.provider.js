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
exports.KeyInfoProvider = void 0;
const graph_key_info_strategy_1 = require("./strategies/graph.key-info.strategy");
const hash_key_info_strategy_1 = require("./strategies/hash.key-info.strategy");
const list_key_info_strategy_1 = require("./strategies/list.key-info.strategy");
const rejson_rl_key_info_strategy_1 = require("./strategies/rejson-rl.key-info.strategy");
const set_key_info_strategy_1 = require("./strategies/set.key-info.strategy");
const stream_key_info_strategy_1 = require("./strategies/stream.key-info.strategy");
const string_key_info_strategy_1 = require("./strategies/string.key-info.strategy");
const ts_key_info_strategy_1 = require("./strategies/ts.key-info.strategy");
const unsupported_key_info_strategy_1 = require("./strategies/unsupported.key-info.strategy");
const z_set_key_info_strategy_1 = require("./strategies/z-set.key-info.strategy");
const dto_1 = require("../dto");
const common_1 = require("@nestjs/common");
let KeyInfoProvider = class KeyInfoProvider {
    constructor(graphKeyInfoStrategy, hashKeyInfoStrategy, listKeyInfoStrategy, rejsonRlKeyInfoStrategy, setKeyInfoStrategy, streamKeyInfoStrategy, stringKeyInfoStrategy, tsKeyInfoStrategy, unsupportedKeyInfoStrategy, zSetKeyInfoStrategy) {
        this.graphKeyInfoStrategy = graphKeyInfoStrategy;
        this.hashKeyInfoStrategy = hashKeyInfoStrategy;
        this.listKeyInfoStrategy = listKeyInfoStrategy;
        this.rejsonRlKeyInfoStrategy = rejsonRlKeyInfoStrategy;
        this.setKeyInfoStrategy = setKeyInfoStrategy;
        this.streamKeyInfoStrategy = streamKeyInfoStrategy;
        this.stringKeyInfoStrategy = stringKeyInfoStrategy;
        this.tsKeyInfoStrategy = tsKeyInfoStrategy;
        this.unsupportedKeyInfoStrategy = unsupportedKeyInfoStrategy;
        this.zSetKeyInfoStrategy = zSetKeyInfoStrategy;
    }
    getStrategy(type) {
        switch (type) {
            case dto_1.RedisDataType.Graph:
                return this.graphKeyInfoStrategy;
            case dto_1.RedisDataType.Hash:
                return this.hashKeyInfoStrategy;
            case dto_1.RedisDataType.List:
                return this.listKeyInfoStrategy;
            case dto_1.RedisDataType.JSON:
                return this.rejsonRlKeyInfoStrategy;
            case dto_1.RedisDataType.Set:
                return this.setKeyInfoStrategy;
            case dto_1.RedisDataType.Stream:
                return this.streamKeyInfoStrategy;
            case dto_1.RedisDataType.String:
                return this.stringKeyInfoStrategy;
            case dto_1.RedisDataType.TS:
                return this.tsKeyInfoStrategy;
            case dto_1.RedisDataType.ZSet:
                return this.zSetKeyInfoStrategy;
            default:
                return this.unsupportedKeyInfoStrategy;
        }
    }
};
KeyInfoProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [graph_key_info_strategy_1.GraphKeyInfoStrategy,
        hash_key_info_strategy_1.HashKeyInfoStrategy,
        list_key_info_strategy_1.ListKeyInfoStrategy,
        rejson_rl_key_info_strategy_1.RejsonRlKeyInfoStrategy,
        set_key_info_strategy_1.SetKeyInfoStrategy,
        stream_key_info_strategy_1.StreamKeyInfoStrategy,
        string_key_info_strategy_1.StringKeyInfoStrategy,
        ts_key_info_strategy_1.TsKeyInfoStrategy,
        unsupported_key_info_strategy_1.UnsupportedKeyInfoStrategy,
        z_set_key_info_strategy_1.ZSetKeyInfoStrategy])
], KeyInfoProvider);
exports.KeyInfoProvider = KeyInfoProvider;
