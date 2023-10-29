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
exports.ClusterNodeDetails = exports.HealthStatus = exports.NodeRole = void 0;
const swagger_1 = require("@nestjs/swagger");
var NodeRole;
(function (NodeRole) {
    NodeRole["Primary"] = "primary";
    NodeRole["Replica"] = "replica";
})(NodeRole = exports.NodeRole || (exports.NodeRole = {}));
var HealthStatus;
(function (HealthStatus) {
    HealthStatus["Online"] = "online";
    HealthStatus["Offline"] = "offline";
    HealthStatus["Loading"] = "loading";
})(HealthStatus = exports.HealthStatus || (exports.HealthStatus = {}));
class ClusterNodeDetails {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Node id',
        example: 'c33218e9ff2faf8749bfb6585ba1e6d40a4e94fb',
    }),
    __metadata("design:type", String)
], ClusterNodeDetails.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Redis version',
        example: '7.0.2',
    }),
    __metadata("design:type", String)
], ClusterNodeDetails.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Redis mode',
        example: 'cluster',
    }),
    __metadata("design:type", String)
], ClusterNodeDetails.prototype, "mode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Node IP address',
        example: '172.30.0.101',
    }),
    __metadata("design:type", String)
], ClusterNodeDetails.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Node IP address',
        example: 6379,
    }),
    __metadata("design:type", Number)
], ClusterNodeDetails.prototype, "port", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        enum: NodeRole,
        description: 'Node role in cluster',
    }),
    __metadata("design:type", String)
], ClusterNodeDetails.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'ID of primary node (for replica only)',
        example: 'c33218e9ff2faf8749bfb6585ba1e6d40a4e94fb',
    }),
    __metadata("design:type", String)
], ClusterNodeDetails.prototype, "primary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        enum: HealthStatus,
        description: 'Node\'s current health status',
    }),
    __metadata("design:type", String)
], ClusterNodeDetails.prototype, "health", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        isArray: true,
        description: 'Array of assigned slots or slots ranges. Shown for primary nodes only',
        example: ['0-5638', '11256'],
    }),
    __metadata("design:type", Array)
], ClusterNodeDetails.prototype, "slots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Total keys stored inside this node',
        example: 256478,
    }),
    __metadata("design:type", Number)
], ClusterNodeDetails.prototype, "totalKeys", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Memory used by node. "memory.used_memory" from INFO command',
        example: 256478,
    }),
    __metadata("design:type", Number)
], ClusterNodeDetails.prototype, "usedMemory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Current operations per second. "stats.instantaneous_ops_per_sec" from INFO command',
        example: 12569,
    }),
    __metadata("design:type", Number)
], ClusterNodeDetails.prototype, "opsPerSecond", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Total connections received by node. "stats.total_connections_received" from INFO command',
        example: 3256,
    }),
    __metadata("design:type", Number)
], ClusterNodeDetails.prototype, "connectionsReceived", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Currently connected clients. "clients.connected_clients" from INFO command',
        example: 3256,
    }),
    __metadata("design:type", Number)
], ClusterNodeDetails.prototype, "connectedClients", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Total commands processed by node. "stats.total_commands_processed" from INFO command',
        example: 32560000000,
    }),
    __metadata("design:type", Number)
], ClusterNodeDetails.prototype, "commandsProcessed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Current input network usage in KB/s. "stats.instantaneous_input_kbps" from INFO command',
        example: 12000,
    }),
    __metadata("design:type", Number)
], ClusterNodeDetails.prototype, "networkInKbps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Current output network usage in KB/s. "stats.instantaneous_output_kbps" from INFO command',
        example: 12000,
    }),
    __metadata("design:type", Number)
], ClusterNodeDetails.prototype, "networkOutKbps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Ratio for cache hits and misses [0 - 1]. Ideally should be close to 1',
        example: 0.8,
    }),
    __metadata("design:type", Number)
], ClusterNodeDetails.prototype, "cacheHitRatio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The replication offset of this node. This information can be used to '
            + 'send commands to the most up to date replicas.',
        example: 12000,
    }),
    __metadata("design:type", Number)
], ClusterNodeDetails.prototype, "replicationOffset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'For replicas only. Determines on how much replica is behind of primary.',
        example: 0,
    }),
    __metadata("design:type", Number)
], ClusterNodeDetails.prototype, "replicationLag", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Current node uptime_in_seconds',
        example: 12000,
    }),
    __metadata("design:type", Number)
], ClusterNodeDetails.prototype, "uptimeSec", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => ClusterNodeDetails,
        isArray: true,
        description: 'For primary nodes only. Replica node(s) details',
        example: [],
    }),
    __metadata("design:type", Array)
], ClusterNodeDetails.prototype, "replicas", void 0);
exports.ClusterNodeDetails = ClusterNodeDetails;
