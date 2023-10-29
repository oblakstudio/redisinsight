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
var DatabaseImportAnalytics_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseImportAnalytics = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const telemetry_base_service_1 = require("../analytics/telemetry.base.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("../../constants");
let DatabaseImportAnalytics = DatabaseImportAnalytics_1 = class DatabaseImportAnalytics extends telemetry_base_service_1.TelemetryBaseService {
    constructor(eventEmitter) {
        super(eventEmitter);
        this.eventEmitter = eventEmitter;
    }
    sendImportResults(importResult) {
        var _a, _b, _c;
        if ((_a = importResult.success) === null || _a === void 0 ? void 0 : _a.length) {
            this.sendEvent(constants_1.TelemetryEvents.DatabaseImportSucceeded, {
                succeed: importResult.success.length,
            });
        }
        if ((_b = importResult.fail) === null || _b === void 0 ? void 0 : _b.length) {
            this.sendEvent(constants_1.TelemetryEvents.DatabaseImportFailed, {
                failed: importResult.fail.length,
                errors: DatabaseImportAnalytics_1.getUniqueErrorNamesFromResults(importResult.fail),
            });
        }
        if ((_c = importResult.partial) === null || _c === void 0 ? void 0 : _c.length) {
            this.sendEvent(constants_1.TelemetryEvents.DatabaseImportPartiallySucceeded, {
                partially: importResult.partial.length,
                errors: DatabaseImportAnalytics_1.getUniqueErrorNamesFromResults(importResult.partial),
            });
        }
    }
    sendImportFailed(e) {
        var _a;
        this.sendEvent(constants_1.TelemetryEvents.DatabaseImportParseFailed, {
            error: ((_a = e === null || e === void 0 ? void 0 : e.constructor) === null || _a === void 0 ? void 0 : _a.name) || 'UncaughtError',
        });
    }
    static getUniqueErrorNamesFromResults(results) {
        return (0, lodash_1.uniq)([].concat(...results.map((res) => ((res === null || res === void 0 ? void 0 : res.errors) || []).map((error) => { var _a; return ((_a = error === null || error === void 0 ? void 0 : error.constructor) === null || _a === void 0 ? void 0 : _a.name) || 'UncaughtError'; }))));
    }
};
DatabaseImportAnalytics = DatabaseImportAnalytics_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], DatabaseImportAnalytics);
exports.DatabaseImportAnalytics = DatabaseImportAnalytics;
