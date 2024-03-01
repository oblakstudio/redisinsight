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
exports.Scanner = void 0;
const common_1 = require("@nestjs/common");
const cluster_scanner_strategy_1 = require("./strategies/cluster.scanner.strategy");
const standalone_scanner_strategy_1 = require("./strategies/standalone.scanner.strategy");
const client_1 = require("../../../redis/client");
let Scanner = class Scanner {
    constructor(standaloneStrategy, clusterStrategy) {
        this.standaloneStrategy = standaloneStrategy;
        this.clusterStrategy = clusterStrategy;
    }
    getStrategy(connectionType) {
        switch (connectionType) {
            case client_1.RedisClientConnectionType.STANDALONE:
            case client_1.RedisClientConnectionType.SENTINEL:
                return this.standaloneStrategy;
            case client_1.RedisClientConnectionType.CLUSTER:
                return this.clusterStrategy;
            default:
                throw new Error(`Unsupported scan strategy: ${connectionType}`);
        }
    }
};
Scanner = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [standalone_scanner_strategy_1.StandaloneScannerStrategy,
        cluster_scanner_strategy_1.ClusterScannerStrategy])
], Scanner);
exports.Scanner = Scanner;
