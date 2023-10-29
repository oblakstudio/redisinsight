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
exports.CloudDatabase = exports.CloudDatabaseAlert = exports.CloudDatabaseAlertName = exports.CloudDatabaseStatus = exports.CloudDatabaseMemoryStorage = exports.CloudDatabaseDataEvictionPolicy = exports.CloudDatabasePersistencePolicy = exports.CloudDatabaseProtocol = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const cloud_subscription_1 = require("../../subscription/models/cloud-subscription");
const cloud_database_details_1 = require("./cloud-database-details");
const class_validator_1 = require("class-validator");
var CloudDatabaseProtocol;
(function (CloudDatabaseProtocol) {
    CloudDatabaseProtocol["Redis"] = "redis";
    CloudDatabaseProtocol["Stack"] = "stack";
    CloudDatabaseProtocol["Memcached"] = "memcached";
})(CloudDatabaseProtocol = exports.CloudDatabaseProtocol || (exports.CloudDatabaseProtocol = {}));
var CloudDatabasePersistencePolicy;
(function (CloudDatabasePersistencePolicy) {
    CloudDatabasePersistencePolicy["AofEveryOneSecond"] = "aof-every-1-second";
    CloudDatabasePersistencePolicy["AofEveryWrite"] = "aof-every-write";
    CloudDatabasePersistencePolicy["SnapshotEveryOneHour"] = "snapshot-every-1-hour";
    CloudDatabasePersistencePolicy["SnapshotEverySixHours"] = "snapshot-every-6-hours";
    CloudDatabasePersistencePolicy["SnapshotEveryTwelveHours"] = "snapshot-every-12-hours";
    CloudDatabasePersistencePolicy["None"] = "none";
})(CloudDatabasePersistencePolicy = exports.CloudDatabasePersistencePolicy || (exports.CloudDatabasePersistencePolicy = {}));
var CloudDatabaseDataEvictionPolicy;
(function (CloudDatabaseDataEvictionPolicy) {
    CloudDatabaseDataEvictionPolicy["AllKeysLru"] = "allkeys-lru";
    CloudDatabaseDataEvictionPolicy["AllKeysLfu"] = "allkeys-lfu";
    CloudDatabaseDataEvictionPolicy["AllKeysRandom"] = "allkeys-random";
    CloudDatabaseDataEvictionPolicy["VolatileLru"] = "volatile-lru";
    CloudDatabaseDataEvictionPolicy["VolatileLfu"] = "volatile-lfu";
    CloudDatabaseDataEvictionPolicy["VolatileRandom"] = "volatile-random";
    CloudDatabaseDataEvictionPolicy["VolatileTtl"] = "volatile-ttl";
    CloudDatabaseDataEvictionPolicy["NoEviction"] = "noeviction";
})(CloudDatabaseDataEvictionPolicy = exports.CloudDatabaseDataEvictionPolicy || (exports.CloudDatabaseDataEvictionPolicy = {}));
var CloudDatabaseMemoryStorage;
(function (CloudDatabaseMemoryStorage) {
    CloudDatabaseMemoryStorage["Ram"] = "ram";
    CloudDatabaseMemoryStorage["RamAndFlash"] = "ram-and-flash";
})(CloudDatabaseMemoryStorage = exports.CloudDatabaseMemoryStorage || (exports.CloudDatabaseMemoryStorage = {}));
var CloudDatabaseStatus;
(function (CloudDatabaseStatus) {
    CloudDatabaseStatus["Draft"] = "draft";
    CloudDatabaseStatus["Pending"] = "pending";
    CloudDatabaseStatus["CreationFailed"] = "creation-failed";
    CloudDatabaseStatus["Active"] = "active";
    CloudDatabaseStatus["ActiveChangePending"] = "active-change-pending";
    CloudDatabaseStatus["ImportPending"] = "import-pending";
    CloudDatabaseStatus["DeletePending"] = "delete-pending";
    CloudDatabaseStatus["Recovery"] = "recovery";
})(CloudDatabaseStatus = exports.CloudDatabaseStatus || (exports.CloudDatabaseStatus = {}));
var CloudDatabaseAlertName;
(function (CloudDatabaseAlertName) {
    CloudDatabaseAlertName["DatasetSize"] = "dataset-size";
    CloudDatabaseAlertName["DatasetsSize"] = "datasets-size";
    CloudDatabaseAlertName["ThroughputHigherThan"] = "throughput-higher-than";
    CloudDatabaseAlertName["ThroughputLowerThan"] = "throughput-lower-than";
    CloudDatabaseAlertName["Latency"] = "latency";
    CloudDatabaseAlertName["SyncSourceError"] = "syncsource-error";
    CloudDatabaseAlertName["SyncSourceLag"] = "syncsource-lag";
    CloudDatabaseAlertName["ConnectionsLimit"] = "connections-limit";
})(CloudDatabaseAlertName = exports.CloudDatabaseAlertName || (exports.CloudDatabaseAlertName = {}));
class CloudDatabaseAlert {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database alert name',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(CloudDatabaseAlertName),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CloudDatabaseAlert.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database alert value',
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CloudDatabaseAlert.prototype, "value", void 0);
exports.CloudDatabaseAlert = CloudDatabaseAlert;
class CloudDatabase {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subscription id',
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CloudDatabase.prototype, "subscriptionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subscription type',
        enum: cloud_subscription_1.CloudSubscriptionType,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CloudDatabase.prototype, "subscriptionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database id',
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CloudDatabase.prototype, "databaseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database name',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CloudDatabase.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Address your Redis Cloud database is available on',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CloudDatabase.prototype, "publicEndpoint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database status',
        enum: CloudDatabaseStatus,
        default: CloudDatabaseStatus.Active,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CloudDatabase.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Is ssl authentication enabled or not',
        type: Boolean,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], CloudDatabase.prototype, "sslClientAuthentication", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Information about the modules loaded to the database',
        type: String,
        isArray: true,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], CloudDatabase.prototype, "modules", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional database options',
        type: Object,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], CloudDatabase.prototype, "options", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ groups: ['security'] }),
    __metadata("design:type", String)
], CloudDatabase.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => cloud_database_details_1.CloudDatabaseDetails),
    __metadata("design:type", cloud_database_details_1.CloudDatabaseDetails)
], CloudDatabase.prototype, "cloudDetails", void 0);
exports.CloudDatabase = CloudDatabase;
