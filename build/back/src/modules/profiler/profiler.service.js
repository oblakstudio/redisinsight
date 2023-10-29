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
exports.ProfilerService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("../../constants");
const log_file_provider_1 = require("./providers/log-file.provider");
const redis_observer_provider_1 = require("./providers/redis-observer.provider");
const profiler_client_provider_1 = require("./providers/profiler-client.provider");
let ProfilerService = class ProfilerService {
    constructor(logFileProvider, redisObserverProvider, profilerClientProvider) {
        this.logFileProvider = logFileProvider;
        this.redisObserverProvider = redisObserverProvider;
        this.profilerClientProvider = profilerClientProvider;
        this.logger = new common_1.Logger('ProfilerService');
    }
    async addListenerForInstance(instanceId, client, settings = null) {
        this.logger.log(`Add listener for instance: ${instanceId}.`);
        const profilerClient = await this.profilerClientProvider.getOrCreateClient(instanceId, client, settings);
        const monitorObserver = await this.redisObserverProvider.getOrCreateObserver(instanceId);
        await monitorObserver.subscribe(profilerClient);
    }
    async removeListenerFromInstance(instanceId, listenerId) {
        this.logger.log(`Remove listener from instance: ${instanceId}.`);
        const redisObserver = await this.redisObserverProvider.getObserver(instanceId);
        if (redisObserver) {
            redisObserver.unsubscribe(listenerId);
        }
    }
    async disconnectListenerFromInstance(instanceId, listenerId) {
        this.logger.log(`Disconnect listener from instance: ${instanceId}.`);
        const redisObserver = await this.redisObserverProvider.getObserver(instanceId);
        if (redisObserver) {
            redisObserver.disconnect(listenerId);
        }
    }
    async flushLogs(listenerId) {
        this.logger.log(`Flush logs for client ${listenerId}.`);
        const profilerClient = await this.profilerClientProvider.getClient(listenerId);
        if (profilerClient) {
            await profilerClient.flushLogs();
        }
    }
    async handleInstanceDeletedEvent(instanceId) {
        this.logger.log(`Handle instance deleted event. instance: ${instanceId}.`);
        try {
            const redisObserver = await this.redisObserverProvider.getObserver(instanceId);
            if (redisObserver) {
                redisObserver.clear();
                await this.redisObserverProvider.removeObserver(instanceId);
            }
        }
        catch (e) {
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.AppRedisInstanceEvents.Deleted),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfilerService.prototype, "handleInstanceDeletedEvent", null);
ProfilerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_file_provider_1.LogFileProvider,
        redis_observer_provider_1.RedisObserverProvider,
        profiler_client_provider_1.ProfilerClientProvider])
], ProfilerService);
exports.ProfilerService = ProfilerService;
