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
exports.FeatureGateway = void 0;
const socket_io_1 = require("socket.io");
const websockets_1 = require("@nestjs/websockets");
const config_1 = require("../../utils/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("./constants");
const SOCKETS_CONFIG = config_1.default.get('sockets');
let FeatureGateway = class FeatureGateway {
    feature(data) {
        this.wss.of('/').emit(constants_1.FeatureEvents.Features, data);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], FeatureGateway.prototype, "wss", void 0);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.FeatureServerEvents.FeaturesRecalculated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FeatureGateway.prototype, "feature", null);
FeatureGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: SOCKETS_CONFIG.cors, serveClient: SOCKETS_CONFIG.serveClient })
], FeatureGateway);
exports.FeatureGateway = FeatureGateway;
