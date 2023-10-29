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
var ProfilerGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilerGateway = void 0;
const lodash_1 = require("lodash");
const socket_io_1 = require("socket.io");
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const monitor_settings_1 = require("./models/monitor-settings");
const constants_1 = require("./constants");
const profiler_service_1 = require("./profiler.service");
const config_1 = require("../../utils/config");
const SOCKETS_CONFIG = config_1.default.get('sockets');
let ProfilerGateway = ProfilerGateway_1 = class ProfilerGateway {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger('MonitorGateway');
    }
    async monitor(client, settings = null) {
        try {
            await this.service.addListenerForInstance(ProfilerGateway_1.getInstanceId(client), client, settings);
            return { status: 'ok' };
        }
        catch (error) {
            this.logger.error('Unable to add listener', error);
            throw new websockets_1.WsException(error);
        }
    }
    async pause(client) {
        try {
            await this.service.removeListenerFromInstance(ProfilerGateway_1.getInstanceId(client), client.id);
            return { status: 'ok' };
        }
        catch (error) {
            this.logger.error('Unable to pause monitor', error);
            throw new websockets_1.WsException(error);
        }
    }
    async flushLogs(client) {
        try {
            await this.service.flushLogs(client.id);
            return { status: 'ok' };
        }
        catch (error) {
            this.logger.error('Unable to flush logs', error);
            throw new websockets_1.WsException(error);
        }
    }
    async handleConnection(client) {
        const instanceId = ProfilerGateway_1.getInstanceId(client);
        this.logger.log(`Client connected: ${client.id}, instanceId: ${instanceId}`);
    }
    async handleDisconnect(client) {
        const instanceId = ProfilerGateway_1.getInstanceId(client);
        await this.service.disconnectListenerFromInstance(instanceId, client.id);
        this.logger.log(`Client disconnected: ${client.id}, instanceId: ${instanceId}`);
    }
    static getInstanceId(client) {
        return (0, lodash_1.get)(client, 'handshake.query.instanceId');
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ProfilerGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.ProfilerClientEvents.Monitor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, monitor_settings_1.MonitorSettings]),
    __metadata("design:returntype", Promise)
], ProfilerGateway.prototype, "monitor", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.ProfilerClientEvents.Pause),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ProfilerGateway.prototype, "pause", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.ProfilerClientEvents.FlushLogs),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ProfilerGateway.prototype, "flushLogs", null);
ProfilerGateway = ProfilerGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: 'monitor', cors: SOCKETS_CONFIG.cors, serveClient: SOCKETS_CONFIG.serveClient }),
    __metadata("design:paramtypes", [profiler_service_1.ProfilerService])
], ProfilerGateway);
exports.ProfilerGateway = ProfilerGateway;
