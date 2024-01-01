"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFreeSubscriptionAndDatabaseCloudJob = void 0;
const lodash_1 = require("lodash");
const jobs_1 = require("./");
const create_free_subscription_cloud_job_1 = require("./create-free-subscription.cloud-job");
const constants_1 = require("../constants");
const models_1 = require("../models");
class CreateFreeSubscriptionAndDatabaseCloudJob extends jobs_1.CloudJob {
    constructor(options, data, dependencies) {
        super(options);
        this.options = options;
        this.data = data;
        this.dependencies = dependencies;
        this.name = constants_1.CloudJobName.CreateFreeSubscriptionAndDatabase;
    }
    async iteration() {
        var _a, _b;
        let planId = (_a = this.data) === null || _a === void 0 ? void 0 : _a.planId;
        this.logger.log('Create free subscription and database');
        this.checkSignal();
        this.changeState({ step: models_1.CloudJobStep.Subscription });
        this.logger.debug('Get or create free subscription');
        if ((_b = this.data) === null || _b === void 0 ? void 0 : _b.isRecommendedSettings) {
            const plans = await this.dependencies.cloudSubscriptionApiService.getSubscriptionPlans(this.options.sessionMetadata);
            planId = this.getRecommendedPlanId(plans);
        }
        const freeSubscription = await this.runChildJob(create_free_subscription_cloud_job_1.CreateFreeSubscriptionCloudJob, { planId }, this.options);
        this.logger.debug('Get free subscription databases');
        this.checkSignal();
        this.changeState({ step: models_1.CloudJobStep.Database });
        const database = await this.runChildJob(jobs_1.CreateFreeDatabaseCloudJob, {
            subscriptionId: freeSubscription.id,
        }, this.options);
        this.result = {
            resourceId: database.id,
            region: freeSubscription === null || freeSubscription === void 0 ? void 0 : freeSubscription.region,
            provider: freeSubscription === null || freeSubscription === void 0 ? void 0 : freeSubscription.provider,
        };
        this.changeState({ status: models_1.CloudJobStatus.Finished });
        return database;
    }
    getRecommendedPlanId(plans) {
        var _a;
        const defaultPlan = (0, lodash_1.sortBy)(plans, ['details.displayOrder']);
        return (_a = defaultPlan[0]) === null || _a === void 0 ? void 0 : _a.id;
    }
}
exports.CreateFreeSubscriptionAndDatabaseCloudJob = CreateFreeSubscriptionAndDatabaseCloudJob;
