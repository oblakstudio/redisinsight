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
var CloudAuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudAuthService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const google_idp_cloud_auth_strategy_1 = require("./auth-strategy/google-idp.cloud.auth-strategy");
const cloud_auth_request_1 = require("./models/cloud-auth-request");
const cloud_auth_strategy_1 = require("./auth-strategy/cloud-auth.strategy");
const cloud_session_service_1 = require("../session/cloud-session.service");
const github_idp_cloud_auth_strategy_1 = require("./auth-strategy/github-idp.cloud.auth-strategy");
const utils_1 = require("../../../common/utils");
const exceptions_1 = require("./exceptions");
const models_1 = require("./models");
const cloud_auth_analytics_1 = require("./cloud-auth.analytics");
const cloud_sso_feature_flag_1 = require("../cloud-sso.feature.flag");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("../common/constants");
let CloudAuthService = CloudAuthService_1 = class CloudAuthService {
    constructor(sessionService, googleIdpAuthStrategy, githubIdpCloudAuthStrategy, analytics, eventEmitter) {
        this.sessionService = sessionService;
        this.googleIdpAuthStrategy = googleIdpAuthStrategy;
        this.githubIdpCloudAuthStrategy = githubIdpCloudAuthStrategy;
        this.analytics = analytics;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger('CloudAuthService');
        this.authRequests = new Map();
    }
    static getAuthorizationServerRedirectError(query) {
        var _a;
        if (((_a = query === null || query === void 0 ? void 0 : query.error_description) === null || _a === void 0 ? void 0 : _a.indexOf('properties are missing')) > -1) {
            return new exceptions_1.CloudOauthMissedRequiredDataException(query.error_description, {
                description: query.error_description,
            });
        }
        return new exceptions_1.CloudOauthMisconfigurationException(undefined, {
            description: query.error_description,
        });
    }
    getAuthStrategy(strategy) {
        switch (strategy) {
            case cloud_auth_request_1.CloudAuthIdpType.Google:
                return this.googleIdpAuthStrategy;
            case cloud_auth_request_1.CloudAuthIdpType.GitHub:
                return this.githubIdpCloudAuthStrategy;
            default:
                throw new exceptions_1.CloudOauthUnknownAuthorizationRequestException('Unknown cloud auth strategy');
        }
    }
    async getAuthorizationUrl(sessionMetadata, options) {
        const authRequest = await this.getAuthStrategy(options === null || options === void 0 ? void 0 : options.strategy).generateAuthRequest(sessionMetadata);
        authRequest.callback = options === null || options === void 0 ? void 0 : options.callback;
        authRequest.action = options === null || options === void 0 ? void 0 : options.action;
        await this.logout(sessionMetadata);
        this.authRequests.clear();
        this.authRequests.set(authRequest.state, authRequest);
        return cloud_auth_strategy_1.CloudAuthStrategy.generateAuthUrl(authRequest).toString();
    }
    async exchangeCode(authRequest, code) {
        try {
            const tokenUrl = cloud_auth_strategy_1.CloudAuthStrategy.generateExchangeCodeUrl(authRequest, code);
            const { data } = await axios_1.default.post(tokenUrl.toString().split('?')[0], tokenUrl.searchParams, {
                headers: {
                    accept: 'application/json',
                    'cache-control': 'no-cache',
                    'content-type': 'application/x-www-form-urlencoded',
                },
            });
            return data;
        }
        catch (e) {
            this.logger.error('Unable to exchange code', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async getAuthRequestInfo(query) {
        if (!this.authRequests.has(query === null || query === void 0 ? void 0 : query.state)) {
            throw new exceptions_1.CloudOauthUnknownAuthorizationRequestException();
        }
        const authRequest = this.authRequests.get(query.state);
        return {
            idpType: authRequest.idpType,
            action: authRequest.action,
        };
    }
    async callback(query) {
        if (!this.authRequests.has(query === null || query === void 0 ? void 0 : query.state)) {
            throw new exceptions_1.CloudOauthUnknownAuthorizationRequestException();
        }
        if (query === null || query === void 0 ? void 0 : query.error) {
            throw CloudAuthService_1.getAuthorizationServerRedirectError(query);
        }
        const authRequest = this.authRequests.get(query.state);
        this.authRequests.delete(query.state);
        const tokens = await this.exchangeCode(authRequest, query.code);
        await this.sessionService.updateSessionData(authRequest.sessionMetadata.sessionId, {
            accessToken: tokens.access_token,
        });
        return authRequest.callback;
    }
    async handleCallback(query, from = cloud_sso_feature_flag_1.CloudSsoFeatureStrategy.DeepLink) {
        var _a;
        let result = {
            status: models_1.CloudAuthStatus.Succeed,
            message: 'Successfully authenticated',
        };
        let callback;
        let reqInfo;
        try {
            reqInfo = await this.getAuthRequestInfo(query);
            callback = await this.callback(query);
            this.analytics.sendCloudSignInSucceeded(from, reqInfo === null || reqInfo === void 0 ? void 0 : reqInfo.action);
        }
        catch (e) {
            this.logger.error(`Error on ${from} cloud oauth callback`, e);
            this.analytics.sendCloudSignInFailed(e, from, reqInfo === null || reqInfo === void 0 ? void 0 : reqInfo.action);
            result = {
                status: models_1.CloudAuthStatus.Failed,
                error: (0, utils_1.wrapHttpError)(e).getResponse(),
            };
        }
        try {
            (_a = callback === null || callback === void 0 ? void 0 : callback(result)) === null || _a === void 0 ? void 0 : _a.catch((e) => this.logger.error('Async callback failed', e));
        }
        catch (e) {
            this.logger.error('Callback failed', e);
        }
        return result;
    }
    async logout(sessionMetadata) {
        try {
            this.logger.log('Logout cloud user');
            await this.sessionService.deleteSessionData(sessionMetadata.sessionId);
            this.eventEmitter.emit(constants_1.CloudAuthServerEvent.Logout, sessionMetadata);
        }
        catch (e) {
            this.logger.error('Unable to logout', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
};
CloudAuthService = CloudAuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloud_session_service_1.CloudSessionService,
        google_idp_cloud_auth_strategy_1.GoogleIdpCloudAuthStrategy,
        github_idp_cloud_auth_strategy_1.GithubIdpCloudAuthStrategy,
        cloud_auth_analytics_1.CloudAuthAnalytics,
        event_emitter_1.EventEmitter2])
], CloudAuthService);
exports.CloudAuthService = CloudAuthService;
