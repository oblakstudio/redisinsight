"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudUserCapiProvider = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../../common/exceptions");
const cloud_capi_provider_1 = require("../../common/providers/cloud.capi.provider");
let CloudUserCapiProvider = class CloudUserCapiProvider extends cloud_capi_provider_1.CloudCapiProvider {
    async getCurrentAccount(authDto) {
        try {
            const { data } = await this.api.get('/', cloud_capi_provider_1.CloudCapiProvider.getHeaders(authDto));
            return data === null || data === void 0 ? void 0 : data.account;
        }
        catch (e) {
            throw (0, exceptions_1.wrapCloudCapiError)(e);
        }
    }
};
CloudUserCapiProvider = __decorate([
    (0, common_1.Injectable)()
], CloudUserCapiProvider);
exports.CloudUserCapiProvider = CloudUserCapiProvider;
