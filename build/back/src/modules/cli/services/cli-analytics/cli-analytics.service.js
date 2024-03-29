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
exports.CliAnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("../../../../constants");
const cli_dto_1 = require("../../dto/cli.dto");
const commands_service_1 = require("../../../commands/commands.service");
const command_telemetry_base_service_1 = require("../../../analytics/command.telemetry.base.service");
let CliAnalyticsService = class CliAnalyticsService extends command_telemetry_base_service_1.CommandTelemetryBaseService {
    constructor(eventEmitter, commandsService) {
        super(eventEmitter, commandsService);
        this.eventEmitter = eventEmitter;
        this.commandsService = commandsService;
    }
    sendClientCreatedEvent(databaseId, additionalData = {}) {
        this.sendEvent(constants_1.TelemetryEvents.CliClientCreated, {
            databaseId,
            ...additionalData,
        });
    }
    sendClientCreationFailedEvent(databaseId, exception, additionalData = {}) {
        this.sendFailedEvent(constants_1.TelemetryEvents.CliClientCreationFailed, exception, {
            databaseId,
            ...additionalData,
        });
    }
    sendClientRecreatedEvent(databaseId, additionalData = {}) {
        this.sendEvent(constants_1.TelemetryEvents.CliClientRecreated, {
            databaseId,
            ...additionalData,
        });
    }
    sendClientDeletedEvent(affected, databaseId, additionalData = {}) {
        try {
            if (affected > 0) {
                this.sendEvent(constants_1.TelemetryEvents.CliClientDeleted, {
                    databaseId,
                    ...additionalData,
                });
            }
        }
        catch (e) {
        }
    }
    sendIndexInfoEvent(databaseId, additionalData) {
        if (!additionalData) {
            return;
        }
        try {
            this.sendEvent(constants_1.TelemetryEvents.CliIndexInfoSubmitted, {
                databaseId,
                ...additionalData,
            });
        }
        catch (e) {
        }
    }
    async sendCommandExecutedEvent(databaseId, additionalData = {}) {
        try {
            this.sendEvent(constants_1.TelemetryEvents.CliCommandExecuted, {
                databaseId,
                ...(await this.getCommandAdditionalInfo(additionalData['command'])),
                ...additionalData,
            });
        }
        catch (e) {
        }
    }
    async sendCommandErrorEvent(databaseId, error, additionalData = {}) {
        var _a;
        try {
            this.sendEvent(constants_1.TelemetryEvents.CliCommandErrorReceived, {
                databaseId,
                error: error === null || error === void 0 ? void 0 : error.name,
                command: (_a = error === null || error === void 0 ? void 0 : error.command) === null || _a === void 0 ? void 0 : _a.name,
                ...(await this.getCommandAdditionalInfo(additionalData['command'])),
                ...additionalData,
            });
        }
        catch (e) {
        }
    }
    async sendClusterCommandExecutedEvent(databaseId, result, additionalData = {}) {
        var _a;
        const { status, error } = result;
        try {
            if (status === cli_dto_1.CommandExecutionStatus.Success) {
                this.sendEvent(constants_1.TelemetryEvents.CliClusterNodeCommandExecuted, {
                    databaseId,
                    ...(await this.getCommandAdditionalInfo(additionalData['command'])),
                    ...additionalData,
                });
            }
            if (status === cli_dto_1.CommandExecutionStatus.Fail) {
                this.sendEvent(constants_1.TelemetryEvents.CliCommandErrorReceived, {
                    databaseId,
                    error: error.name,
                    command: (_a = error === null || error === void 0 ? void 0 : error.command) === null || _a === void 0 ? void 0 : _a.name,
                    ...(await this.getCommandAdditionalInfo(additionalData['command'])),
                    ...additionalData,
                });
            }
        }
        catch (e) {
        }
    }
    async sendConnectionErrorEvent(databaseId, exception, additionalData = {}) {
        this.sendFailedEvent(constants_1.TelemetryEvents.CliClientConnectionError, exception, {
            databaseId,
            ...(await this.getCommandAdditionalInfo(additionalData['command'])),
            ...additionalData,
        });
    }
};
CliAnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        commands_service_1.CommandsService])
], CliAnalyticsService);
exports.CliAnalyticsService = CliAnalyticsService;
