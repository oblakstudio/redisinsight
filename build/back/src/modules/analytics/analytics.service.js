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
exports.AnalyticsService = exports.Telemetry = exports.NON_TRACKING_ANONYMOUS_ID = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const lodash_1 = require("lodash");
const Analytics = require("analytics-node");
const constants_1 = require("../../constants");
const config_1 = require("../../utils/config");
const settings_service_1 = require("../settings/settings.service");
exports.NON_TRACKING_ANONYMOUS_ID = '00000000-0000-0000-0000-000000000001';
const ANALYTICS_CONFIG = config_1.default.get('analytics');
var Telemetry;
(function (Telemetry) {
    Telemetry["Enabled"] = "enabled";
    Telemetry["Disabled"] = "disabled";
})(Telemetry = exports.Telemetry || (exports.Telemetry = {}));
let AnalyticsService = class AnalyticsService {
    constructor(settingsService) {
        this.settingsService = settingsService;
        this.anonymousId = exports.NON_TRACKING_ANONYMOUS_ID;
        this.sessionId = -1;
        this.appType = 'unknown';
        this.controlNumber = -1;
        this.controlGroup = '-1';
        this.appVersion = '2.0.0';
    }
    getAnonymousId() {
        return this.anonymousId;
    }
    initialize(payload) {
        const { anonymousId, sessionId, appType, controlNumber, controlGroup, appVersion, } = payload;
        this.sessionId = sessionId;
        this.anonymousId = anonymousId;
        this.appType = appType;
        this.controlGroup = controlGroup;
        this.appVersion = appVersion;
        this.controlNumber = controlNumber;
        this.analytics = new Analytics(ANALYTICS_CONFIG.writeKey, {
            flushInterval: ANALYTICS_CONFIG.flushInterval,
        });
    }
    async sendEvent(payload) {
        try {
            const { event, eventData, nonTracking, traits = {}, } = payload;
            const isAnalyticsGranted = await this.checkIsAnalyticsGranted();
            if (isAnalyticsGranted || nonTracking) {
                this.analytics.track({
                    anonymousId: !isAnalyticsGranted && nonTracking ? exports.NON_TRACKING_ANONYMOUS_ID : this.anonymousId,
                    integrations: { Amplitude: { session_id: this.sessionId } },
                    event,
                    context: {
                        traits: {
                            ...traits,
                            telemetry: isAnalyticsGranted ? Telemetry.Enabled : Telemetry.Disabled,
                        },
                    },
                    properties: {
                        ...eventData,
                        anonymousId: this.anonymousId,
                        buildType: this.appType,
                        controlNumber: this.controlNumber,
                        controlGroup: this.controlGroup,
                        appVersion: this.appVersion,
                    },
                });
            }
        }
        catch (e) {
        }
    }
    async sendPage(payload) {
        try {
            const { event, eventData, nonTracking, traits = {}, } = payload;
            const isAnalyticsGranted = await this.checkIsAnalyticsGranted();
            if (isAnalyticsGranted || nonTracking) {
                this.analytics.page({
                    name: event,
                    anonymousId: !isAnalyticsGranted && nonTracking ? exports.NON_TRACKING_ANONYMOUS_ID : this.anonymousId,
                    integrations: { Amplitude: { session_id: this.sessionId } },
                    context: {
                        traits: {
                            ...traits,
                            telemetry: isAnalyticsGranted ? Telemetry.Enabled : Telemetry.Disabled,
                        },
                    },
                    properties: {
                        ...eventData,
                        anonymousId: this.anonymousId,
                        buildType: this.appType,
                        controlNumber: this.controlNumber,
                        controlGroup: this.controlGroup,
                        appVersion: this.appVersion,
                    },
                });
            }
        }
        catch (e) {
        }
    }
    async checkIsAnalyticsGranted() {
        return !!(0, lodash_1.get)(await this.settingsService.getAppSettings('1'), 'agreements.analytics', false);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.AppAnalyticsEvents.Initialize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnalyticsService.prototype, "initialize", null);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.AppAnalyticsEvents.Track),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnalyticsService.prototype, "sendEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.AppAnalyticsEvents.Page),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnalyticsService.prototype, "sendPage", null);
AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], AnalyticsService);
exports.AnalyticsService = AnalyticsService;
