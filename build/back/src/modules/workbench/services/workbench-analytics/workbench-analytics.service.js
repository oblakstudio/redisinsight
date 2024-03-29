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
exports.WorkbenchAnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const cli_dto_1 = require("../../../cli/dto/cli.dto");
const event_emitter_1 = require("@nestjs/event-emitter");
const commands_service_1 = require("../../../commands/commands.service");
const command_telemetry_base_service_1 = require("../../../analytics/command.telemetry.base.service");
let WorkbenchAnalyticsService = class WorkbenchAnalyticsService extends command_telemetry_base_service_1.CommandTelemetryBaseService {
    constructor(eventEmitter, commandsService) {
        super(eventEmitter, commandsService);
        this.eventEmitter = eventEmitter;
        this.commandsService = commandsService;
    }
    sendIndexInfoEvent(databaseId, additionalData) {
        if (!additionalData) {
            return;
        }
        try {
            this.sendEvent(constants_1.TelemetryEvents.WorkbenchIndexInfoSubmitted, {
                databaseId,
                ...additionalData,
            });
        }
        catch (e) {
        }
    }
    async sendCommandExecutedEvents(databaseId, results, additionalData = {}) {
        try {
            await Promise.all(results.map((result) => this.sendCommandExecutedEvent(databaseId, result, additionalData)));
        }
        catch (e) {
        }
    }
    async sendCommandExecutedEvent(databaseId, result, additionalData = {}) {
        const { status } = result;
        try {
            if (status === cli_dto_1.CommandExecutionStatus.Success) {
                this.sendEvent(constants_1.TelemetryEvents.WorkbenchCommandExecuted, {
                    databaseId,
                    ...(await this.getCommandAdditionalInfo(additionalData['command'])),
                    ...additionalData,
                });
            }
            if (status === cli_dto_1.CommandExecutionStatus.Fail) {
                this.sendCommandErrorEvent(databaseId, result.error, {
                    ...(await this.getCommandAdditionalInfo(additionalData['command'])),
                    ...additionalData,
                });
            }
        }
        catch (e) {
        }
    }
    sendCommandDeletedEvent(databaseId, additionalData = {}) {
        this.sendEvent(constants_1.TelemetryEvents.WorkbenchCommandDeleted, {
            databaseId,
            ...additionalData,
        });
    }
    sendCommandErrorEvent(databaseId, error, additionalData = {}) {
        var _a;
        try {
            if (error instanceof common_1.HttpException) {
                this.sendFailedEvent(constants_1.TelemetryEvents.WorkbenchCommandErrorReceived, error, {
                    databaseId,
                    ...additionalData,
                });
            }
            else {
                this.sendEvent(constants_1.TelemetryEvents.WorkbenchCommandErrorReceived, {
                    databaseId,
                    error: error.name,
                    command: (_a = error === null || error === void 0 ? void 0 : error.command) === null || _a === void 0 ? void 0 : _a.name,
                    ...additionalData,
                });
            }
        }
        catch (e) {
        }
    }
};
WorkbenchAnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        commands_service_1.CommandsService])
], WorkbenchAnalyticsService);
exports.WorkbenchAnalyticsService = WorkbenchAnalyticsService;
