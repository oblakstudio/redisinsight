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
exports.ClusterMonitorService = exports.ClusterInfoStrategies = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const utils_1 = require("../../utils");
const cluster_nodes_info_strategy_1 = require("./strategies/cluster-nodes.info.strategy");
const cluster_shards_info_strategy_1 = require("./strategies/cluster-shards.info.strategy");
const database_client_factory_1 = require("../database/providers/database.client.factory");
const client_1 = require("../redis/client");
var ClusterInfoStrategies;
(function (ClusterInfoStrategies) {
    ClusterInfoStrategies["CLUSTER_NODES"] = "CLUSTER_NODES";
    ClusterInfoStrategies["CLUSTER_SHARDS"] = "CLUSTER_SHARDS";
})(ClusterInfoStrategies = exports.ClusterInfoStrategies || (exports.ClusterInfoStrategies = {}));
let ClusterMonitorService = class ClusterMonitorService {
    constructor(databaseClientFactory) {
        this.databaseClientFactory = databaseClientFactory;
        this.logger = new common_1.Logger('ClusterMonitorService');
        this.infoStrategies = new Map();
        this.infoStrategies.set(ClusterInfoStrategies.CLUSTER_NODES, new cluster_nodes_info_strategy_1.ClusterNodesInfoStrategy());
        this.infoStrategies.set(ClusterInfoStrategies.CLUSTER_SHARDS, new cluster_shards_info_strategy_1.ClusterShardsInfoStrategy());
    }
    async getClusterDetails(clientMetadata) {
        try {
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            if (client.getConnectionType() !== client_1.RedisClientConnectionType.CLUSTER) {
                return Promise.reject(new common_1.BadRequestException('Current database is not in a cluster mode'));
            }
            const info = (0, utils_1.convertRedisInfoReplyToObject)(await client.sendCommand(['info', 'server'], { replyEncoding: 'utf8' }));
            const strategy = this.getClusterInfoStrategy((0, lodash_1.get)(info, 'server.redis_version'));
            return await strategy.getClusterDetails(client);
        }
        catch (e) {
            this.logger.error('Unable to get cluster details', e);
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
    getClusterInfoStrategy(version) {
        const intVersion = parseInt(version, 10) || 0;
        if (intVersion >= 7) {
            return this.infoStrategies.get(ClusterInfoStrategies.CLUSTER_SHARDS);
        }
        return this.infoStrategies.get(ClusterInfoStrategies.CLUSTER_NODES);
    }
};
ClusterMonitorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory])
], ClusterMonitorService);
exports.ClusterMonitorService = ClusterMonitorService;
