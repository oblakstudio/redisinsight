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
exports.KeytarEncryptionStrategy = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const models_1 = require("../models");
const exceptions_1 = require("../exceptions");
const config_1 = require("../../../utils/config");
const SERVICE = 'redisinsight';
const ACCOUNT = 'app';
const ALGORITHM = 'aes-256-cbc';
const SERVER_CONFIG = config_1.default.get('server');
let KeytarEncryptionStrategy = class KeytarEncryptionStrategy {
    constructor() {
        this.logger = new common_1.Logger('KeytarEncryptionStrategy');
        try {
            this.keytar = require('keytar');
        }
        catch (e) {
            this.logger.error('Failed to initialize keytar module', e);
        }
    }
    generatePassword() {
        return SERVER_CONFIG.secretStoragePassword || (0, crypto_1.randomBytes)(20).toString('base64');
    }
    async getPassword() {
        try {
            return await this.keytar.getPassword(SERVICE, ACCOUNT);
        }
        catch (error) {
            this.logger.error('Unable to get password');
            throw new exceptions_1.KeytarUnavailableException();
        }
    }
    async setPassword(password) {
        try {
            await this.keytar.setPassword(SERVICE, ACCOUNT, password);
        }
        catch (error) {
            this.logger.error('Unable to set password');
            throw new exceptions_1.KeytarUnavailableException();
        }
    }
    async getCipherKey() {
        if (!this.cipherKey) {
            let password = await this.getPassword();
            if (!password) {
                await this.setPassword(this.generatePassword());
                password = await this.getPassword();
            }
            this.cipherKey = await (0, crypto_1.createHash)('sha256')
                .update(password, 'utf8')
                .digest();
        }
        return this.cipherKey;
    }
    async isAvailable() {
        try {
            await this.keytar.getPassword(SERVICE, ACCOUNT);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async encrypt(data) {
        const cipherKey = await this.getCipherKey();
        try {
            const cipher = (0, crypto_1.createCipheriv)(ALGORITHM, cipherKey, Buffer.alloc(16, 0));
            let encrypted = cipher.update(data, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return {
                encryption: models_1.EncryptionStrategy.KEYTAR,
                data: encrypted,
            };
        }
        catch (error) {
            this.logger.error('Unable to encrypt data', error);
            throw new exceptions_1.KeytarEncryptionErrorException();
        }
    }
    async decrypt(data, encryptedWith) {
        if (encryptedWith !== models_1.EncryptionStrategy.KEYTAR) {
            return null;
        }
        const cipherKey = await this.getCipherKey();
        try {
            const decipher = (0, crypto_1.createDecipheriv)(ALGORITHM, cipherKey, Buffer.alloc(16, 0));
            let decrypted = decipher.update(data, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        }
        catch (error) {
            this.logger.error('Unable to decrypt data', error);
            throw new exceptions_1.KeytarDecryptionErrorException();
        }
    }
};
KeytarEncryptionStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KeytarEncryptionStrategy);
exports.KeytarEncryptionStrategy = KeytarEncryptionStrategy;
