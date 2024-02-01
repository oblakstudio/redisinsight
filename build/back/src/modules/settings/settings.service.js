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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const AGREEMENTS_SPEC = require("../../constants/agreements-spec.json");
const config_1 = require("../../utils/config");
const constants_1 = require("../../constants");
const keytar_encryption_strategy_1 = require("../encryption/strategies/keytar-encryption.strategy");
const key_encryption_strategy_1 = require("../encryption/strategies/key-encryption.strategy");
const settings_analytics_1 = require("./settings.analytics");
const settings_repository_1 = require("./repositories/settings.repository");
const utils_1 = require("../../utils");
const agreements_repository_1 = require("./repositories/agreements.repository");
const constants_2 = require("../feature/constants");
const event_emitter_1 = require("@nestjs/event-emitter");
const settings_dto_1 = require("./dto/settings.dto");
const SERVER_CONFIG = config_1.default.get('server');
let SettingsService = class SettingsService {
    constructor(settingsRepository, agreementRepository, analytics, keytarEncryptionStrategy, keyEncryptionStrategy, eventEmitter) {
        this.settingsRepository = settingsRepository;
        this.agreementRepository = agreementRepository;
        this.analytics = analytics;
        this.keytarEncryptionStrategy = keytarEncryptionStrategy;
        this.keyEncryptionStrategy = keyEncryptionStrategy;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger('SettingsService');
    }
    async getAppSettings(userId) {
        this.logger.log('Getting application settings.');
        try {
            const agreements = await this.agreementRepository.getOrCreate(userId);
            const settings = await this.settingsRepository.getOrCreate(userId);
            this.logger.log('Succeed to get application settings.');
            return (0, utils_1.classToClass)(settings_dto_1.GetAppSettingsResponse, {
                ...settings === null || settings === void 0 ? void 0 : settings.data,
                agreements: (agreements === null || agreements === void 0 ? void 0 : agreements.version) ? {
                    ...agreements === null || agreements === void 0 ? void 0 : agreements.data,
                    version: agreements === null || agreements === void 0 ? void 0 : agreements.version,
                } : null,
            });
        }
        catch (error) {
            this.logger.error('Failed to get application settings.', error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateAppSettings(userId, dto) {
        this.logger.log('Updating application settings.');
        const { agreements, ...settings } = dto;
        try {
            const oldAppSettings = await this.getAppSettings(userId);
            if (!(0, lodash_1.isEmpty)(settings)) {
                const model = await this.settingsRepository.getOrCreate(userId);
                const toUpdate = {
                    ...model,
                    data: {
                        ...model === null || model === void 0 ? void 0 : model.data,
                        ...settings,
                    },
                };
                await this.settingsRepository.update(userId, toUpdate);
            }
            if (agreements) {
                await this.updateAgreements(userId, agreements);
            }
            this.logger.log('Succeed to update application settings.');
            const results = await this.getAppSettings(userId);
            this.analytics.sendSettingsUpdatedEvent(results, oldAppSettings);
            this.eventEmitter.emit(constants_2.FeatureServerEvents.FeaturesRecalculate);
            return results;
        }
        catch (error) {
            this.logger.error('Failed to update application settings.', error);
            if (error instanceof constants_1.AgreementIsNotDefinedException
                || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getAgreementsOption(checker, defaultOption) {
        try {
            if (checker === 'KEYTAR') {
                const isEncryptionAvailable = await this.keyEncryptionStrategy.isAvailable()
                    || await this.keytarEncryptionStrategy.isAvailable();
                if (!isEncryptionAvailable && SERVER_CONFIG.buildType === 'REDIS_STACK') {
                    return 'stack_false';
                }
                return `${isEncryptionAvailable}`;
            }
        }
        catch (e) {
            this.logger.error(`Unable to proceed agreements checker ${checker}`);
        }
        return defaultOption;
    }
    async getAgreementsSpec() {
        const agreementsSpec = (0, lodash_1.cloneDeep)(AGREEMENTS_SPEC);
        await Promise.all((0, lodash_1.map)(agreementsSpec.agreements, async (agreement, name) => {
            if (agreement.conditional) {
                const option = await this.getAgreementsOption(agreement.checker, agreement.defaultOption);
                agreementsSpec.agreements[name] = agreement.options[option];
            }
        }));
        return agreementsSpec;
    }
    async updateAgreements(userId, dtoAgreements = new Map()) {
        this.logger.log('Updating application agreements.');
        const oldAgreements = await this.agreementRepository.getOrCreate(userId);
        const newAgreements = {
            ...oldAgreements,
            version: AGREEMENTS_SPEC.version,
            data: {
                ...oldAgreements.data,
                ...Object.fromEntries(dtoAgreements),
            },
        };
        const diff = (0, lodash_1.difference)(Object.keys(AGREEMENTS_SPEC.agreements), Object.keys(newAgreements.data));
        if (diff.length) {
            const messages = diff.map((item) => `agreements.${item} should not be null or undefined`);
            throw new constants_1.AgreementIsNotDefinedException(messages);
        }
        await this.agreementRepository.update(userId, newAgreements);
        if (dtoAgreements.has('analytics')) {
            this.analytics.sendAnalyticsAgreementChange(dtoAgreements, new Map(Object.entries(oldAgreements.data || {})));
        }
    }
};
SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [settings_repository_1.SettingsRepository,
        agreements_repository_1.AgreementsRepository,
        settings_analytics_1.SettingsAnalytics,
        keytar_encryption_strategy_1.KeytarEncryptionStrategy,
        key_encryption_strategy_1.KeyEncryptionStrategy,
        event_emitter_1.EventEmitter2])
], SettingsService);
exports.SettingsService = SettingsService;
