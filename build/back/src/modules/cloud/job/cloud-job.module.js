"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudJobModule = void 0;
const common_1 = require("@nestjs/common");
const cloud_task_module_1 = require("../task/cloud-task.module");
const cloud_job_controller_1 = require("./cloud-job.controller");
const cloud_job_service_1 = require("./cloud-job.service");
const cloud_subscription_module_1 = require("../subscription/cloud-subscription.module");
const cloud_database_module_1 = require("../database/cloud-database.module");
const cloud_job_factory_1 = require("./cloud-job.factory");
const cloud_job_provider_1 = require("./cloud-job.provider");
const cloud_job_gateway_1 = require("./cloud-job.gateway");
const cloud_capi_key_module_1 = require("../capi-key/cloud-capi-key.module");
let CloudJobModule = class CloudJobModule {
};
CloudJobModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cloud_task_module_1.CloudTaskModule,
            cloud_subscription_module_1.CloudSubscriptionModule,
            cloud_database_module_1.CloudDatabaseModule,
            cloud_capi_key_module_1.CloudCapiKeyModule,
        ],
        providers: [
            cloud_job_service_1.CloudJobService,
            cloud_job_factory_1.CloudJobFactory,
            cloud_job_provider_1.CloudJobProvider,
            cloud_job_gateway_1.CloudJobGateway,
        ],
        controllers: [cloud_job_controller_1.CloudJobController],
    })
], CloudJobModule);
exports.CloudJobModule = CloudJobModule;
