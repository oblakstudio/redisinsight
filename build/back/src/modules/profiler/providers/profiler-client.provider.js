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
exports.ProfilerClientProvider = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const profiler_client_1 = require("../models/profiler.client");
const client_logs_emitter_1 = require("../emitters/client.logs-emitter");
const log_file_provider_1 = require("./log-file.provider");
const database_service_1 = require("../../database/database.service");
let ProfilerClientProvider = class ProfilerClientProvider {
    constructor(logFileProvider, databaseService) {
        this.logFileProvider = logFileProvider;
        this.databaseService = databaseService;
        this.profilerClients = new Map();
    }
    async getOrCreateClient(instanceId, socket, settings) {
        if (!this.profilerClients.has(socket.id)) {
            const clientObserver = new profiler_client_1.ProfilerClient(socket.id, socket);
            this.profilerClients.set(socket.id, clientObserver);
            clientObserver.addLogsEmitter(new client_logs_emitter_1.ClientLogsEmitter(socket));
            if (settings === null || settings === void 0 ? void 0 : settings.logFileId) {
                const profilerLogFile = this.logFileProvider.getOrCreate(instanceId, settings.logFileId);
                const alias = (await this.databaseService.get((0, lodash_1.get)(socket, 'handshake.query.instanceId'))).name;
                profilerLogFile.setAlias(alias);
                clientObserver.addLogsEmitter(await profilerLogFile.getEmitter());
            }
            this.profilerClients.set(socket.id, clientObserver);
        }
        return this.profilerClients.get(socket.id);
    }
    async getClient(id) {
        return this.profilerClients.get(id);
    }
};
ProfilerClientProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_file_provider_1.LogFileProvider,
        database_service_1.DatabaseService])
], ProfilerClientProvider);
exports.ProfilerClientProvider = ProfilerClientProvider;
