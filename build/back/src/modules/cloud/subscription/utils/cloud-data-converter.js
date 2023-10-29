"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCloudSubscriptionsCloudRegionsApiResponse = exports.parseCloudSubscriptionsPlansCapiResponse = exports.parseCloudSubscriptionsCapiResponse = exports.parseCloudSubscriptionCapiResponse = void 0;
const lodash_1 = require("lodash");
const models_1 = require("../models");
const class_transformer_1 = require("class-transformer");
const parseCloudSubscriptionCapiResponse = (subscription, type) => (0, class_transformer_1.plainToClass)(models_1.CloudSubscription, {
    id: subscription.id,
    type,
    name: subscription.name,
    numberOfDatabases: subscription.numberOfDatabases,
    status: subscription.status,
    provider: (0, lodash_1.get)(subscription, ['cloudDetails', 0, 'provider'], (0, lodash_1.get)(subscription, 'provider')),
    region: (0, lodash_1.get)(subscription, [
        'cloudDetails',
        0,
        'regions',
        0,
        'region',
    ], (0, lodash_1.get)(subscription, 'region')),
    price: subscription === null || subscription === void 0 ? void 0 : subscription.price,
    free: (subscription === null || subscription === void 0 ? void 0 : subscription.price) === 0,
});
exports.parseCloudSubscriptionCapiResponse = parseCloudSubscriptionCapiResponse;
const parseCloudSubscriptionsCapiResponse = (subscriptions, type) => {
    var _a;
    const result = [];
    if (subscriptions === null || subscriptions === void 0 ? void 0 : subscriptions.length) {
        (_a = subscriptions === null || subscriptions === void 0 ? void 0 : subscriptions.forEach) === null || _a === void 0 ? void 0 : _a.call(subscriptions, (subscription) => {
            result.push((0, exports.parseCloudSubscriptionCapiResponse)(subscription, type));
        });
    }
    return result;
};
exports.parseCloudSubscriptionsCapiResponse = parseCloudSubscriptionsCapiResponse;
const parseCloudSubscriptionsPlansCapiResponse = (plans, type) => {
    var _a;
    const result = [];
    if (plans === null || plans === void 0 ? void 0 : plans.length) {
        (_a = plans === null || plans === void 0 ? void 0 : plans.forEach) === null || _a === void 0 ? void 0 : _a.call(plans, (plan) => {
            result.push((0, class_transformer_1.plainToClass)(models_1.CloudSubscriptionPlan, {
                id: plan.id,
                type,
                name: plan.name,
                provider: plan.provider,
                price: plan === null || plan === void 0 ? void 0 : plan.price,
                region: plan.region,
                regionId: plan.regionId,
            }));
        });
    }
    return result;
};
exports.parseCloudSubscriptionsPlansCapiResponse = parseCloudSubscriptionsPlansCapiResponse;
const parseCloudSubscriptionsCloudRegionsApiResponse = (regions) => {
    var _a;
    const result = [];
    if (regions === null || regions === void 0 ? void 0 : regions.length) {
        (_a = regions === null || regions === void 0 ? void 0 : regions.forEach) === null || _a === void 0 ? void 0 : _a.call(regions, (plan) => {
            result.push((0, class_transformer_1.plainToClass)(models_1.CloudSubscriptionRegion, {
                id: (0, lodash_1.toNumber)(plan.id),
                name: plan.name,
                cloud: plan.cloud,
                displayOrder: plan.display_order,
                countryName: plan.country_name,
                cityName: plan.city_name,
                regionId: plan.region_id,
                flag: plan === null || plan === void 0 ? void 0 : plan.flag,
            }));
        });
    }
    return result;
};
exports.parseCloudSubscriptionsCloudRegionsApiResponse = parseCloudSubscriptionsCloudRegionsApiResponse;
