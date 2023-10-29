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
exports.BulkActionsAnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("../../constants");
const telemetry_base_service_1 = require("../analytics/telemetry.base.service");
const utils_1 = require("../../utils");
let BulkActionsAnalyticsService = class BulkActionsAnalyticsService extends telemetry_base_service_1.TelemetryBaseService {
    constructor(eventEmitter) {
        super(eventEmitter);
        this.eventEmitter = eventEmitter;
        this.events = new Map();
        this.events.set(constants_1.TelemetryEvents.BulkActionsStarted, this.sendActionStarted.bind(this));
        this.events.set(constants_1.TelemetryEvents.BulkActionsStopped, this.sendActionStopped.bind(this));
        this.events.set(constants_1.TelemetryEvents.BulkActionsSucceed, this.sendActionSucceed.bind(this));
        this.events.set(constants_1.TelemetryEvents.BulkActionsFailed, this.sendActionFailed.bind(this));
    }
    sendActionStarted(overview) {
        var _a, _b, _c, _d, _e, _f;
        try {
            this.sendEvent(constants_1.TelemetryEvents.BulkActionsStarted, {
                databaseId: overview.databaseId,
                action: overview.type,
                duration: overview.duration,
                filter: {
                    match: ((_a = overview.filter) === null || _a === void 0 ? void 0 : _a.match) === '*' ? '*' : 'PATTERN',
                    type: (_b = overview.filter) === null || _b === void 0 ? void 0 : _b.type,
                },
                progress: {
                    scanned: (_c = overview.progress) === null || _c === void 0 ? void 0 : _c.scanned,
                    scannedRange: (0, utils_1.getRangeForNumber)((_d = overview.progress) === null || _d === void 0 ? void 0 : _d.scanned, utils_1.BULK_ACTIONS_BREAKPOINTS),
                    total: (_e = overview.progress) === null || _e === void 0 ? void 0 : _e.total,
                    totalRange: (0, utils_1.getRangeForNumber)((_f = overview.progress) === null || _f === void 0 ? void 0 : _f.total, utils_1.BULK_ACTIONS_BREAKPOINTS),
                },
            });
        }
        catch (e) {
        }
    }
    sendActionStopped(overview) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        try {
            this.sendEvent(constants_1.TelemetryEvents.BulkActionsStopped, {
                databaseId: overview.databaseId,
                action: overview.type,
                duration: overview.duration,
                filter: {
                    match: ((_a = overview.filter) === null || _a === void 0 ? void 0 : _a.match) === '*' ? '*' : 'PATTERN',
                    type: (_b = overview.filter) === null || _b === void 0 ? void 0 : _b.type,
                },
                progress: {
                    scanned: (_c = overview.progress) === null || _c === void 0 ? void 0 : _c.scanned,
                    scannedRange: (0, utils_1.getRangeForNumber)((_d = overview.progress) === null || _d === void 0 ? void 0 : _d.scanned, utils_1.BULK_ACTIONS_BREAKPOINTS),
                    total: (_e = overview.progress) === null || _e === void 0 ? void 0 : _e.total,
                    totalRange: (0, utils_1.getRangeForNumber)((_f = overview.progress) === null || _f === void 0 ? void 0 : _f.total, utils_1.BULK_ACTIONS_BREAKPOINTS),
                },
                summary: {
                    processed: (_g = overview.summary) === null || _g === void 0 ? void 0 : _g.processed,
                    processedRange: (0, utils_1.getRangeForNumber)((_h = overview.summary) === null || _h === void 0 ? void 0 : _h.processed, utils_1.BULK_ACTIONS_BREAKPOINTS),
                    succeed: (_j = overview.summary) === null || _j === void 0 ? void 0 : _j.succeed,
                    succeedRange: (0, utils_1.getRangeForNumber)((_k = overview.summary) === null || _k === void 0 ? void 0 : _k.succeed, utils_1.BULK_ACTIONS_BREAKPOINTS),
                    failed: overview.summary.failed,
                    failedRange: (0, utils_1.getRangeForNumber)(overview.summary.failed, utils_1.BULK_ACTIONS_BREAKPOINTS),
                },
            });
        }
        catch (e) {
        }
    }
    sendActionSucceed(overview) {
        var _a, _b, _c, _d, _e, _f;
        try {
            this.sendEvent(constants_1.TelemetryEvents.BulkActionsSucceed, {
                databaseId: overview.databaseId,
                action: overview.type,
                duration: overview.duration,
                filter: {
                    match: ((_a = overview.filter) === null || _a === void 0 ? void 0 : _a.match) === '*' ? '*' : 'PATTERN',
                    type: (_b = overview.filter) === null || _b === void 0 ? void 0 : _b.type,
                },
                summary: {
                    processed: (_c = overview.summary) === null || _c === void 0 ? void 0 : _c.processed,
                    processedRange: (0, utils_1.getRangeForNumber)((_d = overview.summary) === null || _d === void 0 ? void 0 : _d.processed, utils_1.BULK_ACTIONS_BREAKPOINTS),
                    succeed: (_e = overview.summary) === null || _e === void 0 ? void 0 : _e.succeed,
                    succeedRange: (0, utils_1.getRangeForNumber)((_f = overview.summary) === null || _f === void 0 ? void 0 : _f.succeed, utils_1.BULK_ACTIONS_BREAKPOINTS),
                    failed: overview.summary.failed,
                    failedRange: (0, utils_1.getRangeForNumber)(overview.summary.failed, utils_1.BULK_ACTIONS_BREAKPOINTS),
                },
            });
        }
        catch (e) {
        }
    }
    sendActionFailed(overview, error) {
        try {
            this.sendEvent(constants_1.TelemetryEvents.BulkActionsFailed, {
                databaseId: overview.databaseId,
                action: overview.type,
                error,
            });
        }
        catch (e) {
        }
    }
    getEventsEmitters() {
        return this.events;
    }
};
BulkActionsAnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], BulkActionsAnalyticsService);
exports.BulkActionsAnalyticsService = BulkActionsAnalyticsService;
