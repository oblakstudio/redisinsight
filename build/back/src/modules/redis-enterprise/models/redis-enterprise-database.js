"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisEnterpriseDatabaseStatus = exports.RedisEnterpriseDatabaseAofPolicy = exports.RedisEnterpriseDatabasePersistence = exports.RedisEnterprisePersistencePolicy = void 0;
var RedisEnterprisePersistencePolicy;
(function (RedisEnterprisePersistencePolicy) {
    RedisEnterprisePersistencePolicy["AofEveryOneSecond"] = "aof-every-1-second";
    RedisEnterprisePersistencePolicy["AofEveryWrite"] = "aof-every-write";
    RedisEnterprisePersistencePolicy["SnapshotEveryOneHour"] = "snapshot-every-1-hour";
    RedisEnterprisePersistencePolicy["SnapshotEverySixHours"] = "snapshot-every-6-hours";
    RedisEnterprisePersistencePolicy["SnapshotEveryTwelveHours"] = "snapshot-every-12-hours";
    RedisEnterprisePersistencePolicy["None"] = "none";
})(RedisEnterprisePersistencePolicy = exports.RedisEnterprisePersistencePolicy || (exports.RedisEnterprisePersistencePolicy = {}));
var RedisEnterpriseDatabasePersistence;
(function (RedisEnterpriseDatabasePersistence) {
    RedisEnterpriseDatabasePersistence["Disabled"] = "disabled";
    RedisEnterpriseDatabasePersistence["Aof"] = "aof";
    RedisEnterpriseDatabasePersistence["Snapshot"] = "snapshot";
})(RedisEnterpriseDatabasePersistence = exports.RedisEnterpriseDatabasePersistence || (exports.RedisEnterpriseDatabasePersistence = {}));
var RedisEnterpriseDatabaseAofPolicy;
(function (RedisEnterpriseDatabaseAofPolicy) {
    RedisEnterpriseDatabaseAofPolicy["AofEveryOneSecond"] = "appendfsync-every-sec";
    RedisEnterpriseDatabaseAofPolicy["AofEveryWrite"] = "appendfsync-always";
})(RedisEnterpriseDatabaseAofPolicy = exports.RedisEnterpriseDatabaseAofPolicy || (exports.RedisEnterpriseDatabaseAofPolicy = {}));
var RedisEnterpriseDatabaseStatus;
(function (RedisEnterpriseDatabaseStatus) {
    RedisEnterpriseDatabaseStatus["Pending"] = "pending";
    RedisEnterpriseDatabaseStatus["CreationFailed"] = "creation-failed";
    RedisEnterpriseDatabaseStatus["Active"] = "active";
    RedisEnterpriseDatabaseStatus["ActiveChangePending"] = "active-change-pending";
    RedisEnterpriseDatabaseStatus["ImportPending"] = "import-pending";
    RedisEnterpriseDatabaseStatus["DeletePending"] = "delete-pending";
    RedisEnterpriseDatabaseStatus["Recovery"] = "recovery";
})(RedisEnterpriseDatabaseStatus = exports.RedisEnterpriseDatabaseStatus || (exports.RedisEnterpriseDatabaseStatus = {}));
