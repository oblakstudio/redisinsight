"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkActionsModule = void 0;
const common_1 = require("@nestjs/common");
const bulk_actions_service_1 = require("./bulk-actions.service");
const bulk_actions_provider_1 = require("./providers/bulk-actions.provider");
const bulk_actions_gateway_1 = require("./bulk-actions.gateway");
const bulk_actions_analytics_1 = require("./bulk-actions.analytics");
const bulk_import_controller_1 = require("./bulk-import.controller");
const bulk_import_service_1 = require("./bulk-import.service");
let BulkActionsModule = class BulkActionsModule {
};
BulkActionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [bulk_import_controller_1.BulkImportController],
        providers: [
            bulk_actions_gateway_1.BulkActionsGateway,
            bulk_actions_service_1.BulkActionsService,
            bulk_actions_provider_1.BulkActionsProvider,
            bulk_actions_analytics_1.BulkActionsAnalytics,
            bulk_import_service_1.BulkImportService,
        ],
    })
], BulkActionsModule);
exports.BulkActionsModule = BulkActionsModule;
