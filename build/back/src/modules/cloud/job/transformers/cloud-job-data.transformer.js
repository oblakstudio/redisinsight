"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudJobDataTransformer = void 0;
const lodash_1 = require("lodash");
const create_database_cloud_job_data_dto_1 = require("../dto/create-database.cloud-job.data.dto");
const constants_1 = require("../constants");
const create_subscription_and_database_cloud_job_data_dto_1 = require("../dto/create-subscription-and-database.cloud-job.data.dto");
const import_database_cloud_job_data_dto_1 = require("../dto/import-database.cloud-job.data.dto");
const cloudJobDataTransformer = (data) => {
    const jobName = (0, lodash_1.get)(data === null || data === void 0 ? void 0 : data.object, 'name');
    switch (jobName) {
        case constants_1.CloudJobName.ImportFreeDatabase:
            return import_database_cloud_job_data_dto_1.ImportDatabaseCloudJobDataDto;
        case constants_1.CloudJobName.CreateFreeDatabase:
            return create_database_cloud_job_data_dto_1.CreateDatabaseCloudJobDataDto;
        case constants_1.CloudJobName.CreateFreeSubscription:
        case constants_1.CloudJobName.CreateFreeSubscriptionAndDatabase:
            return create_subscription_and_database_cloud_job_data_dto_1.CreateSubscriptionAndDatabaseCloudJobDataDto;
        default:
            return undefined;
    }
};
exports.cloudJobDataTransformer = cloudJobDataTransformer;
