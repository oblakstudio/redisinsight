"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkActionStatus = exports.BulkActionType = exports.BulkActionsServerEvents = void 0;
var BulkActionsServerEvents;
(function (BulkActionsServerEvents) {
    BulkActionsServerEvents["Create"] = "create";
    BulkActionsServerEvents["Get"] = "get";
    BulkActionsServerEvents["Abort"] = "abort";
})(BulkActionsServerEvents = exports.BulkActionsServerEvents || (exports.BulkActionsServerEvents = {}));
var BulkActionType;
(function (BulkActionType) {
    BulkActionType["Delete"] = "delete";
    BulkActionType["Upload"] = "upload";
})(BulkActionType = exports.BulkActionType || (exports.BulkActionType = {}));
var BulkActionStatus;
(function (BulkActionStatus) {
    BulkActionStatus["Initializing"] = "initializing";
    BulkActionStatus["Initialized"] = "initialized";
    BulkActionStatus["Preparing"] = "preparing";
    BulkActionStatus["Ready"] = "ready";
    BulkActionStatus["Running"] = "running";
    BulkActionStatus["Completed"] = "completed";
    BulkActionStatus["Failed"] = "failed";
    BulkActionStatus["Aborted"] = "aborted";
})(BulkActionStatus = exports.BulkActionStatus || (exports.BulkActionStatus = {}));
