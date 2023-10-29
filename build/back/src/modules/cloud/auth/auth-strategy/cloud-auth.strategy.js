"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudAuthStrategy = void 0;
const common_1 = require("@nestjs/common");
const cloud_auth_request_1 = require("../models/cloud-auth-request");
const okta_auth_js_1 = require("@okta/okta-auth-js");
const class_transformer_1 = require("class-transformer");
let CloudAuthStrategy = class CloudAuthStrategy {
    async generateAuthRequest(sessionMetadata) {
        const authClient = new okta_auth_js_1.OktaAuth(this.config);
        const tokenParams = await authClient.token.prepareTokenParams(this.config);
        return (0, class_transformer_1.plainToClass)(cloud_auth_request_1.CloudAuthRequest, {
            ...this.config,
            ...tokenParams,
            sessionMetadata,
            createdAt: new Date(),
        });
    }
    static generateAuthUrl(authRequest) {
        const url = new URL(authRequest.authorizeUrl, authRequest.issuer);
        url.searchParams.append('client_id', authRequest.clientId);
        url.searchParams.append('redirect_uri', authRequest.redirectUri);
        url.searchParams.append('response_type', authRequest.responseType);
        url.searchParams.append('response_mode', authRequest.responseMode);
        url.searchParams.append('idp', authRequest.idp);
        url.searchParams.append('state', authRequest.state);
        url.searchParams.append('nonce', authRequest.nonce);
        url.searchParams.append('code_challenge_method', authRequest.codeChallengeMethod);
        url.searchParams.append('code_challenge', authRequest.codeChallenge);
        url.searchParams.append('scope', authRequest.scopes.join(' '));
        return url;
    }
    static generateExchangeCodeUrl(authRequest, code) {
        const url = new URL(authRequest.tokenUrl, authRequest.issuer);
        url.searchParams.append('client_id', authRequest.clientId);
        url.searchParams.append('grant_type', 'authorization_code');
        url.searchParams.append('code', code);
        url.searchParams.append('code_verifier', authRequest.codeVerifier);
        url.searchParams.append('redirect_uri', authRequest.redirectUri);
        url.searchParams.append('state', authRequest.state);
        url.searchParams.append('nonce', authRequest.nonce);
        url.searchParams.append('idp', authRequest.idp);
        return url;
    }
};
CloudAuthStrategy = __decorate([
    (0, common_1.Injectable)()
], CloudAuthStrategy);
exports.CloudAuthStrategy = CloudAuthStrategy;
