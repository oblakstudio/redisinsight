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
exports.KeyEncryptionStrategy = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const models_1 = require("../models");
const exceptions_1 = require("../exceptions");
const config_1 = require("../../../utils/config");
const ALGORITHM = 'aes-256-cbc';
const HASH_ALGORITHM = 'sha256';
const SERVER_CONFIG = config_1.default.get('server');
let KeyEncryptionStrategy = class KeyEncryptionStrategy {
    constructor() {
        this.logger = new common_1.Logger('KeyEncryptionStrategy');
        this.key = SERVER_CONFIG.encryptionKey;
    }
    async getCipherKey() {
        if (!this.cipherKey) {
            if (!this.key) {
                throw new exceptions_1.KeyUnavailableException();
            }
            this.cipherKey = (0, crypto_1.createHash)(HASH_ALGORITHM)
                .update(this.key, 'utf8')
                .digest();
        }
        return this.cipherKey;
    }
    async isAvailable() {
        return !!this.key;
    }
    async encrypt(data) {
        const cipherKey = await this.getCipherKey();
        try {
            const cipher = (0, crypto_1.createCipheriv)(ALGORITHM, cipherKey, Buffer.alloc(16, 0));
            let encrypted = cipher.update(data, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return {
                encryption: models_1.EncryptionStrategy.KEY,
                data: encrypted,
            };
        }
        catch (error) {
            this.logger.error('Unable to encrypt data', error);
            throw new exceptions_1.KeyEncryptionErrorException();
        }
    }
    async decrypt(data, encryptedWith) {
        if (encryptedWith !== models_1.EncryptionStrategy.KEY) {
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
            throw new exceptions_1.KeyDecryptionErrorException();
        }
    }
};
KeyEncryptionStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KeyEncryptionStrategy);
exports.KeyEncryptionStrategy = KeyEncryptionStrategy;
