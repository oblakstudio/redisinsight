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
exports.MeCloudAutodiscoveryService = void 0;
const common_1 = require("@nestjs/common");
const models_1 = require("./models");
const utils_1 = require("../../../common/utils");
const cloud_autodiscovery_service_1 = require("./cloud-autodiscovery.service");
const cloud_capi_key_service_1 = require("../capi-key/cloud-capi-key.service");
let MeCloudAutodiscoveryService = class MeCloudAutodiscoveryService {
    constructor(cloudAutodiscoveryService, cloudCapiKeyService) {
        this.cloudAutodiscoveryService = cloudAutodiscoveryService;
        this.cloudCapiKeyService = cloudCapiKeyService;
    }
    async getCapiCredentials(sessionMetadata, utm) {
        return this.cloudCapiKeyService.getCapiCredentials(sessionMetadata, utm);
    }
    async getAccount(sessionMetadata, utm) {
        try {
            return await this.cloudAutodiscoveryService.getAccount(await this.getCapiCredentials(sessionMetadata, utm));
        }
        catch (e) {
            throw (0, utils_1.wrapHttpError)(await this.cloudCapiKeyService.handleCapiKeyUnauthorizedError(e, sessionMetadata));
        }
    }
    async discoverSubscriptions(sessionMetadata, utm) {
        try {
            return await this.cloudAutodiscoveryService.discoverSubscriptions(await this.getCapiCredentials(sessionMetadata, utm), models_1.CloudAutodiscoveryAuthType.Sso);
        }
        catch (e) {
            throw (0, utils_1.wrapHttpError)(await this.cloudCapiKeyService.handleCapiKeyUnauthorizedError(e, sessionMetadata));
        }
    }
    async discoverDatabases(sessionMetadata, dto, utm) {
        try {
            return await this.cloudAutodiscoveryService.discoverDatabases(await this.getCapiCredentials(sessionMetadata, utm), dto, models_1.CloudAutodiscoveryAuthType.Sso);
        }
        catch (e) {
            throw (0, utils_1.wrapHttpError)(await this.cloudCapiKeyService.handleCapiKeyUnauthorizedError(e, sessionMetadata));
        }
    }
    async addRedisCloudDatabases(sessionMetadata, addDatabasesDto, utm) {
        try {
            return await this.cloudAutodiscoveryService.addRedisCloudDatabases(await this.getCapiCredentials(sessionMetadata, utm), addDatabasesDto);
        }
        catch (e) {
            throw (0, utils_1.wrapHttpError)(await this.cloudCapiKeyService.handleCapiKeyUnauthorizedError(e, sessionMetadata));
        }
    }
};
MeCloudAutodiscoveryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloud_autodiscovery_service_1.CloudAutodiscoveryService,
        cloud_capi_key_service_1.CloudCapiKeyService])
], MeCloudAutodiscoveryService);
exports.MeCloudAutodiscoveryService = MeCloudAutodiscoveryService;
