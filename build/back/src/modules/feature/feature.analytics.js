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
var FeatureAnalytics_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureAnalytics = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("../../constants");
const telemetry_base_service_1 = require("../analytics/telemetry.base.service");
let FeatureAnalytics = FeatureAnalytics_1 = class FeatureAnalytics extends telemetry_base_service_1.TelemetryBaseService {
    constructor(eventEmitter) {
        super(eventEmitter);
        this.eventEmitter = eventEmitter;
    }
    static getReason(error) {
        var _a;
        let reason = error;
        if ((0, lodash_1.isArray)(error)) {
            [reason] = error;
        }
        return ((_a = reason === null || reason === void 0 ? void 0 : reason.constructor) === null || _a === void 0 ? void 0 : _a.name) || 'UncaughtError';
    }
    sendFeatureFlagConfigUpdated(data) {
        try {
            this.sendEvent(constants_1.TelemetryEvents.FeatureFlagConfigUpdated, {
                configVersion: data.configVersion,
                oldVersion: data.oldVersion,
                type: data.type,
            });
        }
        catch (e) {
        }
    }
    sendFeatureFlagConfigUpdateError(data) {
        try {
            this.sendEvent(constants_1.TelemetryEvents.FeatureFlagConfigUpdateError, {
                configVersion: data.configVersion,
                type: data.type,
                reason: FeatureAnalytics_1.getReason(data.error),
            });
        }
        catch (e) {
        }
    }
    sendFeatureFlagInvalidRemoteConfig(data) {
        try {
            this.sendEvent(constants_1.TelemetryEvents.FeatureFlagInvalidRemoteConfig, {
                configVersion: data.configVersion,
                type: data.type,
                reason: FeatureAnalytics_1.getReason(data.error),
            });
        }
        catch (e) {
        }
    }
    sendFeatureFlagRecalculated(data) {
        try {
            const features = {};
            (0, lodash_1.forEach)((data === null || data === void 0 ? void 0 : data.features) || {}, (value, key) => {
                features[key] = value === null || value === void 0 ? void 0 : value.flag;
            });
            this.sendEvent(constants_1.TelemetryEvents.FeatureFlagRecalculated, {
                configVersion: data.configVersion,
                features,
            });
        }
        catch (e) {
        }
    }
};
FeatureAnalytics = FeatureAnalytics_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], FeatureAnalytics);
exports.FeatureAnalytics = FeatureAnalytics;
