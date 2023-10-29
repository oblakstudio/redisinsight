"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudCapiKeyApiProvider = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../common/exceptions");
const cloud_api_provider_1 = require("../common/providers/cloud.api.provider");
let CloudCapiKeyApiProvider = class CloudCapiKeyApiProvider extends cloud_api_provider_1.CloudApiProvider {
    async enableCapi(credentials) {
        var _a;
        try {
            const { data } = await this.api.post('/accounts/cloud-api/cloudApiAccessKey', {}, cloud_api_provider_1.CloudApiProvider.getHeaders(credentials));
            return (_a = data === null || data === void 0 ? void 0 : data.cloudApiAccessKey) === null || _a === void 0 ? void 0 : _a.accessKey;
        }
        catch (e) {
            throw (0, exceptions_1.wrapCloudApiError)(e);
        }
    }
    async createCapiKey(credentials, userId, name) {
        try {
            const { data } = await this.api.post('/accounts/cloud-api/cloudApiKeys', {
                cloudApiKey: {
                    name,
                    user_account: userId,
                    ip_whitelist: [],
                },
            }, cloud_api_provider_1.CloudApiProvider.getHeaders(credentials));
            return data === null || data === void 0 ? void 0 : data.cloudApiKey;
        }
        catch (e) {
            throw (0, exceptions_1.wrapCloudApiError)(e);
        }
    }
};
CloudCapiKeyApiProvider = __decorate([
    (0, common_1.Injectable)()
], CloudCapiKeyApiProvider);
exports.CloudCapiKeyApiProvider = CloudCapiKeyApiProvider;
