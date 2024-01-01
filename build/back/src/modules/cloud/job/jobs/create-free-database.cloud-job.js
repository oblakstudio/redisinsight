"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFreeDatabaseCloudJob = void 0;
const jobs_1 = require("./");
const models_1 = require("../../subscription/models");
const wait_for_active_database_cloud_job_1 = require("./wait-for-active-database.cloud-job");
const constants_1 = require("../constants");
const models_2 = require("../models");
const exceptions_1 = require("../exceptions");
const database_entity_1 = require("../../../database/entities/database.entity");
const config_1 = require("../../../../utils/config");
const cloudConfig = config_1.default.get('cloud');
class CreateFreeDatabaseCloudJob extends jobs_1.CloudJob {
    constructor(options, data, dependencies) {
        super(options);
        this.options = options;
        this.data = data;
        this.dependencies = dependencies;
        this.name = constants_1.CloudJobName.CreateFreeDatabase;
    }
    async iteration() {
        var _a;
        let freeSubscription;
        try {
            this.logger.log('Create free database');
            this.checkSignal();
            this.changeState({ step: models_2.CloudJobStep.Database });
            this.logger.debug('Getting subscription metadata');
            freeSubscription = await this.dependencies.cloudSubscriptionCapiService.getSubscription(this.options.capiCredentials, this.data.subscriptionId, models_1.CloudSubscriptionType.Fixed);
            let cloudDatabase;
            let createFreeDatabaseTask = await this.dependencies.cloudDatabaseCapiService.createFreeDatabase(this.options.capiCredentials, {
                subscriptionId: freeSubscription.id,
                subscriptionType: freeSubscription.type,
            });
            this.checkSignal();
            createFreeDatabaseTask = await this.runChildJob(jobs_1.WaitForTaskCloudJob, {
                taskId: createFreeDatabaseTask.taskId,
            }, this.options);
            const freeDatabaseId = (_a = createFreeDatabaseTask === null || createFreeDatabaseTask === void 0 ? void 0 : createFreeDatabaseTask.response) === null || _a === void 0 ? void 0 : _a.resourceId;
            if (!freeDatabaseId) {
                throw new exceptions_1.CloudTaskNoResourceIdException();
            }
            cloudDatabase = {
                databaseId: freeDatabaseId,
            };
            if (!cloudDatabase) {
                throw new exceptions_1.CloudJobUnexpectedErrorException('Unable to create free cloud database');
            }
            this.checkSignal();
            cloudDatabase = await this.runChildJob(wait_for_active_database_cloud_job_1.WaitForActiveDatabaseCloudJob, {
                databaseId: cloudDatabase.databaseId,
                subscriptionId: this.data.subscriptionId,
                subscriptionType: models_1.CloudSubscriptionType.Fixed,
            }, this.options);
            this.checkSignal();
            const { publicEndpoint, name, password, } = cloudDatabase;
            const [host, port] = publicEndpoint.split(':');
            const database = await this.dependencies.databaseService.create({
                host,
                port: parseInt(port, 10),
                name,
                nameFromProvider: name,
                password,
                provider: database_entity_1.HostingProvider.RE_CLOUD,
                cloudDetails: {
                    ...cloudDatabase === null || cloudDatabase === void 0 ? void 0 : cloudDatabase.cloudDetails,
                    free: true,
                },
                timeout: cloudConfig.cloudDatabaseConnectionTimeout,
            });
            this.result = {
                resourceId: database.id,
                region: freeSubscription === null || freeSubscription === void 0 ? void 0 : freeSubscription.region,
                provider: freeSubscription === null || freeSubscription === void 0 ? void 0 : freeSubscription.provider,
            };
            this.changeState({ status: models_2.CloudJobStatus.Finished });
            this.dependencies.cloudDatabaseAnalytics.sendCloudFreeDatabaseCreated({
                region: (freeSubscription === null || freeSubscription === void 0 ? void 0 : freeSubscription.region) || '',
                provider: (freeSubscription === null || freeSubscription === void 0 ? void 0 : freeSubscription.provider) || '',
            });
            return database;
        }
        catch (e) {
            this.dependencies.cloudDatabaseAnalytics.sendCloudFreeDatabaseFailed(e, {
                region: freeSubscription === null || freeSubscription === void 0 ? void 0 : freeSubscription.region,
                provider: freeSubscription === null || freeSubscription === void 0 ? void 0 : freeSubscription.provider,
            });
            throw e;
        }
    }
}
exports.CreateFreeDatabaseCloudJob = CreateFreeDatabaseCloudJob;
