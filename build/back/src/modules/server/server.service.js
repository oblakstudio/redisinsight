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
var ServerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const config_1 = require("../../utils/config");
const app_events_1 = require("../../constants/app-events");
const telemetry_events_1 = require("../../constants/telemetry-events");
const exceptions_1 = require("../../constants/exceptions");
const encryption_service_1 = require("../encryption/encryption.service");
const server_repository_1 = require("./repositories/server.repository");
const server_1 = require("./models/server");
const features_config_service_1 = require("../feature/features-config.service");
const SERVER_CONFIG = config_1.default.get('server');
const REDIS_STACK_CONFIG = config_1.default.get('redisStack');
let ServerService = ServerService_1 = class ServerService {
    constructor(repository, featuresConfigService, eventEmitter, encryptionService) {
        this.repository = repository;
        this.featuresConfigService = featuresConfigService;
        this.eventEmitter = eventEmitter;
        this.encryptionService = encryptionService;
        this.logger = new common_1.Logger('ServerService');
    }
    async onApplicationBootstrap(sessionId = new Date().getTime()) {
        this.sessionId = sessionId;
        await this.upsertServerInfo();
    }
    async upsertServerInfo(id = '') {
        this.logger.log('Checking server info.');
        let startEvent = telemetry_events_1.TelemetryEvents.ApplicationFirstStart;
        if (await this.repository.exists(id)) {
            this.logger.log('First application launch.');
            startEvent = telemetry_events_1.TelemetryEvents.ApplicationStarted;
        }
        const server = await this.repository.getOrCreate(id);
        this.logger.log('Application started.');
        this.eventEmitter.emit(app_events_1.AppAnalyticsEvents.Initialize, {
            anonymousId: server.id,
            sessionId: this.sessionId,
            appType: ServerService_1.getAppType(SERVER_CONFIG.buildType),
            appVersion: SERVER_CONFIG.appVersion,
            ...(await this.featuresConfigService.getControlInfo()),
        });
        if ((SERVER_CONFIG === null || SERVER_CONFIG === void 0 ? void 0 : SERVER_CONFIG.buildType.toUpperCase()) === 'ELECTRON') {
            this.eventEmitter.emit(app_events_1.AppAnalyticsEvents.Track, {
                event: startEvent,
                eventData: {
                    appVersion: SERVER_CONFIG.appVersion,
                    osPlatform: process.platform,
                    buildType: SERVER_CONFIG.buildType,
                    port: SERVER_CONFIG.port,
                },
                nonTracking: true,
            });
        }
    }
    async getInfo(id = '') {
        this.logger.log('Getting server info.');
        try {
            const info = await this.repository.getOrCreate(id);
            if (!info) {
                return Promise.reject(new exceptions_1.ServerInfoNotFoundException());
            }
            const result = {
                ...info,
                sessionId: this.sessionId,
                appVersion: SERVER_CONFIG.appVersion,
                osPlatform: process.platform,
                buildType: SERVER_CONFIG.buildType,
                appType: ServerService_1.getAppType(SERVER_CONFIG.buildType),
                encryptionStrategies: await this.encryptionService.getAvailableEncryptionStrategies(),
                fixedDatabaseId: REDIS_STACK_CONFIG === null || REDIS_STACK_CONFIG === void 0 ? void 0 : REDIS_STACK_CONFIG.id,
                ...(await this.featuresConfigService.getControlInfo()),
            };
            this.logger.log('Succeed to get server info.');
            return result;
        }
        catch (error) {
            this.logger.error('Failed to get application settings.', error);
            throw new common_1.InternalServerErrorException();
        }
    }
    static getAppType(buildType) {
        switch (buildType) {
            case server_1.BuildType.DockerOnPremise:
                return server_1.AppType.Docker;
            case server_1.BuildType.Electron:
                return server_1.AppType.Electron;
            case server_1.BuildType.RedisStack:
                return server_1.AppType.RedisStackWeb;
            default:
                return server_1.AppType.Unknown;
        }
    }
};
ServerService = ServerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [server_repository_1.ServerRepository,
        features_config_service_1.FeaturesConfigService,
        event_emitter_1.EventEmitter2,
        encryption_service_1.EncryptionService])
], ServerService);
exports.ServerService = ServerService;
