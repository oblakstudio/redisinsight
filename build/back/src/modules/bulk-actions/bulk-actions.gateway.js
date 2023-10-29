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
exports.BulkActionsGateway = void 0;
const socket_io_1 = require("socket.io");
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const config_1 = require("../../utils/config");
const constants_1 = require("./constants");
const create_bulk_action_dto_1 = require("./dto/create-bulk-action.dto");
const bulk_actions_service_1 = require("./bulk-actions.service");
const ack_ws_exception_filter_1 = require("../pub-sub/filters/ack-ws-exception.filter");
const bulk_action_id_dto_1 = require("./dto/bulk-action-id.dto");
const SOCKETS_CONFIG = config_1.default.get('sockets');
let BulkActionsGateway = class BulkActionsGateway {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger('BulkActionsGateway');
    }
    create(socket, dto) {
        this.logger.log('Creating new bulk action.');
        return this.service.create(dto, socket);
    }
    get(dto) {
        this.logger.log('Subscribing to bulk action.');
        return this.service.get(dto);
    }
    abort(dto) {
        this.logger.log('Aborting bulk action.');
        return this.service.abort(dto);
    }
    async handleConnection(socket) {
        this.logger.log(`Client connected: ${socket.id}`);
    }
    async handleDisconnect(socket) {
        this.logger.log(`Client disconnected: ${socket.id}`);
        this.service.disconnect(socket.id);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], BulkActionsGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.BulkActionsServerEvents.Create),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, create_bulk_action_dto_1.CreateBulkActionDto]),
    __metadata("design:returntype", void 0)
], BulkActionsGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.BulkActionsServerEvents.Get),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_action_id_dto_1.BulkActionIdDto]),
    __metadata("design:returntype", void 0)
], BulkActionsGateway.prototype, "get", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.BulkActionsServerEvents.Abort),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_action_id_dto_1.BulkActionIdDto]),
    __metadata("design:returntype", void 0)
], BulkActionsGateway.prototype, "abort", null);
BulkActionsGateway = __decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseFilters)(ack_ws_exception_filter_1.AckWsExceptionFilter),
    (0, websockets_1.WebSocketGateway)({ namespace: 'bulk-actions', cors: SOCKETS_CONFIG.cors, serveClient: SOCKETS_CONFIG.serveClient }),
    __metadata("design:paramtypes", [bulk_actions_service_1.BulkActionsService])
], BulkActionsGateway);
exports.BulkActionsGateway = BulkActionsGateway;
