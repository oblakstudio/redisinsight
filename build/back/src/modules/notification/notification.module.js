"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const notification_gateway_1 = require("./notification.gateway");
const notification_service_1 = require("./notification.service");
const global_notification_provider_1 = require("./providers/global-notification.provider");
const notification_emitter_1 = require("./providers/notification.emitter");
const notification_controller_1 = require("./notification.controller");
let NotificationModule = class NotificationModule {
};
NotificationModule = __decorate([
    (0, common_1.Module)({
        providers: [
            notification_gateway_1.NotificationGateway,
            notification_service_1.NotificationService,
            global_notification_provider_1.GlobalNotificationProvider,
            notification_emitter_1.NotificationEmitter,
        ],
        controllers: [
            notification_controller_1.NotificationController,
        ],
    })
], NotificationModule);
exports.NotificationModule = NotificationModule;
