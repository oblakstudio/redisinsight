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
exports.PubSubAnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("../../constants");
const telemetry_base_service_1 = require("../analytics/telemetry.base.service");
let PubSubAnalyticsService = class PubSubAnalyticsService extends telemetry_base_service_1.TelemetryBaseService {
    constructor(eventEmitter) {
        super(eventEmitter);
        this.eventEmitter = eventEmitter;
    }
    sendMessagePublishedEvent(databaseId, affected) {
        try {
            this.sendEvent(constants_1.TelemetryEvents.PubSubMessagePublished, {
                databaseId,
                clients: affected,
            });
        }
        catch (e) {
        }
    }
    sendChannelSubscribeEvent(databaseId) {
        try {
            this.sendEvent(constants_1.TelemetryEvents.PubSubChannelSubscribed, {
                databaseId,
            });
        }
        catch (e) {
        }
    }
    sendChannelUnsubscribeEvent(databaseId) {
        try {
            this.sendEvent(constants_1.TelemetryEvents.PubSubChannelUnsubscribed, {
                databaseId,
            });
        }
        catch (e) {
        }
    }
};
PubSubAnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], PubSubAnalyticsService);
exports.PubSubAnalyticsService = PubSubAnalyticsService;
