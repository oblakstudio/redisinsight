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
exports.NotificationGateway = void 0;
const socket_io_1 = require("socket.io");
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const config_1 = require("../../utils/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("./constants");
const dto_1 = require("./dto");
const global_notification_provider_1 = require("./providers/global-notification.provider");
const SOCKETS_CONFIG = config_1.default.get('sockets');
let NotificationGateway = class NotificationGateway {
    constructor(globalNotificationsProvider) {
        this.globalNotificationsProvider = globalNotificationsProvider;
        this.logger = new common_1.Logger('NotificationGateway');
    }
    async handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
        this.globalNotificationsProvider.init();
    }
    async handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    notification(data) {
        this.wss.of('/').emit(constants_1.NotificationServerEvents.Notification, data);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "wss", void 0);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.NotificationServerEvents.Notification),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.NotificationsDto]),
    __metadata("design:returntype", void 0)
], NotificationGateway.prototype, "notification", null);
NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: SOCKETS_CONFIG.cors, serveClient: SOCKETS_CONFIG.serveClient }),
    __metadata("design:paramtypes", [global_notification_provider_1.GlobalNotificationProvider])
], NotificationGateway);
exports.NotificationGateway = NotificationGateway;
