"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const encryption_module_1 = require("./modules/encryption/encryption.module");
const settings_module_1 = require("./modules/settings/settings.module");
const database_module_1 = require("./modules/database/database.module");
const certificate_module_1 = require("./modules/certificate/certificate.module");
const database_recommendation_module_1 = require("./modules/database-recommendation/database-recommendation.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const redis_module_1 = require("./modules/redis/redis.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const ssh_module_1 = require("./modules/ssh/ssh.module");
const nestjs_form_data_1 = require("nestjs-form-data");
const feature_module_1 = require("./modules/feature/feature.module");
const auth_module_1 = require("./modules/auth/auth.module");
const session_module_1 = require("./modules/session/session.module");
const server_module_1 = require("./modules/server/server.module");
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot(),
            analytics_module_1.AnalyticsModule,
            encryption_module_1.EncryptionModule.register(),
            settings_module_1.SettingsModule.register(),
            certificate_module_1.CertificateModule.register(),
            database_module_1.DatabaseModule.register(),
            redis_module_1.RedisModule,
            database_recommendation_module_1.DatabaseRecommendationModule.register(),
            ssh_module_1.SshModule,
            nestjs_form_data_1.NestjsFormDataModule,
            feature_module_1.FeatureModule.register(),
            auth_module_1.AuthModule.register(),
            session_module_1.SessionModule.register(),
            server_module_1.ServerModule.register(),
        ],
        exports: [
            encryption_module_1.EncryptionModule,
            settings_module_1.SettingsModule,
            certificate_module_1.CertificateModule,
            database_module_1.DatabaseModule,
            database_recommendation_module_1.DatabaseRecommendationModule,
            redis_module_1.RedisModule,
            ssh_module_1.SshModule,
            nestjs_form_data_1.NestjsFormDataModule,
            feature_module_1.FeatureModule,
            session_module_1.SessionModule,
            server_module_1.ServerModule,
        ],
    })
], CoreModule);
exports.CoreModule = CoreModule;
