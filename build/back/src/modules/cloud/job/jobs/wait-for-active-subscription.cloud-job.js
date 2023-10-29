"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitForActiveSubscriptionCloudJob = void 0;
const cloud_job_1 = require("./cloud-job");
const models_1 = require("../../subscription/models");
const models_2 = require("../models");
const exceptions_1 = require("../exceptions");
const constants_1 = require("../constants");
class WaitForActiveSubscriptionCloudJob extends cloud_job_1.CloudJob {
    constructor(options, data, dependencies) {
        super(options);
        this.options = options;
        this.data = data;
        this.dependencies = dependencies;
        this.name = constants_1.CloudJobName.WaitForActiveSubscription;
    }
    async iteration() {
        this.logger.log('Waiting for cloud subscription active state');
        this.checkSignal();
        this.logger.debug('Fetching cloud subscription');
        const subscription = await this.dependencies.cloudSubscriptionCapiService.getSubscription(this.options.capiCredentials, this.data.subscriptionId, this.data.subscriptionType);
        switch (subscription === null || subscription === void 0 ? void 0 : subscription.status) {
            case models_1.CloudSubscriptionStatus.Active:
                this.logger.debug('Cloud subscription is in the active states');
                this.changeState({ status: models_2.CloudJobStatus.Finished });
                return subscription;
            case models_1.CloudSubscriptionStatus.Pending:
            case models_1.CloudSubscriptionStatus.NotActivated:
                this.logger.debug('Cloud subscription is not in the active state. Scheduling new iteration');
                return await this.runNextIteration();
            case models_1.CloudSubscriptionStatus.Error:
                this.logger.debug('Cloud subscription is in the failed state');
                throw new exceptions_1.CloudSubscriptionInFailedStateException();
            case models_1.CloudSubscriptionStatus.Deleting:
            default:
                throw new exceptions_1.CloudSubscriptionInUnexpectedStateException();
        }
    }
}
exports.WaitForActiveSubscriptionCloudJob = WaitForActiveSubscriptionCloudJob;
