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
exports.CloudUserApiService = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const cloud_user_repository_1 = require("./repositories/cloud-user.repository");
const cloud_session_service_1 = require("../session/cloud-session.service");
const utils_1 = require("../../../common/utils");
const exceptions_1 = require("../common/exceptions");
const cloud_user_api_provider_1 = require("./providers/cloud-user.api.provider");
let CloudUserApiService = class CloudUserApiService {
    constructor(repository, sessionService, api) {
        this.repository = repository;
        this.sessionService = sessionService;
        this.api = api;
        this.logger = new common_1.Logger('CloudUserApiService');
    }
    static getCurrentAccount(user) {
        return (0, lodash_1.find)(user === null || user === void 0 ? void 0 : user.accounts, { id: user === null || user === void 0 ? void 0 : user.currentAccountId });
    }
    async ensureCsrf(sessionMetadata) {
        try {
            const session = await this.sessionService.getSession(sessionMetadata.sessionId);
            if (!(session === null || session === void 0 ? void 0 : session.csrf)) {
                this.logger.log('Trying to get csrf token');
                const csrf = await this.api.getCsrfToken(session);
                if (!csrf) {
                    throw new exceptions_1.CloudApiUnauthorizedException();
                }
                await this.sessionService.updateSessionData(sessionMetadata.sessionId, { csrf });
            }
        }
        catch (e) {
            this.logger.error('Unable to get csrf token', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async ensureLogin(sessionMetadata, utm) {
        try {
            const session = await this.sessionService.getSession(sessionMetadata.sessionId);
            if (!(session === null || session === void 0 ? void 0 : session.apiSessionId)) {
                this.logger.log('Trying to login user');
                const apiSessionId = await this.api.getApiSessionId(session, utm);
                if (!apiSessionId) {
                    throw new exceptions_1.CloudApiUnauthorizedException();
                }
                await this.sessionService.updateSessionData(sessionMetadata.sessionId, { apiSessionId });
            }
            await this.ensureCsrf(sessionMetadata);
        }
        catch (e) {
            this.logger.error('Unable to login user', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async ensureCloudUser(sessionMetadata, force = false, utm) {
        var _a;
        try {
            await this.ensureLogin(sessionMetadata, utm);
            const session = await this.sessionService.getSession(sessionMetadata.sessionId);
            const existingUser = await this.repository.get(sessionMetadata.sessionId);
            if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.id) && !force) {
                return;
            }
            this.logger.log('Trying to sync user profile');
            const userData = await this.api.getCurrentUser(session);
            const user = {
                id: +(userData === null || userData === void 0 ? void 0 : userData.id),
                name: userData === null || userData === void 0 ? void 0 : userData.name,
                currentAccountId: +(userData === null || userData === void 0 ? void 0 : userData.current_account_id),
            };
            const accounts = await this.api.getAccounts(session);
            user.accounts = (_a = accounts === null || accounts === void 0 ? void 0 : accounts.map) === null || _a === void 0 ? void 0 : _a.call(accounts, (account) => ({
                id: account.id,
                name: account.name,
                capiKey: account === null || account === void 0 ? void 0 : account.api_access_key,
            }));
            await this.repository.update(sessionMetadata.sessionId, user);
            this.logger.log('Successfully synchronized user profile');
        }
        catch (e) {
            this.logger.error('Unable to sync user profile', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async me(sessionMetadata, forceSync = false, utm) {
        try {
            await this.ensureCloudUser(sessionMetadata, forceSync, utm);
            return await this.repository.get(sessionMetadata.sessionId);
        }
        catch (e) {
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async setCurrentAccount(sessionMetadata, accountId) {
        try {
            this.logger.log('Switching user account');
            const session = await this.sessionService.getSession(sessionMetadata.sessionId);
            await this.api.setCurrentAccount(session, +accountId);
            return this.me(sessionMetadata, true);
        }
        catch (e) {
            this.logger.error('Unable to switch current account', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async updateUser(sessionMetadata, data) {
        return this.repository.update(sessionMetadata.sessionId, data);
    }
};
CloudUserApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloud_user_repository_1.CloudUserRepository,
        cloud_session_service_1.CloudSessionService,
        cloud_user_api_provider_1.CloudUserApiProvider])
], CloudUserApiService);
exports.CloudUserApiService = CloudUserApiService;
