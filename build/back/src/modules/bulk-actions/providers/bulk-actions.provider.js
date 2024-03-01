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
var BulkActionsProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkActionsProvider = void 0;
const common_1 = require("@nestjs/common");
const bulk_action_1 = require("../models/bulk-action");
const constants_1 = require("../constants");
const delete_bulk_action_simple_runner_1 = require("../models/runners/simple/delete.bulk-action.simple.runner");
const bulk_actions_analytics_1 = require("../bulk-actions.analytics");
const models_1 = require("../../../common/models");
const database_client_factory_1 = require("../../database/providers/database.client.factory");
let BulkActionsProvider = BulkActionsProvider_1 = class BulkActionsProvider {
    constructor(databaseClientFactory, analytics) {
        this.databaseClientFactory = databaseClientFactory;
        this.analytics = analytics;
        this.bulkActions = new Map();
        this.logger = new common_1.Logger('BulkActionsProvider');
    }
    async create(dto, socket) {
        if (this.bulkActions.get(dto.id)) {
            throw new Error('You already have bulk action with such id');
        }
        const bulkAction = new bulk_action_1.BulkAction(dto.id, dto.databaseId, dto.type, dto.filter, socket, this.analytics);
        this.bulkActions.set(dto.id, bulkAction);
        const client = await this.databaseClientFactory.getOrCreateClient({
            sessionMetadata: {
                userId: '1',
                sessionId: '1',
            },
            databaseId: dto.databaseId,
            context: models_1.ClientContext.Common,
            db: dto.db,
        });
        await bulkAction.prepare(client, BulkActionsProvider_1.getSimpleRunnerClass(dto));
        bulkAction.start().catch();
        return bulkAction;
    }
    static getSimpleRunnerClass(dto) {
        switch (dto.type) {
            case constants_1.BulkActionType.Delete:
                return delete_bulk_action_simple_runner_1.DeleteBulkActionSimpleRunner;
            default:
                throw new common_1.BadRequestException(`Unsupported type: ${dto.type} for Bulk Actions`);
        }
    }
    get(id) {
        const bulkAction = this.bulkActions.get(id);
        if (!bulkAction) {
            throw new common_1.NotFoundException(`Bulk action with id: ${id} was not found`);
        }
        return bulkAction;
    }
    abort(id) {
        const bulkAction = this.get(id);
        bulkAction.setStatus(constants_1.BulkActionStatus.Aborted);
        this.bulkActions.delete(id);
        return bulkAction;
    }
    abortUsersBulkActions(socketId) {
        let aborted = 0;
        this.bulkActions.forEach((bulkAction) => {
            if (bulkAction.getSocket().id === socketId) {
                try {
                    this.abort(bulkAction.getId());
                    aborted += 1;
                }
                catch (e) {
                }
            }
        });
        this.logger.debug(`Aborted ${aborted} bulk actions`);
        return aborted;
    }
};
BulkActionsProvider = BulkActionsProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory,
        bulk_actions_analytics_1.BulkActionsAnalytics])
], BulkActionsProvider);
exports.BulkActionsProvider = BulkActionsProvider;
