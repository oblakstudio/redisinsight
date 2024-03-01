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
const common_1 = require("@nestjs/common");
const dto_1 = require("../../../browser/keys/dto");
const strategies_1 = require("./strategies");
let KeyInfoProvider = class KeyInfoProvider {
    constructor() {
        this.strategies = new Map();
        this.strategies.set('default', new strategies_1.DefaultInfoStrategy());
        this.strategies.set(dto_1.RedisDataType.Graph, new strategies_1.GraphInfoStrategy());
        this.strategies.set(dto_1.RedisDataType.Hash, new strategies_1.HashInfoStrategy());
        this.strategies.set(dto_1.RedisDataType.JSON, new strategies_1.JsonInfoStrategy());
        this.strategies.set(dto_1.RedisDataType.List, new strategies_1.ListInfoStrategy());
        this.strategies.set(dto_1.RedisDataType.Set, new strategies_1.SetInfoStrategy());
        this.strategies.set(dto_1.RedisDataType.Stream, new strategies_1.StreamInfoStrategy());
        this.strategies.set(dto_1.RedisDataType.String, new strategies_1.StringInfoStrategy());
        this.strategies.set(dto_1.RedisDataType.TS, new strategies_1.TsInfoStrategy());
        this.strategies.set(dto_1.RedisDataType.ZSet, new strategies_1.ZSetInfoStrategy());
    }
    getStrategy(type) {
        const strategy = this.strategies.get(type);
        if (!strategy) {
            return this.strategies.get('default');
        }
        return strategy;
    }
};
KeyInfoProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KeyInfoProvider);
exports.KeyInfoProvider = KeyInfoProvider;
