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
exports.AutodiscoveryService = void 0;
const common_1 = require("@nestjs/common");
const autodiscovery_util_1 = require("./utils/autodiscovery.util");
const utils_1 = require("../../utils");
const config_1 = require("../../utils/config");
const settings_service_1 = require("../settings/settings.service");
const database_service_1 = require("../database/database.service");
const models_1 = require("../../common/models");
const redis_client_factory_1 = require("../redis/redis.client.factory");
const SERVER_CONFIG = config_1.default.get('server');
let AutodiscoveryService = class AutodiscoveryService {
    constructor(settingsService, redisClientFactory, databaseService) {
        this.settingsService = settingsService;
        this.redisClientFactory = redisClientFactory;
        this.databaseService = databaseService;
        this.logger = new common_1.Logger('AutoDiscoveryService');
    }
    async onModuleInit() {
        try {
            if (SERVER_CONFIG.buildType === 'REDIS_STACK') {
                return;
            }
            const settings = await this.settingsService.getAppSettings('1');
            if (settings.agreements) {
                return;
            }
            if ((await this.databaseService.list()).length) {
                return;
            }
            await this.discoverDatabases();
        }
        catch (e) {
            this.logger.warn('Unable to discover redis database', e);
        }
    }
    async discoverDatabases() {
        const endpoints = await (0, autodiscovery_util_1.getAvailableEndpoints)();
        await Promise.race([
            Promise.all(endpoints.map(this.addRedisDatabase.bind(this))),
            new Promise((resolve) => setTimeout(resolve, 1000)),
        ]);
    }
    async addRedisDatabase(endpoint) {
        var _a;
        try {
            const client = await this.redisClientFactory.createClient({
                context: models_1.ClientContext.Common,
            }, endpoint, { useRetry: false, connectionName: 'redisinsight-auto-discovery' });
            const info = (0, utils_1.convertRedisInfoReplyToObject)(await client.sendCommand(['info'], { replyEncoding: 'utf8' }));
            if (((_a = info === null || info === void 0 ? void 0 : info.server) === null || _a === void 0 ? void 0 : _a.redis_mode) === 'standalone') {
                await this.databaseService.create({
                    name: `${endpoint.host}:${endpoint.port}`,
                    ...endpoint,
                });
            }
        }
        catch (e) {
        }
    }
};
AutodiscoveryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [settings_service_1.SettingsService,
        redis_client_factory_1.RedisClientFactory,
        database_service_1.DatabaseService])
], AutodiscoveryService);
exports.AutodiscoveryService = AutodiscoveryService;
