"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SettingsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsModule = void 0;
const common_1 = require("@nestjs/common");
const settings_service_1 = require("./settings.service");
const settings_controller_1 = require("./settings.controller");
const settings_analytics_1 = require("./settings.analytics");
const settings_repository_1 = require("./repositories/settings.repository");
const local_settings_repository_1 = require("./repositories/local.settings.repository");
const agreements_repository_1 = require("./repositories/agreements.repository");
const local_agreements_repository_1 = require("./repositories/local.agreements.repository");
let SettingsModule = SettingsModule_1 = class SettingsModule {
    static register(settingsRepository = local_settings_repository_1.LocalSettingsRepository, agreementsRepository = local_agreements_repository_1.LocalAgreementsRepository) {
        return {
            module: SettingsModule_1,
            controllers: [
                settings_controller_1.SettingsController,
            ],
            providers: [
                settings_service_1.SettingsService,
                settings_analytics_1.SettingsAnalytics,
                {
                    provide: settings_repository_1.SettingsRepository,
                    useClass: settingsRepository,
                },
                {
                    provide: agreements_repository_1.AgreementsRepository,
                    useClass: agreementsRepository,
                },
            ],
            exports: [
                settings_service_1.SettingsService,
            ],
        };
    }
};
SettingsModule = SettingsModule_1 = __decorate([
    (0, common_1.Module)({})
], SettingsModule);
exports.SettingsModule = SettingsModule;
