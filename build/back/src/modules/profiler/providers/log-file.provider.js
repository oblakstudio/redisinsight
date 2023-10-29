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
exports.LogFileProvider = void 0;
const common_1 = require("@nestjs/common");
const log_file_1 = require("../models/log-file");
const error_messages_1 = require("../../../constants/error-messages");
const profiler_analytics_service_1 = require("../profiler-analytics.service");
let LogFileProvider = class LogFileProvider {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
        this.profilerLogFiles = new Map();
    }
    getOrCreate(instanceId, id) {
        if (!this.profilerLogFiles.has(id)) {
            this.profilerLogFiles.set(id, new log_file_1.LogFile(instanceId, id, this.analyticsService.getEventsEmitters()));
        }
        return this.profilerLogFiles.get(id);
    }
    get(id) {
        if (!this.profilerLogFiles.has(id)) {
            throw new common_1.NotFoundException(error_messages_1.default.PROFILER_LOG_FILE_NOT_FOUND);
        }
        return this.profilerLogFiles.get(id);
    }
    async getDownloadData(id) {
        const logFile = await this.get(id);
        const stream = await logFile.getReadStream();
        return { stream, filename: logFile.getFilename() };
    }
    onModuleDestroy() {
        this.profilerLogFiles.forEach((logFile) => {
            try {
                logFile.destroy();
            }
            catch (e) {
            }
        });
    }
};
LogFileProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profiler_analytics_service_1.ProfilerAnalyticsService])
], LogFileProvider);
exports.LogFileProvider = LogFileProvider;
