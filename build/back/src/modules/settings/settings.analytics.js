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
exports.SettingsAnalytics = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const lodash_1 = require("lodash");
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const telemetry_base_service_1 = require("../analytics/telemetry.base.service");
let SettingsAnalytics = class SettingsAnalytics extends telemetry_base_service_1.TelemetryBaseService {
    constructor(eventEmitter) {
        super(eventEmitter);
        this.eventEmitter = eventEmitter;
    }
    sendSettingsUpdatedEvent(newSettings, oldSettings) {
        try {
            const dif = Object.fromEntries((0, lodash_1.differenceWith)(Object.entries(newSettings), Object.entries(oldSettings), lodash_1.isEqual));
            if ((0, lodash_1.has)(dif, 'scanThreshold')) {
                this.sendScanThresholdChanged(dif.scanThreshold, oldSettings.scanThreshold);
            }
            if ((0, lodash_1.has)(dif, 'batchSize')) {
                this.sendWorkbenchPipelineChanged(dif.batchSize, oldSettings.batchSize);
            }
        }
        catch (e) {
        }
    }
    sendAnalyticsAgreementChange(newAgreements, oldAgreements = new Map()) {
        try {
            const newPermission = newAgreements.get('analytics');
            const oldPermission = oldAgreements.get('analytics');
            if (oldPermission !== newPermission) {
                this.eventEmitter.emit(constants_1.AppAnalyticsEvents.Track, {
                    event: constants_1.TelemetryEvents.AnalyticsPermission,
                    eventData: {
                        state: newPermission ? 'enabled' : 'disabled',
                    },
                    nonTracking: true,
                });
            }
        }
        catch (e) {
        }
    }
    sendScanThresholdChanged(currentValue, previousValue) {
        this.sendEvent(constants_1.TelemetryEvents.SettingsScanThresholdChanged, {
            currentValue,
            currentValueRange: (0, utils_1.getRangeForNumber)(currentValue, utils_1.SCAN_THRESHOLD_BREAKPOINTS),
            previousValue,
            previousValueRange: (0, utils_1.getRangeForNumber)(previousValue, utils_1.SCAN_THRESHOLD_BREAKPOINTS),
        });
    }
    sendWorkbenchPipelineChanged(newValue, currentValue) {
        this.sendEvent(constants_1.TelemetryEvents.SettingsWorkbenchPipelineChanged, {
            newValue: (0, utils_1.getIsPipelineEnable)(newValue),
            newValueSize: newValue,
            currentValue: (0, utils_1.getIsPipelineEnable)(currentValue),
            currentValueSize: currentValue,
        });
    }
};
SettingsAnalytics = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], SettingsAnalytics);
exports.SettingsAnalytics = SettingsAnalytics;
