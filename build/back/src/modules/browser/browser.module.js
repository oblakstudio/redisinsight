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
const list_module_1 = require("./list/list.module");
const hash_module_1 = require("./hash/hash.module");
const z_set_module_1 = require("./z-set/z-set.module");
const string_module_1 = require("./string/string.module");
const set_module_1 = require("./set/set.module");
const browser_history_module_1 = require("./browser-history/browser-history.module");
const rejson_rl_module_1 = require("./rejson-rl/rejson-rl.module");
const stream_module_1 = require("./stream/stream.module");
const redisearch_module_1 = require("./redisearch/redisearch.module");
const keys_module_1 = require("./keys/keys.module");
const route = '/databases/:dbInstance';
let BrowserModule = class BrowserModule {
};
BrowserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            list_module_1.ListModule.register({ route }),
            hash_module_1.HashModule.register({ route }),
            z_set_module_1.ZSetModule.register({ route }),
            string_module_1.StringModule.register({ route }),
            set_module_1.SetModule.register({ route }),
            browser_history_module_1.BrowserHistoryModule.register({ route }),
            stream_module_1.StreamModule.register({ route }),
            rejson_rl_module_1.RejsonRlModule.register({ route }),
            redisearch_module_1.RedisearchModule.register({ route }),
            keys_module_1.KeysModule.register({ route }),
        ],
        exports: [browser_history_module_1.BrowserHistoryModule],
    })
], BrowserModule);
exports.BrowserModule = BrowserModule;
