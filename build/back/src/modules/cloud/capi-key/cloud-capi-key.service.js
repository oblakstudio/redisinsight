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
exports.CloudCapiKeyService = void 0;
const cloud_capi_key_repository_1 = require("./repository/cloud-capi-key.repository");
const model_1 = require("./model");
const utils_1 = require("../../../common/utils");
const common_1 = require("@nestjs/common");
const cloud_user_api_service_1 = require("../user/cloud-user.api.service");
const exceptions_1 = require("../common/exceptions");
const cloud_session_service_1 = require("../session/cloud-session.service");
const cloud_capi_key_api_provider_1 = require("./cloud-capi-key.api.provider");
const server_service_1 = require("../../server/server.service");
const class_transformer_1 = require("class-transformer");
const exceptions_2 = require("./exceptions");
const cloud_capi_key_analytics_1 = require("./cloud-capi-key.analytics");
let CloudCapiKeyService = class CloudCapiKeyService {
    constructor(api, repository, cloudUserApiService, cloudSessionService, serverService, analytics) {
        this.api = api;
        this.repository = repository;
        this.cloudUserApiService = cloudUserApiService;
        this.cloudSessionService = cloudSessionService;
        this.serverService = serverService;
        this.analytics = analytics;
        this.logger = new common_1.Logger('CloudCapiKeyService');
    }
    async generateName(capiKey) {
        var _a;
        const serverInfo = await this.serverService.getInfo();
        return `RedisInsight-${serverInfo.id.substring(0, 13)}-${(_a = capiKey === null || capiKey === void 0 ? void 0 : capiKey.createdAt) === null || _a === void 0 ? void 0 : _a.getTime()}`;
    }
    async ensureCapiKeys(sessionMetadata, utm) {
        var _a;
        try {
            let user = await this.cloudUserApiService.me(sessionMetadata, false, utm);
            if ((_a = user === null || user === void 0 ? void 0 : user.capiKey) === null || _a === void 0 ? void 0 : _a.id) {
                return user.capiKey;
            }
            let currentAccount = cloud_user_api_service_1.CloudUserApiService.getCurrentAccount(user);
            if (!currentAccount) {
                throw new exceptions_1.CloudApiBadRequestException('No active account');
            }
            let capiKey = await this.repository.getByUserAccount(sessionMetadata.userId, user.id, user.currentAccountId);
            if (!capiKey) {
                try {
                    const session = await this.cloudSessionService.getSession(sessionMetadata.sessionId);
                    if (!(currentAccount === null || currentAccount === void 0 ? void 0 : currentAccount.capiKey)) {
                        this.logger.log('Trying to enable capi');
                        await this.api.enableCapi(session);
                        this.logger.log('Successfully enabled capi');
                        user = await this.cloudUserApiService.me(sessionMetadata, true, utm);
                        currentAccount = cloud_user_api_service_1.CloudUserApiService.getCurrentAccount(user);
                    }
                    this.logger.log('Creating new capi key');
                    capiKey = {
                        userId: sessionMetadata.userId,
                        cloudUserId: user.id,
                        cloudAccountId: user.currentAccountId,
                        capiKey: currentAccount === null || currentAccount === void 0 ? void 0 : currentAccount.capiKey,
                        createdAt: new Date(),
                    };
                    capiKey.name = await this.generateName(capiKey);
                    capiKey = await this.repository.create((0, class_transformer_1.plainToClass)(model_1.CloudCapiKey, capiKey));
                    const capiSecret = await this.api.createCapiKey(session, user.id, capiKey.name);
                    capiKey = await this.repository.update(capiKey.id, { capiSecret: capiSecret.secret_key });
                    this.analytics.sendCloudAccountKeyGenerated();
                }
                catch (e) {
                    this.analytics.sendCloudAccountKeyGenerationFailed(e);
                    throw e;
                }
            }
            else if (capiKey.valid === false) {
                return Promise.reject(new exceptions_2.CloudCapiKeyUnauthorizedException(undefined, { resourceId: capiKey.id }));
            }
            await this.cloudUserApiService.updateUser(sessionMetadata, {
                capiKey,
                accounts: user.accounts,
            });
            return capiKey;
        }
        catch (e) {
            this.logger.error('Unable to generate capi keys', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async getCapiCredentials(sessionMetadata, utm) {
        const capiKey = await this.ensureCapiKeys(sessionMetadata, utm);
        await this.repository.update(capiKey.id, { lastUsed: new Date() });
        return capiKey;
    }
    async get(id) {
        try {
            this.logger.log('Getting capi key by id');
            const model = await this.repository.get(id);
            if (!model) {
                return Promise.reject(new exceptions_2.CloudCapiKeyNotFoundException());
            }
            return model;
        }
        catch (e) {
            this.logger.log('Unable to get capi key by id', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async getByUserAccount(sessionMetadata, cloudUserId, cloudAccountId) {
        try {
            this.logger.log('Getting user\'s capi key by cloud user and cloud account');
            const model = await this.repository.getByUserAccount(sessionMetadata.userId, cloudUserId, cloudAccountId);
            if (!model) {
                throw new exceptions_2.CloudCapiKeyNotFoundException();
            }
            return model;
        }
        catch (e) {
            this.logger.error('Unable to get user\'s capi key by cloud user and cloud account', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async list(sessionMetadata) {
        try {
            this.logger.log('Getting list of local capi keys');
            return await this.repository.list(sessionMetadata.userId);
        }
        catch (e) {
            this.logger.error('Unable to get list of local capi keys', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async delete(sessionMetadata, id) {
        try {
            this.logger.log('Removing capi key');
            await this.repository.delete(sessionMetadata.userId, id);
        }
        catch (e) {
            this.logger.error('Unable to remove capi key', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async deleteAll(sessionMetadata) {
        try {
            this.logger.log('Removing all capi keys');
            await this.repository.deleteAll(sessionMetadata.userId);
        }
        catch (e) {
            this.logger.error('Unable to remove all capi keys', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async handleCapiKeyUnauthorizedError(e, sessionMetadata) {
        var _a, _b, _c, _d;
        try {
            if (e instanceof exceptions_1.CloudCapiUnauthorizedException) {
                const cloudSession = await this.cloudSessionService.getSession(sessionMetadata.sessionId);
                if ((_b = (_a = cloudSession.user) === null || _a === void 0 ? void 0 : _a.capiKey) === null || _b === void 0 ? void 0 : _b.id) {
                    await this.repository.update(cloudSession.user.capiKey.id, { valid: false });
                    await this.cloudUserApiService.updateUser(sessionMetadata, { capiKey: null });
                    return new exceptions_2.CloudCapiKeyUnauthorizedException(undefined, { resourceId: (_d = (_c = cloudSession.user) === null || _c === void 0 ? void 0 : _c.capiKey) === null || _d === void 0 ? void 0 : _d.id });
                }
            }
        }
        catch (error) {
        }
        return e;
    }
};
CloudCapiKeyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloud_capi_key_api_provider_1.CloudCapiKeyApiProvider,
        cloud_capi_key_repository_1.CloudCapiKeyRepository,
        cloud_user_api_service_1.CloudUserApiService,
        cloud_session_service_1.CloudSessionService,
        server_service_1.ServerService,
        cloud_capi_key_analytics_1.CloudCapiKeyAnalytics])
], CloudCapiKeyService);
exports.CloudCapiKeyService = CloudCapiKeyService;
