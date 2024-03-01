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
exports.RedisConnectionStrategy = void 0;
const ssh_tunnel_provider_1 = require("../../ssh/ssh-tunnel.provider");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../constants");
let RedisConnectionStrategy = class RedisConnectionStrategy {
    constructor(sshTunnelProvider) {
        this.sshTunnelProvider = sshTunnelProvider;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    static generateRedisConnectionName(clientMetadata) {
        var _a, _b;
        try {
            const items = [
                constants_1.CONNECTION_NAME_GLOBAL_PREFIX,
                (clientMetadata === null || clientMetadata === void 0 ? void 0 : clientMetadata.context) || 'custom',
                (_a = clientMetadata === null || clientMetadata === void 0 ? void 0 : clientMetadata.databaseId) === null || _a === void 0 ? void 0 : _a.substring(0, 8),
            ];
            if (clientMetadata === null || clientMetadata === void 0 ? void 0 : clientMetadata.uniqueId) {
                items.push((_b = clientMetadata === null || clientMetadata === void 0 ? void 0 : clientMetadata.uniqueId) === null || _b === void 0 ? void 0 : _b.substring(0, 4));
            }
            return items.join('-').toLowerCase();
        }
        catch (e) {
            return constants_1.CONNECTION_NAME_GLOBAL_PREFIX;
        }
    }
};
RedisConnectionStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ssh_tunnel_provider_1.SshTunnelProvider])
], RedisConnectionStrategy);
exports.RedisConnectionStrategy = RedisConnectionStrategy;
