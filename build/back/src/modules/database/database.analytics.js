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
exports.DatabaseAnalytics = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const telemetry_base_service_1 = require("../analytics/telemetry.base.service");
const constants_1 = require("../../constants");
const redis_modules_summary_1 = require("../../utils/redis-modules-summary");
const utils_1 = require("../../utils");
let DatabaseAnalytics = class DatabaseAnalytics extends telemetry_base_service_1.TelemetryBaseService {
    constructor(eventEmitter) {
        super(eventEmitter);
        this.eventEmitter = eventEmitter;
    }
    sendConnectionFailedEvent(instance, exception) {
        this.sendFailedEvent(constants_1.TelemetryEvents.RedisInstanceConnectionFailed, exception, { databaseId: instance.id });
    }
    sendInstanceAddedEvent(instance, additionalInfo) {
        var _a;
        try {
            const modulesSummary = (0, redis_modules_summary_1.getRedisModulesSummary)(instance.modules);
            this.sendEvent(constants_1.TelemetryEvents.RedisInstanceAdded, {
                databaseId: instance.id,
                connectionType: instance.connectionType,
                provider: instance.provider,
                useTLS: instance.tls ? 'enabled' : 'disabled',
                verifyTLSCertificate: (instance === null || instance === void 0 ? void 0 : instance.verifyServerCert)
                    ? 'enabled'
                    : 'disabled',
                useTLSAuthClients: (instance === null || instance === void 0 ? void 0 : instance.clientCert)
                    ? 'enabled'
                    : 'disabled',
                useSNI: (instance === null || instance === void 0 ? void 0 : instance.tlsServername) ? 'enabled' : 'disabled',
                useSSH: (instance === null || instance === void 0 ? void 0 : instance.ssh) ? 'enabled' : 'disabled',
                version: additionalInfo === null || additionalInfo === void 0 ? void 0 : additionalInfo.version,
                numberOfKeys: additionalInfo === null || additionalInfo === void 0 ? void 0 : additionalInfo.totalKeys,
                numberOfKeysRange: (0, utils_1.getRangeForNumber)(additionalInfo === null || additionalInfo === void 0 ? void 0 : additionalInfo.totalKeys, utils_1.TOTAL_KEYS_BREAKPOINTS),
                totalMemory: additionalInfo === null || additionalInfo === void 0 ? void 0 : additionalInfo.usedMemory,
                numberedDatabases: additionalInfo === null || additionalInfo === void 0 ? void 0 : additionalInfo.databases,
                numberOfModules: ((_a = instance.modules) === null || _a === void 0 ? void 0 : _a.length) || 0,
                timeout: instance.timeout / 1000,
                databaseIndex: instance.db || 0,
                useDecompression: instance.compressor || null,
                ...modulesSummary,
            });
        }
        catch (e) {
        }
    }
    sendInstanceAddFailedEvent(exception) {
        this.sendFailedEvent(constants_1.TelemetryEvents.RedisInstanceAddFailed, exception);
    }
    sendInstanceEditedEvent(prev, cur, manualUpdate = true) {
        try {
            if (manualUpdate) {
                this.sendEvent(constants_1.TelemetryEvents.RedisInstanceEditedByUser, {
                    databaseId: cur.id,
                    connectionType: cur.connectionType,
                    provider: cur.provider,
                    useTLS: cur.tls ? 'enabled' : 'disabled',
                    verifyTLSCertificate: (cur === null || cur === void 0 ? void 0 : cur.verifyServerCert)
                        ? 'enabled'
                        : 'disabled',
                    useTLSAuthClients: (cur === null || cur === void 0 ? void 0 : cur.clientCert) ? 'enabled' : 'disabled',
                    useSNI: (cur === null || cur === void 0 ? void 0 : cur.tlsServername) ? 'enabled' : 'disabled',
                    useSSH: (cur === null || cur === void 0 ? void 0 : cur.ssh) ? 'enabled' : 'disabled',
                    timeout: (cur === null || cur === void 0 ? void 0 : cur.timeout) / 1000,
                    useDecompression: (cur === null || cur === void 0 ? void 0 : cur.compressor) || null,
                    previousValues: {
                        connectionType: prev.connectionType,
                        provider: prev.provider,
                        useTLS: prev.tls ? 'enabled' : 'disabled',
                        useSNI: (prev === null || prev === void 0 ? void 0 : prev.tlsServername) ? 'enabled' : 'disabled',
                        useSSH: (prev === null || prev === void 0 ? void 0 : prev.ssh) ? 'enabled' : 'disabled',
                        verifyTLSCertificate: (prev === null || prev === void 0 ? void 0 : prev.verifyServerCert)
                            ? 'enabled'
                            : 'disabled',
                        useTLSAuthClients: (prev === null || prev === void 0 ? void 0 : prev.clientCert)
                            ? 'enabled'
                            : 'disabled',
                    },
                });
            }
        }
        catch (e) {
        }
    }
    sendInstanceDeletedEvent(instance) {
        this.sendEvent(constants_1.TelemetryEvents.RedisInstanceDeleted, {
            databaseId: instance.id,
            provider: instance.provider,
        });
    }
    sendDatabaseConnectedClientListEvent(instanceId, additionalData = {}) {
        try {
            this.sendEvent(constants_1.TelemetryEvents.DatabaseConnectedClientList, {
                instanceId,
                ...additionalData,
            });
        }
        catch (e) {
        }
    }
};
DatabaseAnalytics = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], DatabaseAnalytics);
exports.DatabaseAnalytics = DatabaseAnalytics;
