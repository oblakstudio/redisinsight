"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilerModule = void 0;
const common_1 = require("@nestjs/common");
const log_file_provider_1 = require("./providers/log-file.provider");
const profiler_controller_1 = require("./profiler.controller");
const redis_observer_provider_1 = require("./providers/redis-observer.provider");
const profiler_client_provider_1 = require("./providers/profiler-client.provider");
const profiler_analytics_service_1 = require("./profiler-analytics.service");
const profiler_gateway_1 = require("./profiler.gateway");
const profiler_service_1 = require("./profiler.service");
let ProfilerModule = class ProfilerModule {
};
ProfilerModule = __decorate([
    (0, common_1.Module)({
        providers: [
            profiler_analytics_service_1.ProfilerAnalyticsService,
            redis_observer_provider_1.RedisObserverProvider,
            profiler_client_provider_1.ProfilerClientProvider,
            log_file_provider_1.LogFileProvider,
            profiler_gateway_1.ProfilerGateway,
            profiler_service_1.ProfilerService,
        ],
        controllers: [profiler_controller_1.ProfilerController],
        exports: [log_file_provider_1.LogFileProvider],
    })
], ProfilerModule);
exports.ProfilerModule = ProfilerModule;
