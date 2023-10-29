"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisObserverStatus = exports.ProfilerServerEvents = exports.ProfilerClientEvents = void 0;
var ProfilerClientEvents;
(function (ProfilerClientEvents) {
    ProfilerClientEvents["Monitor"] = "monitor";
    ProfilerClientEvents["Pause"] = "pause";
    ProfilerClientEvents["FlushLogs"] = "flushLogs";
})(ProfilerClientEvents = exports.ProfilerClientEvents || (exports.ProfilerClientEvents = {}));
var ProfilerServerEvents;
(function (ProfilerServerEvents) {
    ProfilerServerEvents["Data"] = "monitorData";
    ProfilerServerEvents["Exception"] = "exception";
})(ProfilerServerEvents = exports.ProfilerServerEvents || (exports.ProfilerServerEvents = {}));
var RedisObserverStatus;
(function (RedisObserverStatus) {
    RedisObserverStatus["Empty"] = "empty";
    RedisObserverStatus["Initializing"] = "initializing";
    RedisObserverStatus["Connected"] = "connected";
    RedisObserverStatus["Wait"] = "wait";
    RedisObserverStatus["Ready"] = "ready";
    RedisObserverStatus["End"] = "end";
    RedisObserverStatus["Error"] = "error";
})(RedisObserverStatus = exports.RedisObserverStatus || (exports.RedisObserverStatus = {}));
