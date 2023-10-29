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
exports.ClusterDetails = void 0;
const swagger_1 = require("@nestjs/swagger");
const cluster_node_details_1 = require("./cluster-node-details");
class ClusterDetails {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Redis version',
        example: '7.0.2',
    }),
    __metadata("design:type", String)
], ClusterDetails.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Redis mode. Currently one of: standalone, cluster or sentinel',
        example: 'cluster',
    }),
    __metadata("design:type", String)
], ClusterDetails.prototype, "mode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Username from the connection or undefined in case when connected with default user',
        example: 'user1',
    }),
    __metadata("design:type", String)
], ClusterDetails.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Maximum value uptime_in_seconds from all nodes',
        example: 3600,
    }),
    __metadata("design:type", Number)
], ClusterDetails.prototype, "uptimeSec", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'cluster_state from CLUSTER INFO command',
        example: 'ok',
    }),
    __metadata("design:type", String)
], ClusterDetails.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'cluster_slots_assigned from CLUSTER INFO command',
        example: 16384,
    }),
    __metadata("design:type", Number)
], ClusterDetails.prototype, "slotsAssigned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'cluster_slots_ok from CLUSTER INFO command',
        example: 16384,
    }),
    __metadata("design:type", Number)
], ClusterDetails.prototype, "slotsOk", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'cluster_slots_pfail from CLUSTER INFO command',
        example: 0,
    }),
    __metadata("design:type", Number)
], ClusterDetails.prototype, "slotsPFail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'cluster_slots_fail from CLUSTER INFO command',
        example: 0,
    }),
    __metadata("design:type", Number)
], ClusterDetails.prototype, "slotsFail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Calculated from (16384 - cluster_slots_assigned from CLUSTER INFO command)',
        example: 0,
    }),
    __metadata("design:type", Number)
], ClusterDetails.prototype, "slotsUnassigned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'cluster_stats_messages_sent from CLUSTER INFO command',
        example: 2451,
    }),
    __metadata("design:type", Number)
], ClusterDetails.prototype, "statsMessagesSent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'cluster_stats_messages_received from CLUSTER INFO command',
        example: 2451,
    }),
    __metadata("design:type", Number)
], ClusterDetails.prototype, "statsMessagesReceived", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'cluster_current_epoch from CLUSTER INFO command',
        example: 6,
    }),
    __metadata("design:type", Number)
], ClusterDetails.prototype, "currentEpoch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'cluster_my_epoch from CLUSTER INFO command',
        example: 2,
    }),
    __metadata("design:type", Number)
], ClusterDetails.prototype, "myEpoch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Number of shards. cluster_size from CLUSTER INFO command',
        example: 3,
    }),
    __metadata("design:type", Number)
], ClusterDetails.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'All nodes number in the Cluster. cluster_known_nodes from CLUSTER INFO command',
        example: 9,
    }),
    __metadata("design:type", Number)
], ClusterDetails.prototype, "knownNodes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => cluster_node_details_1.ClusterNodeDetails,
        isArray: true,
        description: 'Details per each node',
    }),
    __metadata("design:type", Array)
], ClusterDetails.prototype, "nodes", void 0);
exports.ClusterDetails = ClusterDetails;
