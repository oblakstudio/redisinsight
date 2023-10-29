"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubIdpCloudAuthStrategy = void 0;
const config_1 = require("../../../../utils/config");
const cloud_auth_strategy_1 = require("./cloud-auth.strategy");
const cloud_auth_request_1 = require("../models/cloud-auth-request");
const { idp: { github: idpConfig } } = config_1.default.get('cloud');
class GithubIdpCloudAuthStrategy extends cloud_auth_strategy_1.CloudAuthStrategy {
    constructor() {
        super();
        this.config = {
            idpType: cloud_auth_request_1.CloudAuthIdpType.GitHub,
            authorizeUrl: idpConfig.authorizeUrl,
            tokenUrl: idpConfig.tokenUrl,
            issuer: idpConfig.issuer,
            clientId: idpConfig.clientId,
            pkce: true,
            redirectUri: idpConfig.redirectUri,
            idp: idpConfig.idp,
            scopes: ['openid', 'email', 'profile'],
            responseMode: 'query',
            responseType: 'code',
            tokenManager: {
                storage: {},
            },
        };
    }
}
exports.GithubIdpCloudAuthStrategy = GithubIdpCloudAuthStrategy;
