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
exports.CloudAutodiscoveryAnalytics = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("../../../constants");
const telemetry_base_service_1 = require("../../analytics/telemetry.base.service");
const models_1 = require("../subscription/models");
const models_2 = require("../database/models");
let CloudAutodiscoveryAnalytics = class CloudAutodiscoveryAnalytics extends telemetry_base_service_1.TelemetryBaseService {
    constructor(eventEmitter) {
        super(eventEmitter);
        this.eventEmitter = eventEmitter;
    }
    sendGetRECloudSubsSucceedEvent(subscriptions = [], type, authType) {
        try {
            this.sendEvent(constants_1.TelemetryEvents.RECloudSubscriptionsDiscoverySucceed, {
                numberOfActiveSubscriptions: subscriptions.filter((sub) => sub.status === models_1.CloudSubscriptionStatus.Active).length,
                totalNumberOfSubscriptions: subscriptions.length,
                type,
                authType,
            });
        }
        catch (e) {
        }
    }
    sendGetRECloudSubsFailedEvent(exception, type, authType) {
        this.sendFailedEvent(constants_1.TelemetryEvents.RECloudSubscriptionsDiscoveryFailed, exception, {
            type,
            authType,
        });
    }
    sendGetRECloudDbsSucceedEvent(databases = [], authType) {
        try {
            this.sendEvent(constants_1.TelemetryEvents.RECloudDatabasesDiscoverySucceed, {
                numberOfActiveDatabases: databases.filter((db) => db.status === models_2.CloudDatabaseStatus.Active).length,
                numberOfFreeDatabases: databases.filter((db) => { var _a; return ((_a = db.cloudDetails) === null || _a === void 0 ? void 0 : _a.free) === true; }).length,
                totalNumberOfDatabases: databases.length,
                fixed: 0,
                flexible: 0,
                ...(0, lodash_1.countBy)(databases, 'subscriptionType'),
                authType,
            });
        }
        catch (e) {
        }
    }
    sendGetRECloudDbsFailedEvent(exception, authType) {
        this.sendFailedEvent(constants_1.TelemetryEvents.RECloudDatabasesDiscoveryFailed, exception, { authType });
    }
};
CloudAutodiscoveryAnalytics = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], CloudAutodiscoveryAnalytics);
exports.CloudAutodiscoveryAnalytics = CloudAutodiscoveryAnalytics;
