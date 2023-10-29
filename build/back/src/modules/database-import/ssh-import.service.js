"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SshImportService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const utils_1 = require("../../common/utils");
const exceptions_1 = require("./exceptions");
let SshImportService = class SshImportService {
    async processSshOptions(data) {
        let sshOptions = {
            host: data.sshHost,
        };
        if ((0, lodash_1.isUndefined)(data.sshPort) || (0, lodash_1.isUndefined)(data.sshUsername)) {
            throw new exceptions_1.InvalidSshBodyException();
        }
        else {
            sshOptions.port = parseInt(data.sshPort, 10);
            sshOptions.username = data.sshUsername;
        }
        if (data.sshPrivateKey) {
            sshOptions.passphrase = data.sshPassphrase || data.sshPassword || null;
            if ((0, utils_1.isValidSshPrivateKey)(data.sshPrivateKey)) {
                sshOptions.privateKey = data.sshPrivateKey;
            }
            else {
                try {
                    sshOptions.privateKey = (0, utils_1.getPemBodyFromFileSync)(data.sshPrivateKey);
                }
                catch (e) {
                    sshOptions = null;
                }
            }
        }
        else {
            sshOptions.password = data.sshPassword || null;
        }
        if (!sshOptions || ((sshOptions === null || sshOptions === void 0 ? void 0 : sshOptions.privateKey) && !(0, utils_1.isValidSshPrivateKey)(sshOptions.privateKey))) {
            throw new exceptions_1.InvalidSshPrivateKeyBodyException();
        }
        if (data.sshAgentPath) {
            throw new exceptions_1.SshAgentsAreNotSupportedException();
        }
        return sshOptions;
    }
};
SshImportService = __decorate([
    (0, common_1.Injectable)()
], SshImportService);
exports.SshImportService = SshImportService;
