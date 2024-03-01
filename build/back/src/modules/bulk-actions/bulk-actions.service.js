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
exports.BulkActionsService = void 0;
const common_1 = require("@nestjs/common");
const bulk_actions_provider_1 = require("./providers/bulk-actions.provider");
const bulk_actions_analytics_1 = require("./bulk-actions.analytics");
let BulkActionsService = class BulkActionsService {
    constructor(bulkActionsProvider, analytics) {
        this.bulkActionsProvider = bulkActionsProvider;
        this.analytics = analytics;
    }
    async create(dto, socket) {
        const bulkAction = await this.bulkActionsProvider.create(dto, socket);
        const overview = bulkAction.getOverview();
        this.analytics.sendActionStarted(overview);
        return overview;
    }
    async get(dto) {
        const bulkAction = await this.bulkActionsProvider.get(dto.id);
        return bulkAction.getOverview();
    }
    async abort(dto) {
        const bulkAction = await this.bulkActionsProvider.abort(dto.id);
        return bulkAction.getOverview();
    }
    disconnect(socketId) {
        this.bulkActionsProvider.abortUsersBulkActions(socketId);
    }
};
BulkActionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bulk_actions_provider_1.BulkActionsProvider,
        bulk_actions_analytics_1.BulkActionsAnalytics])
], BulkActionsService);
exports.BulkActionsService = BulkActionsService;
