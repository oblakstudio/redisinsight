"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseOverviewProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseOverviewProvider = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const utils_1 = require("../../../utils");
const utils_2 = require("../../redis/utils");
const client_1 = require("../../redis/client");
let DatabaseOverviewProvider = DatabaseOverviewProvider_1 = class DatabaseOverviewProvider {
    constructor() {
        this.previousCpuStats = new Map();
    }
    async getOverview(clientMetadata, client) {
        let nodesInfo = [];
        let totalKeys;
        let totalKeysPerDb;
        const currentDbIndex = (0, lodash_1.isNumber)(clientMetadata.db)
            ? clientMetadata.db
            : await client.getCurrentDbIndex();
        if (client.getConnectionType() === client_1.RedisClientConnectionType.CLUSTER) {
            nodesInfo = await this.getNodesInfo(client);
            totalKeys = await this.calculateNodesTotalKeys(client);
        }
        else {
            nodesInfo = [await this.getNodeInfo(client)];
            const [calculatedTotalKeys, calculatedTotalKeysPerDb] = this.calculateTotalKeys(nodesInfo, currentDbIndex);
            totalKeys = calculatedTotalKeys;
            totalKeysPerDb = calculatedTotalKeysPerDb;
        }
        return {
            version: this.getVersion(nodesInfo),
            totalKeys,
            totalKeysPerDb,
            usedMemory: this.calculateUsedMemory(nodesInfo),
            connectedClients: this.calculateConnectedClients(nodesInfo),
            opsPerSecond: this.calculateOpsPerSec(nodesInfo),
            networkInKbps: this.calculateNetworkIn(nodesInfo),
            networkOutKbps: this.calculateNetworkOut(nodesInfo),
            cpuUsagePercentage: this.calculateCpuUsage(clientMetadata.databaseId, nodesInfo),
        };
    }
    async getNodeInfo(client) {
        const { host, port } = client.options;
        return {
            ...(0, utils_1.convertRedisInfoReplyToObject)(await client.sendCommand(['info'], { replyEncoding: 'utf8' })),
            host,
            port,
        };
    }
    async getNodesInfo(client) {
        return Promise.all((await client.nodes()).map(this.getNodeInfo));
    }
    getMedianValue(values) {
        if (!values.length) {
            return 0;
        }
        values.sort((a, b) => a - b);
        const middleIndex = Math.floor(values.length / 2);
        if (values.length % 2) {
            return values[middleIndex];
        }
        return (values[middleIndex - 1] + values[middleIndex]) / 2;
    }
    getVersion(nodes = []) {
        return (0, lodash_1.get)(nodes, [0, 'server', 'redis_version'], null);
    }
    calculateOpsPerSec(nodes = []) {
        if (!this.isMetricsAvailable(nodes, 'stats.instantaneous_ops_per_sec', [undefined])) {
            return undefined;
        }
        return (0, lodash_1.sumBy)(nodes, (node) => parseInt((0, lodash_1.get)(node, 'stats.instantaneous_ops_per_sec', '0'), 10));
    }
    calculateNetworkIn(nodes = []) {
        if (!this.isMetricsAvailable(nodes, 'stats.instantaneous_input_kbps', [undefined])) {
            return undefined;
        }
        return (0, lodash_1.sumBy)(nodes, (node) => parseInt((0, lodash_1.get)(node, 'stats.instantaneous_input_kbps', '0'), 10));
    }
    calculateNetworkOut(nodes = []) {
        if (!this.isMetricsAvailable(nodes, 'stats.instantaneous_output_kbps', [undefined])) {
            return undefined;
        }
        return (0, lodash_1.sumBy)(nodes, (node) => parseInt((0, lodash_1.get)(node, 'stats.instantaneous_output_kbps', '0'), 10));
    }
    calculateConnectedClients(nodes = []) {
        if (!this.isMetricsAvailable(nodes, 'clients.connected_clients', [undefined])) {
            return undefined;
        }
        const clientsPerNode = (0, lodash_1.map)(nodes, (node) => parseInt((0, lodash_1.get)(node, 'clients.connected_clients', '0'), 10));
        return this.getMedianValue(clientsPerNode);
    }
    calculateUsedMemory(nodes = []) {
        try {
            const masterNodes = DatabaseOverviewProvider_1.getMasterNodesToWorkWith(nodes);
            if (!this.isMetricsAvailable(masterNodes, 'memory.used_memory', [undefined])) {
                return undefined;
            }
            return (0, lodash_1.sumBy)(masterNodes, (node) => parseInt((0, lodash_1.get)(node, 'memory.used_memory', '0'), 10));
        }
        catch (e) {
            return null;
        }
    }
    calculateTotalKeys(nodes = [], index) {
        try {
            const masterNodes = DatabaseOverviewProvider_1.getMasterNodesToWorkWith(nodes);
            if (!this.isMetricsAvailable(masterNodes, 'keyspace', [undefined])) {
                return [undefined, undefined];
            }
            const totalKeysPerDb = {};
            masterNodes.forEach((node) => {
                (0, lodash_1.map)((0, lodash_1.get)(node, 'keyspace', {}), (dbKeys, dbNumber) => {
                    const { keys } = (0, utils_2.convertMultilineReplyToObject)(dbKeys, ',', '=');
                    if (!totalKeysPerDb[dbNumber]) {
                        totalKeysPerDb[dbNumber] = 0;
                    }
                    totalKeysPerDb[dbNumber] += parseInt(keys, 10);
                });
            });
            const totalKeys = totalKeysPerDb ? (0, lodash_1.sum)(Object.values(totalKeysPerDb)) : undefined;
            const dbIndexKeys = totalKeysPerDb[`db${index}`] || 0;
            return [totalKeys, dbIndexKeys === totalKeys ? undefined : { [`db${index}`]: dbIndexKeys }];
        }
        catch (e) {
            return [null, null];
        }
    }
    async calculateNodesTotalKeys(client) {
        const nodesTotal = await Promise.all((await client
            .nodes(client_1.RedisClientNodeRole.PRIMARY))
            .map(async (node) => (0, utils_2.getTotalKeys)(node)));
        return nodesTotal.reduce((prev, cur) => (prev + cur), 0);
    }
    calculateCpuUsage(id, nodes = []) {
        if (!this.isMetricsAvailable(nodes, 'cpu.used_cpu_sys', [0, '0', '0.0', '0.00', undefined])) {
            return undefined;
        }
        const previousCpuStats = this.previousCpuStats.get(id);
        const currentCpuStats = (0, lodash_1.keyBy)((0, lodash_1.map)(nodes, (node) => ({
            node: `${node.host}:${node.port}`,
            cpuSys: parseFloat((0, lodash_1.get)(node, 'cpu.used_cpu_sys')),
            cpuUser: parseFloat((0, lodash_1.get)(node, 'cpu.used_cpu_user')),
            upTime: parseFloat((0, lodash_1.get)(node, 'server.uptime_in_seconds')),
        })), 'node');
        this.previousCpuStats.set(id, currentCpuStats);
        if (!previousCpuStats) {
            return null;
        }
        return (0, lodash_1.sum)((0, lodash_1.map)(currentCpuStats, (current) => {
            const previous = previousCpuStats[current.node];
            if (!previous
                || previous.upTime >= current.upTime) {
                return 0;
            }
            const currentUsage = current.cpuUser + current.cpuSys;
            const previousUsage = previous.cpuUser + previous.cpuSys;
            const timeDelta = current.upTime - previous.upTime;
            const usage = ((currentUsage - previousUsage) / timeDelta) * 100;
            if (usage < 0) {
                return 0;
            }
            return usage > 100 ? 100 : usage;
        }));
    }
    isMetricsAvailable(nodes = [], path, values) {
        for (let i = 0; i < nodes.length; i += 1) {
            const node = nodes[i];
            if (values.includes((0, lodash_1.get)(node, path))) {
                return false;
            }
        }
        return true;
    }
    static getMasterNodesToWorkWith(nodes = []) {
        let masterNodes = nodes;
        if ((nodes === null || nodes === void 0 ? void 0 : nodes.length) > 1) {
            masterNodes = (0, lodash_1.filter)(nodes, (node) => ['master', undefined].includes((0, lodash_1.get)(node, 'replication.role')));
        }
        return masterNodes;
    }
};
DatabaseOverviewProvider = DatabaseOverviewProvider_1 = __decorate([
    (0, common_1.Injectable)()
], DatabaseOverviewProvider);
exports.DatabaseOverviewProvider = DatabaseOverviewProvider;
