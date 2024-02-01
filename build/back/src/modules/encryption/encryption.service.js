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
exports.EncryptionService = void 0;
const common_1 = require("@nestjs/common");
const keytar_encryption_strategy_1 = require("./strategies/keytar-encryption.strategy");
const plain_encryption_strategy_1 = require("./strategies/plain-encryption.strategy");
const models_1 = require("./models");
const exceptions_1 = require("./exceptions");
const settings_service_1 = require("../settings/settings.service");
const key_encryption_strategy_1 = require("./strategies/key-encryption.strategy");
let EncryptionService = class EncryptionService {
    constructor(settingsService, keytarEncryptionStrategy, plainEncryptionStrategy, keyEncryptionStrategy) {
        this.settingsService = settingsService;
        this.keytarEncryptionStrategy = keytarEncryptionStrategy;
        this.plainEncryptionStrategy = plainEncryptionStrategy;
        this.keyEncryptionStrategy = keyEncryptionStrategy;
    }
    async getAvailableEncryptionStrategies() {
        const strategies = [
            models_1.EncryptionStrategy.PLAIN,
        ];
        if (await this.keyEncryptionStrategy.isAvailable()) {
            strategies.push(models_1.EncryptionStrategy.KEY);
        }
        else if (await this.keytarEncryptionStrategy.isAvailable()) {
            strategies.push(models_1.EncryptionStrategy.KEYTAR);
        }
        return strategies;
    }
    async getEncryptionStrategy() {
        var _a;
        const settings = await this.settingsService.getAppSettings('1');
        switch ((_a = settings.agreements) === null || _a === void 0 ? void 0 : _a.encryption) {
            case true:
                if (await this.keyEncryptionStrategy.isAvailable()) {
                    return this.keyEncryptionStrategy;
                }
                return this.keytarEncryptionStrategy;
            case false:
                return this.plainEncryptionStrategy;
            default:
                throw new exceptions_1.UnsupportedEncryptionStrategyException();
        }
    }
    async encrypt(data) {
        const strategy = await this.getEncryptionStrategy();
        return strategy.encrypt(data);
    }
    async decrypt(data, encryptedWith) {
        if (!data) {
            return null;
        }
        const strategy = await this.getEncryptionStrategy();
        return strategy.decrypt(data, encryptedWith);
    }
};
EncryptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [settings_service_1.SettingsService,
        keytar_encryption_strategy_1.KeytarEncryptionStrategy,
        plain_encryption_strategy_1.PlainEncryptionStrategy,
        key_encryption_strategy_1.KeyEncryptionStrategy])
], EncryptionService);
exports.EncryptionService = EncryptionService;
