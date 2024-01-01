"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportFreeDatabaseCloudJob = void 0;
const jobs_1 = require("./");
const models_1 = require("../../subscription/models");
const wait_for_active_database_cloud_job_1 = require("./wait-for-active-database.cloud-job");
const constants_1 = require("../constants");
const models_2 = require("../models");
const database_entity_1 = require("../../../database/entities/database.entity");
const config_1 = require("../../../../utils/config");
const cloudConfig = config_1.default.get('cloud');
class ImportFreeDatabaseCloudJob extends jobs_1.CloudJob {
    constructor(options, data, dependencies) {
        super(options);
        this.options = options;
        this.data = data;
        this.dependencies = dependencies;
        this.name = constants_1.CloudJobName.ImportFreeDatabase;
    }
    async iteration() {
        var _a, _b;
        this.logger.log('Importing free database');
        this.checkSignal();
        this.changeState({ step: models_2.CloudJobStep.Import });
        this.logger.debug('Getting database metadata');
        const cloudDatabase = await this.runChildJob(wait_for_active_database_cloud_job_1.WaitForActiveDatabaseCloudJob, {
            databaseId: this.data.databaseId,
            subscriptionId: this.data.subscriptionId,
            subscriptionType: models_1.CloudSubscriptionType.Fixed,
        }, this.options);
        if (!cloudDatabase) {
        }
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
            region: (_a = this.data) === null || _a === void 0 ? void 0 : _a.region,
            provider: (_b = this.data) === null || _b === void 0 ? void 0 : _b.provider,
        };
        this.changeState({ status: models_2.CloudJobStatus.Finished });
        return database;
    }
}
exports.ImportFreeDatabaseCloudJob = ImportFreeDatabaseCloudJob;
