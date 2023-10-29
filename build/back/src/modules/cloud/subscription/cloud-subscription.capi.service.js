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
exports.CloudSubscriptionCapiService = void 0;
const common_1 = require("@nestjs/common");
const models_1 = require("./models");
const utils_1 = require("../../../common/utils");
const utils_2 = require("./utils");
const lodash_1 = require("lodash");
const config_1 = require("../../../utils/config");
const utils_3 = require("../task/utils");
const cloud_subscription_capi_provider_1 = require("./providers/cloud-subscription.capi.provider");
const cloudConfig = config_1.default.get('cloud');
let CloudSubscriptionCapiService = class CloudSubscriptionCapiService {
    constructor(capi) {
        this.capi = capi;
        this.logger = new common_1.Logger('CloudSubscriptionCapiService');
    }
    static findFreeSubscription(subscriptions) {
        const freeSubscriptions = (0, lodash_1.filter)(subscriptions, { price: 0 });
        return (0, lodash_1.find)(freeSubscriptions, { name: cloudConfig.freeSubscriptionName }) || freeSubscriptions[0];
    }
    static findFreePlan(plans) {
        const freePlans = (0, lodash_1.filter)(plans, { price: 0 });
        return (0, lodash_1.find)(freePlans, (plan) => plan.provider === models_1.CloudSubscriptionPlanProvider.AWS
            && plan.region === cloudConfig.defaultPlanRegion
            && (plan.name).toLowerCase().includes('standard'))
            || (0, lodash_1.find)(freePlans, { provider: models_1.CloudSubscriptionPlanProvider.AWS, region: cloudConfig.defaultPlanRegion })
            || (0, lodash_1.find)(freePlans, { provider: models_1.CloudSubscriptionPlanProvider.AWS })
            || freePlans[0];
    }
    static findFreePlanById(plans, planId) {
        const freePlans = (0, lodash_1.filter)(plans, { price: 0 });
        return (0, lodash_1.find)(freePlans, { id: planId });
    }
    async getSubscriptions(authDto, type) {
        this.logger.log(`Getting cloud ${type} subscriptions.`);
        try {
            const subscriptions = await this.capi.getSubscriptionsByType(authDto, type);
            this.logger.log(`Succeed to get cloud ${type} subscriptions.`);
            return (0, utils_2.parseCloudSubscriptionsCapiResponse)(subscriptions, type);
        }
        catch (error) {
            throw (0, utils_1.wrapHttpError)(error);
        }
    }
    async getSubscription(authDto, id, type) {
        this.logger.log(`Getting cloud ${type} subscription.`);
        try {
            const subscription = await this.capi.getSubscriptionByType(authDto, id, type);
            this.logger.log(`Succeed to get cloud ${type} subscription.`);
            return (0, utils_2.parseCloudSubscriptionCapiResponse)(subscription, type);
        }
        catch (error) {
            throw (0, utils_1.wrapHttpError)(error);
        }
    }
    async getSubscriptionsPlans(authDto, type) {
        this.logger.log(`Getting cloud ${type} plans.`);
        try {
            const plans = await this.capi.getSubscriptionsPlansByType(authDto, type);
            this.logger.log(`Succeed to get cloud ${type} plans.`);
            return (0, utils_2.parseCloudSubscriptionsPlansCapiResponse)(plans, type);
        }
        catch (error) {
            throw (0, utils_1.wrapHttpError)(error);
        }
    }
    async createFreeSubscription(authDto, planId) {
        this.logger.log('Creating free subscription');
        try {
            const task = await this.capi.createFreeSubscription(authDto, {
                name: cloudConfig.freeSubscriptionName,
                planId,
                subscriptionType: models_1.CloudSubscriptionType.Fixed,
            });
            this.logger.log('Task to creating free subscription was sent');
            return (0, utils_3.parseCloudTaskCapiResponse)(task);
        }
        catch (error) {
            throw (0, utils_1.wrapHttpError)(error);
        }
    }
};
CloudSubscriptionCapiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloud_subscription_capi_provider_1.CloudSubscriptionCapiProvider])
], CloudSubscriptionCapiService);
exports.CloudSubscriptionCapiService = CloudSubscriptionCapiService;
