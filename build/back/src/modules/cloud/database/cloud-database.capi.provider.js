"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudDatabaseCapiProvider = void 0;
const common_1 = require("@nestjs/common");
const cloud_capi_provider_1 = require("../common/providers/cloud.capi.provider");
const exceptions_1 = require("../common/exceptions");
let CloudDatabaseCapiProvider = class CloudDatabaseCapiProvider extends cloud_capi_provider_1.CloudCapiProvider {
    async getDatabase(credentials, dto) {
        try {
            const { subscriptionId, databaseId, subscriptionType } = dto;
            const { data } = await this.api.get(`${cloud_capi_provider_1.CloudCapiProvider.getPrefix(subscriptionType)}/subscriptions/${subscriptionId}/databases/${databaseId}`, cloud_capi_provider_1.CloudCapiProvider.getHeaders(credentials));
            return data;
        }
        catch (e) {
            throw (0, exceptions_1.wrapCloudCapiError)(e);
        }
    }
    async getDatabases(credentials, dto) {
        try {
            const { subscriptionId, subscriptionType } = dto;
            const { data } = await this.api.get(`${cloud_capi_provider_1.CloudCapiProvider.getPrefix(subscriptionType)}/subscriptions/${subscriptionId}/databases`, cloud_capi_provider_1.CloudCapiProvider.getHeaders(credentials));
            return data;
        }
        catch (e) {
            throw (0, exceptions_1.wrapCloudCapiError)(e);
        }
    }
    async createFreeDatabase(credentials, dto) {
        try {
            const { subscriptionId, subscriptionType, ...createDto } = dto;
            const { data } = await this.api.post(`${cloud_capi_provider_1.CloudCapiProvider.getPrefix(subscriptionType)}/subscriptions/${subscriptionId}/databases`, createDto, cloud_capi_provider_1.CloudCapiProvider.getHeaders(credentials));
            return data;
        }
        catch (e) {
            throw (0, exceptions_1.wrapCloudCapiError)(e);
        }
    }
};
CloudDatabaseCapiProvider = __decorate([
    (0, common_1.Injectable)()
], CloudDatabaseCapiProvider);
exports.CloudDatabaseCapiProvider = CloudDatabaseCapiProvider;
