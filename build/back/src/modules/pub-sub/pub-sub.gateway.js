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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubGateway = void 0;
const socket_io_1 = require("socket.io");
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const config_1 = require("../../utils/config");
const pub_sub_service_1 = require("./pub-sub.service");
const client_decorator_1 = require("./decorators/client.decorator");
const user_client_1 = require("./model/user-client");
const dto_1 = require("./dto");
const ack_ws_exception_filter_1 = require("./filters/ack-ws-exception.filter");
const constants_1 = require("./constants");
const SOCKETS_CONFIG = config_1.default.get('sockets');
let PubSubGateway = class PubSubGateway {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger('PubSubGateway');
    }
    async subscribe(client, dto) {
        await this.service.subscribe(client, dto);
        return { status: 'ok' };
    }
    async unsubscribe(client, dto) {
        await this.service.unsubscribe(client, dto);
        return { status: 'ok' };
    }
    async handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    async handleDisconnect(client) {
        await this.service.handleDisconnect(client.id);
        this.logger.log(`Client disconnected: ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PubSubGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.PubSubClientEvents.Subscribe),
    __param(0, (0, client_decorator_1.Client)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_client_1.UserClient, dto_1.SubscribeDto]),
    __metadata("design:returntype", Promise)
], PubSubGateway.prototype, "subscribe", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.PubSubClientEvents.Unsubscribe),
    __param(0, (0, client_decorator_1.Client)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_client_1.UserClient, dto_1.SubscribeDto]),
    __metadata("design:returntype", Promise)
], PubSubGateway.prototype, "unsubscribe", null);
PubSubGateway = __decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseFilters)(ack_ws_exception_filter_1.AckWsExceptionFilter),
    (0, websockets_1.WebSocketGateway)({ namespace: 'pub-sub', cors: SOCKETS_CONFIG.cors, serveClient: SOCKETS_CONFIG.serveClient }),
    __metadata("design:paramtypes", [pub_sub_service_1.PubSubService])
], PubSubGateway);
exports.PubSubGateway = PubSubGateway;
