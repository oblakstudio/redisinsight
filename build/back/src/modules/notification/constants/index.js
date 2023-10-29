"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEvents = exports.NotificationServerEvents = exports.NotificationType = void 0;
var NotificationType;
(function (NotificationType) {
    NotificationType["Global"] = "global";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
var NotificationServerEvents;
(function (NotificationServerEvents) {
    NotificationServerEvents["Notification"] = "notification";
})(NotificationServerEvents = exports.NotificationServerEvents || (exports.NotificationServerEvents = {}));
var NotificationEvents;
(function (NotificationEvents) {
    NotificationEvents["NewNotifications"] = "new-notifications";
})(NotificationEvents = exports.NotificationEvents || (exports.NotificationEvents = {}));
