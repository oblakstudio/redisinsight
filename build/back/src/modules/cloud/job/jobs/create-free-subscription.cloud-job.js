"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFreeSubscriptionCloudJob = void 0;
const cloud_job_1 = require("./cloud-job");
const models_1 = require("../../subscription/models");
const cloud_subscription_capi_service_1 = require("../../subscription/cloud-subscription.capi.service");
const wait_for_task_cloud_job_1 = require("./wait-for-task.cloud-job");
const wait_for_active_subscription_cloud_job_1 = require("./wait-for-active-subscription.cloud-job");
const constants_1 = require("../constants");
const models_2 = require("../models");
const exceptions_1 = require("../exceptions");
const cloud_subscription_already_exists_free_exception_1 = require("../exceptions/cloud-subscription-already-exists-free.exception");
class CreateFreeSubscriptionCloudJob extends cloud_job_1.CloudJob {
    constructor(options, data, dependencies) {
        super(options);
        this.options = options;
        this.data = data;
        this.dependencies = dependencies;
        this.name = constants_1.CloudJobName.CreateFreeSubscription;
    }
    async iteration() {
        var _a;
        this.logger.log('Ensure free cloud subscription');
        this.checkSignal();
        let freeSubscription;
        this.logger.debug('Fetching fixed subscriptions');
        const fixedSubscriptions = await this.dependencies.cloudSubscriptionCapiService.getSubscriptions(this.options.capiCredentials, models_1.CloudSubscriptionType.Fixed);
        freeSubscription = cloud_subscription_capi_service_1.CloudSubscriptionCapiService.findFreeSubscription(fixedSubscriptions);
        if (freeSubscription) {
            this.logger.debug('Fetching fixed subscription databases');
            const databases = await this.dependencies.cloudDatabaseCapiService.getDatabases(this.options.capiCredentials, {
                subscriptionId: freeSubscription.id,
                subscriptionType: models_1.CloudSubscriptionType.Fixed,
            });
            if (databases === null || databases === void 0 ? void 0 : databases.length) {
                throw new exceptions_1.CloudDatabaseAlreadyExistsFreeException(undefined, {
                    subscriptionId: freeSubscription.id,
                    databaseId: databases[0].databaseId,
                    region: freeSubscription === null || freeSubscription === void 0 ? void 0 : freeSubscription.region,
                    provider: freeSubscription === null || freeSubscription === void 0 ? void 0 : freeSubscription.provider,
                });
            }
            throw new cloud_subscription_already_exists_free_exception_1.CloudSubscriptionAlreadyExistsFreeException(undefined, {
                subscriptionId: freeSubscription.id,
            });
        }
        if (!freeSubscription) {
            this.logger.debug('No free subscription found. Creating one');
            this.checkSignal();
            this.logger.debug('Fetching free plans');
            const fixedPlans = await this.dependencies.cloudSubscriptionCapiService.getSubscriptionsPlans(this.options.capiCredentials, models_1.CloudSubscriptionType.Fixed);
            const freePlan = cloud_subscription_capi_service_1.CloudSubscriptionCapiService.findFreePlanById(fixedPlans, this.data.planId);
            if (!freePlan) {
                throw new exceptions_1.CloudPlanNotFoundFreeException();
            }
            this.logger.debug('Create free subscription');
            this.checkSignal();
            let createSubscriptionTask = await this.dependencies.cloudSubscriptionCapiService.createFreeSubscription(this.options.capiCredentials, freePlan.id);
            this.logger.debug('Create free subscription: cloud task created. Waiting...');
            this.checkSignal();
            createSubscriptionTask = await this.runChildJob(wait_for_task_cloud_job_1.WaitForTaskCloudJob, {
                taskId: createSubscriptionTask.taskId,
            }, this.options);
            const freeSubscriptionId = (_a = createSubscriptionTask === null || createSubscriptionTask === void 0 ? void 0 : createSubscriptionTask.response) === null || _a === void 0 ? void 0 : _a.resourceId;
            if (!freeSubscriptionId) {
                throw new exceptions_1.CloudTaskNoResourceIdException();
            }
            freeSubscription = {
                id: freeSubscriptionId,
            };
        }
        if (!freeSubscription) {
            throw new exceptions_1.CloudSubscriptionUnableToDetermineException();
        }
        this.checkSignal();
        if (freeSubscription.status !== models_1.CloudSubscriptionStatus.Active) {
            freeSubscription = await this.runChildJob(wait_for_active_subscription_cloud_job_1.WaitForActiveSubscriptionCloudJob, {
                subscriptionId: freeSubscription.id,
                subscriptionType: models_1.CloudSubscriptionType.Fixed,
            }, this.options);
        }
        this.changeState({ status: models_2.CloudJobStatus.Finished });
        return freeSubscription;
    }
}
exports.CreateFreeSubscriptionCloudJob = CreateFreeSubscriptionCloudJob;
