"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRedisInstanceEvents = exports.AppAnalyticsEvents = void 0;
var AppAnalyticsEvents;
(function (AppAnalyticsEvents) {
    AppAnalyticsEvents["Initialize"] = "analytics.initialize";
    AppAnalyticsEvents["Track"] = "analytics.track";
    AppAnalyticsEvents["Page"] = "analytics.page";
})(AppAnalyticsEvents = exports.AppAnalyticsEvents || (exports.AppAnalyticsEvents = {}));
var AppRedisInstanceEvents;
(function (AppRedisInstanceEvents) {
    AppRedisInstanceEvents["Deleted"] = "instance.deleted";
})(AppRedisInstanceEvents = exports.AppRedisInstanceEvents || (exports.AppRedisInstanceEvents = {}));
