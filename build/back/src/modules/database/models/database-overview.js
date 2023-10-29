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
exports.DatabaseOverview = void 0;
const swagger_1 = require("@nestjs/swagger");
class DatabaseOverview {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Redis database version',
        type: String,
    }),
    __metadata("design:type", String)
], DatabaseOverview.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Total number of bytes allocated by Redis primary shards',
        type: Number,
    }),
    __metadata("design:type", Number)
], DatabaseOverview.prototype, "usedMemory", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Total number of keys inside Redis primary shards',
        type: Number,
    }),
    __metadata("design:type", Number)
], DatabaseOverview.prototype, "totalKeys", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Nested object with total number of keys per logical database',
        type: Number,
    }),
    __metadata("design:type", Object)
], DatabaseOverview.prototype, "totalKeysPerDb", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Median for connected clients in the all shards',
        type: Number,
    }),
    __metadata("design:type", Number)
], DatabaseOverview.prototype, "connectedClients", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sum of current commands per second in the all shards',
        type: Number,
    }),
    __metadata("design:type", Number)
], DatabaseOverview.prototype, "opsPerSecond", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sum of current network input in the all shards (kbps)',
        type: Number,
    }),
    __metadata("design:type", Number)
], DatabaseOverview.prototype, "networkInKbps", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sum of current network out in the all shards (kbps)',
        type: Number,
    }),
    __metadata("design:type", Number)
], DatabaseOverview.prototype, "networkOutKbps", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sum of current cpu usage in the all shards (%)',
        type: Number,
    }),
    __metadata("design:type", Number)
], DatabaseOverview.prototype, "cpuUsagePercentage", void 0);
exports.DatabaseOverview = DatabaseOverview;
