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
exports.CloudUserCapiService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../common/utils");
const utils_2 = require("./utils");
const cloud_user_capi_provider_1 = require("./providers/cloud-user.capi.provider");
let CloudUserCapiService = class CloudUserCapiService {
    constructor(capi) {
        this.capi = capi;
        this.logger = new common_1.Logger('CloudUserCapiService');
    }
    async getCurrentAccount(authDto) {
        this.logger.log('Getting cloud account.');
        try {
            const account = await this.capi.getCurrentAccount(authDto);
            this.logger.log('Succeed to get cloud account.');
            return (0, utils_2.parseCloudAccountCapiResponse)(account);
        }
        catch (e) {
            this.logger.log('Failed to get cloud account', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
};
CloudUserCapiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloud_user_capi_provider_1.CloudUserCapiProvider])
], CloudUserCapiService);
exports.CloudUserCapiService = CloudUserCapiService;
