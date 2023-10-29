"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFreeSubscriptionAndDatabaseCloudJob = void 0;
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
        this.name = constants_1.CloudJobName.CreateFreeDatabase;
    }
    async iteration() {
        this.logger.log('Create free subscription and database');
        this.checkSignal();
        this.changeState({ step: models_1.CloudJobStep.Subscription });
        this.logger.debug('Get or create free subscription');
        const freeSubscription = await this.runChildJob(create_free_subscription_cloud_job_1.CreateFreeSubscriptionCloudJob, this.data, this.options);
        this.logger.debug('Get free subscription databases');
        this.checkSignal();
        this.changeState({ step: models_1.CloudJobStep.Database });
        const database = await this.runChildJob(jobs_1.CreateFreeDatabaseCloudJob, {
            subscriptionId: freeSubscription.id,
        }, this.options);
        this.result = { resourceId: database.id };
        this.changeState({ status: models_1.CloudJobStatus.Finished });
        return database;
    }
}
exports.CreateFreeSubscriptionAndDatabaseCloudJob = CreateFreeSubscriptionAndDatabaseCloudJob;
