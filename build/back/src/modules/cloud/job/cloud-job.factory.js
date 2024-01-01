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
exports.CloudJobFactory = void 0;
const common_1 = require("@nestjs/common");
const jobs_1 = require("./jobs");
const constants_1 = require("./constants");
const create_free_database_cloud_job_1 = require("./jobs/create-free-database.cloud-job");
const cloud_database_capi_service_1 = require("../database/cloud-database.capi.service");
const cloud_subscription_capi_service_1 = require("../subscription/cloud-subscription.capi.service");
const cloud_task_capi_service_1 = require("../task/cloud-task.capi.service");
const exceptions_1 = require("./exceptions");
const database_service_1 = require("../../database/database.service");
const cloud_database_analytics_1 = require("../database/cloud-database.analytics");
const cloud_capi_key_service_1 = require("../capi-key/cloud-capi-key.service");
const cloud_subscription_api_service_1 = require("../subscription/cloud-subscription.api.service");
let CloudJobFactory = class CloudJobFactory {
    constructor(cloudDatabaseCapiService, cloudSubscriptionCapiService, cloudTaskCapiService, cloudDatabaseAnalytics, databaseService, cloudCapiKeyService, cloudSubscriptionApiService) {
        this.cloudDatabaseCapiService = cloudDatabaseCapiService;
        this.cloudSubscriptionCapiService = cloudSubscriptionCapiService;
        this.cloudTaskCapiService = cloudTaskCapiService;
        this.cloudDatabaseAnalytics = cloudDatabaseAnalytics;
        this.databaseService = databaseService;
        this.cloudCapiKeyService = cloudCapiKeyService;
        this.cloudSubscriptionApiService = cloudSubscriptionApiService;
    }
    async create(name, data, options) {
        switch (name) {
            case constants_1.CloudJobName.CreateFreeSubscriptionAndDatabase:
                return new jobs_1.CreateFreeSubscriptionAndDatabaseCloudJob({
                    abortController: new AbortController(),
                    ...options,
                }, data, {
                    cloudDatabaseCapiService: this.cloudDatabaseCapiService,
                    cloudSubscriptionCapiService: this.cloudSubscriptionCapiService,
                    cloudTaskCapiService: this.cloudTaskCapiService,
                    cloudDatabaseAnalytics: this.cloudDatabaseAnalytics,
                    databaseService: this.databaseService,
                    cloudCapiKeyService: this.cloudCapiKeyService,
                    cloudSubscriptionApiService: this.cloudSubscriptionApiService,
                });
            case constants_1.CloudJobName.CreateFreeDatabase:
                return new create_free_database_cloud_job_1.CreateFreeDatabaseCloudJob({
                    abortController: new AbortController(),
                    ...options,
                }, data, {
                    cloudDatabaseCapiService: this.cloudDatabaseCapiService,
                    cloudSubscriptionCapiService: this.cloudSubscriptionCapiService,
                    cloudTaskCapiService: this.cloudTaskCapiService,
                    cloudDatabaseAnalytics: this.cloudDatabaseAnalytics,
                    databaseService: this.databaseService,
                    cloudCapiKeyService: this.cloudCapiKeyService,
                });
            case constants_1.CloudJobName.ImportFreeDatabase:
                return new jobs_1.ImportFreeDatabaseCloudJob({
                    abortController: new AbortController(),
                    ...options,
                }, data, {
                    cloudDatabaseCapiService: this.cloudDatabaseCapiService,
                    cloudSubscriptionCapiService: this.cloudSubscriptionCapiService,
                    cloudTaskCapiService: this.cloudTaskCapiService,
                    cloudDatabaseAnalytics: this.cloudDatabaseAnalytics,
                    databaseService: this.databaseService,
                    cloudCapiKeyService: this.cloudCapiKeyService,
                });
            default:
                throw new exceptions_1.CloudJobUnsupportedException();
        }
    }
};
CloudJobFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloud_database_capi_service_1.CloudDatabaseCapiService,
        cloud_subscription_capi_service_1.CloudSubscriptionCapiService,
        cloud_task_capi_service_1.CloudTaskCapiService,
        cloud_database_analytics_1.CloudDatabaseAnalytics,
        database_service_1.DatabaseService,
        cloud_capi_key_service_1.CloudCapiKeyService,
        cloud_subscription_api_service_1.CloudSubscriptionApiService])
], CloudJobFactory);
exports.CloudJobFactory = CloudJobFactory;
