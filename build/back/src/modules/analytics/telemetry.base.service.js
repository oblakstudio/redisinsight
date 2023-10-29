"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryBaseService = void 0;
const lodash_1 = require("lodash");
const constants_1 = require("../../constants");
class TelemetryBaseService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    sendEvent(event, eventData = {}) {
        try {
            this.eventEmitter.emit(constants_1.AppAnalyticsEvents.Track, {
                event,
                eventData: {
                    ...eventData,
                    command: (0, lodash_1.isString)(eventData['command']) ? eventData['command'].toUpperCase() : eventData['command'],
                },
            });
        }
        catch (e) {
        }
    }
    sendFailedEvent(event, exception, eventData = {}) {
        var _a;
        try {
            this.eventEmitter.emit(constants_1.AppAnalyticsEvents.Track, {
                event,
                eventData: {
                    error: ((_a = exception.getResponse) === null || _a === void 0 ? void 0 : _a.call(exception)['error']) || exception.message,
                    ...eventData,
                    command: (0, lodash_1.isString)(eventData['command']) ? eventData['command'].toUpperCase() : eventData['command'],
                },
            });
        }
        catch (e) {
        }
    }
}
exports.TelemetryBaseService = TelemetryBaseService;
