"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EncryptionModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionModule = void 0;
const common_1 = require("@nestjs/common");
const plain_encryption_strategy_1 = require("./strategies/plain-encryption.strategy");
const keytar_encryption_strategy_1 = require("./strategies/keytar-encryption.strategy");
const encryption_service_1 = require("./encryption.service");
const key_encryption_strategy_1 = require("./strategies/key-encryption.strategy");
let EncryptionModule = EncryptionModule_1 = class EncryptionModule {
    static register() {
        return {
            module: EncryptionModule_1,
            providers: [
                plain_encryption_strategy_1.PlainEncryptionStrategy,
                keytar_encryption_strategy_1.KeytarEncryptionStrategy,
                key_encryption_strategy_1.KeyEncryptionStrategy,
                encryption_service_1.EncryptionService,
            ],
            exports: [
                encryption_service_1.EncryptionService,
                plain_encryption_strategy_1.PlainEncryptionStrategy,
                keytar_encryption_strategy_1.KeytarEncryptionStrategy,
                key_encryption_strategy_1.KeyEncryptionStrategy,
            ],
        };
    }
};
EncryptionModule = EncryptionModule_1 = __decorate([
    (0, common_1.Module)({})
], EncryptionModule);
exports.EncryptionModule = EncryptionModule;
