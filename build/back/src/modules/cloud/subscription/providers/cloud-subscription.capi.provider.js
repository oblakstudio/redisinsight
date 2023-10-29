"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudSubscriptionCapiProvider = void 0;
const common_1 = require("@nestjs/common");
const models_1 = require("../models");
const exceptions_1 = require("../../common/exceptions");
const cloud_capi_provider_1 = require("../../common/providers/cloud.capi.provider");
let CloudSubscriptionCapiProvider = class CloudSubscriptionCapiProvider extends cloud_capi_provider_1.CloudCapiProvider {
    async getSubscriptionsByType(credentials, type) {
        try {
            const { data } = await this.api.get(`${cloud_capi_provider_1.CloudCapiProvider.getPrefix(type)}/subscriptions`, cloud_capi_provider_1.CloudCapiProvider.getHeaders(credentials));
            return data === null || data === void 0 ? void 0 : data.subscriptions;
        }
        catch (error) {
            throw (0, exceptions_1.wrapCloudCapiError)(error);
        }
    }
    async getSubscriptionByType(credentials, id, type) {
        try {
            const { data } = await this.api.get(`${cloud_capi_provider_1.CloudCapiProvider.getPrefix(type)}/subscriptions/${id}`, cloud_capi_provider_1.CloudCapiProvider.getHeaders(credentials));
            return data;
        }
        catch (error) {
            throw (0, exceptions_1.wrapCloudCapiError)(error);
        }
    }
    async getSubscriptionsPlansByType(credentials, type) {
        try {
            const { data } = await this.api.get(`${cloud_capi_provider_1.CloudCapiProvider.getPrefix(type)}/plans`, cloud_capi_provider_1.CloudCapiProvider.getHeaders(credentials));
            return data === null || data === void 0 ? void 0 : data.plans;
        }
        catch (error) {
            throw (0, exceptions_1.wrapCloudCapiError)(error);
        }
    }
    async createFreeSubscription(credentials, dto) {
        try {
            const { data } = await this.api.post(`${cloud_capi_provider_1.CloudCapiProvider.getPrefix(models_1.CloudSubscriptionType.Fixed)}/subscriptions`, {
                name: dto.name,
                planId: dto.planId,
                paymentMethodId: null,
            }, cloud_capi_provider_1.CloudCapiProvider.getHeaders(credentials));
            return data;
        }
        catch (error) {
            throw (0, exceptions_1.wrapCloudCapiError)(error);
        }
    }
};
CloudSubscriptionCapiProvider = __decorate([
    (0, common_1.Injectable)()
], CloudSubscriptionCapiProvider);
exports.CloudSubscriptionCapiProvider = CloudSubscriptionCapiProvider;
