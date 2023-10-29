"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClientEvents = exports.RedisClientStatus = exports.SubscriptionType = exports.PubSubServerEvents = exports.PubSubClientEvents = void 0;
var PubSubClientEvents;
(function (PubSubClientEvents) {
    PubSubClientEvents["Subscribe"] = "subscribe";
    PubSubClientEvents["Unsubscribe"] = "unsubscribe";
})(PubSubClientEvents = exports.PubSubClientEvents || (exports.PubSubClientEvents = {}));
var PubSubServerEvents;
(function (PubSubServerEvents) {
    PubSubServerEvents["Exception"] = "exception";
})(PubSubServerEvents = exports.PubSubServerEvents || (exports.PubSubServerEvents = {}));
var SubscriptionType;
(function (SubscriptionType) {
    SubscriptionType["Subscribe"] = "s";
    SubscriptionType["PSubscribe"] = "p";
    SubscriptionType["SSubscribe"] = "ss";
})(SubscriptionType = exports.SubscriptionType || (exports.SubscriptionType = {}));
var RedisClientStatus;
(function (RedisClientStatus) {
    RedisClientStatus["Connecting"] = "connecting";
    RedisClientStatus["Connected"] = "connected";
    RedisClientStatus["Error"] = "error";
    RedisClientStatus["End"] = "end";
})(RedisClientStatus = exports.RedisClientStatus || (exports.RedisClientStatus = {}));
var RedisClientEvents;
(function (RedisClientEvents) {
    RedisClientEvents["Connected"] = "connected";
    RedisClientEvents["ConnectionError"] = "connection_error";
    RedisClientEvents["Message"] = "message";
    RedisClientEvents["End"] = "end";
})(RedisClientEvents = exports.RedisClientEvents || (exports.RedisClientEvents = {}));
