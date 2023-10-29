"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudSubscriptionApiProvider = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../../common/exceptions");
const cloud_api_provider_1 = require("../../common/providers/cloud.api.provider");
let CloudSubscriptionApiProvider = class CloudSubscriptionApiProvider extends cloud_api_provider_1.CloudApiProvider {
    async getCloudRegions(credentials) {
        try {
            const { data } = await this.api.get('/plans/cloud_regions', cloud_api_provider_1.CloudApiProvider.getHeaders(credentials));
            return data;
        }
        catch (e) {
            throw (0, exceptions_1.wrapCloudApiError)(e);
        }
    }
};
CloudSubscriptionApiProvider = __decorate([
    (0, common_1.Injectable)()
], CloudSubscriptionApiProvider);
exports.CloudSubscriptionApiProvider = CloudSubscriptionApiProvider;
