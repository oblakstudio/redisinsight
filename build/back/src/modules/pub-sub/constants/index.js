"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClientSubscriberEvents = exports.RedisClientSubscriberStatus = exports.SubscriptionType = exports.PubSubServerEvents = exports.PubSubClientEvents = void 0;
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
var RedisClientSubscriberStatus;
(function (RedisClientSubscriberStatus) {
    RedisClientSubscriberStatus["Connecting"] = "connecting";
    RedisClientSubscriberStatus["Connected"] = "connected";
    RedisClientSubscriberStatus["Error"] = "error";
    RedisClientSubscriberStatus["End"] = "end";
})(RedisClientSubscriberStatus = exports.RedisClientSubscriberStatus || (exports.RedisClientSubscriberStatus = {}));
var RedisClientSubscriberEvents;
(function (RedisClientSubscriberEvents) {
    RedisClientSubscriberEvents["Connected"] = "connected";
    RedisClientSubscriberEvents["ConnectionError"] = "connection_error";
    RedisClientSubscriberEvents["Message"] = "message";
    RedisClientSubscriberEvents["End"] = "end";
})(RedisClientSubscriberEvents = exports.RedisClientSubscriberEvents || (exports.RedisClientSubscriberEvents = {}));
