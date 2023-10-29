"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudUserApiProvider = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../../common/exceptions");
const cloud_api_provider_1 = require("../../common/providers/cloud.api.provider");
let CloudUserApiProvider = class CloudUserApiProvider extends cloud_api_provider_1.CloudApiProvider {
    async getCsrfToken(credentials) {
        var _a;
        try {
            const { data } = await this.api.get('csrf', cloud_api_provider_1.CloudApiProvider.getHeaders(credentials));
            return (_a = data === null || data === void 0 ? void 0 : data.csrfToken) === null || _a === void 0 ? void 0 : _a.csrf_token;
        }
        catch (e) {
            throw (0, exceptions_1.wrapCloudApiError)(e);
        }
    }
    async getApiSessionId(credentials, utm) {
        var _a, _b;
        try {
            const { headers } = await this.api.post('login', {
                ...cloud_api_provider_1.CloudApiProvider.generateUtmBody(utm),
            }, {
                ...cloud_api_provider_1.CloudApiProvider.getHeaders(credentials),
            });
            return (_b = (_a = (0, lodash_1.get)(headers, 'set-cookie', []).find((header) => header.indexOf('JSESSIONID=') > -1)) === null || _a === void 0 ? void 0 : _a.match(/JSESSIONID=([^;]+)/)) === null || _b === void 0 ? void 0 : _b[1];
        }
        catch (e) {
            throw (0, exceptions_1.wrapCloudApiError)(e);
        }
    }
    async getCurrentUser(credentials) {
        try {
            const { data } = await this.api.get('/users/me', cloud_api_provider_1.CloudApiProvider.getHeaders(credentials));
            return data;
        }
        catch (e) {
            throw (0, exceptions_1.wrapCloudApiError)(e);
        }
    }
    async getAccounts(credentials) {
        try {
            const { data } = await this.api.get('/accounts', cloud_api_provider_1.CloudApiProvider.getHeaders(credentials));
            return data === null || data === void 0 ? void 0 : data.accounts;
        }
        catch (e) {
            throw (0, exceptions_1.wrapCloudApiError)(e);
        }
    }
    async setCurrentAccount(credentials, accountId) {
        try {
            await this.api.post(`/accounts/setcurrent/${accountId}`, {}, cloud_api_provider_1.CloudApiProvider.getHeaders(credentials));
        }
        catch (e) {
            throw (0, exceptions_1.wrapCloudApiError)(e);
        }
    }
};
CloudUserApiProvider = __decorate([
    (0, common_1.Injectable)()
], CloudUserApiProvider);
exports.CloudUserApiProvider = CloudUserApiProvider;
