"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CloudModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudModule = void 0;
const common_1 = require("@nestjs/common");
const cloud_autodiscovery_module_1 = require("./autodiscovery/cloud.autodiscovery.module");
const cloud_auth_module_1 = require("./auth/cloud-auth.module");
const cloud_user_module_1 = require("./user/cloud-user.module");
const cloud_task_module_1 = require("./task/cloud-task.module");
const cloud_job_module_1 = require("./job/cloud-job.module");
const cloud_capi_key_module_1 = require("./capi-key/cloud-capi-key.module");
let CloudModule = CloudModule_1 = class CloudModule {
    static register() {
        return {
            module: CloudModule_1,
            imports: [
                cloud_auth_module_1.CloudAuthModule,
                cloud_user_module_1.CloudUserModule,
                cloud_autodiscovery_module_1.CloudAutodiscoveryModule,
                cloud_task_module_1.CloudTaskModule,
                cloud_job_module_1.CloudJobModule,
                cloud_capi_key_module_1.CloudCapiKeyModule,
            ],
        };
    }
};
CloudModule = CloudModule_1 = __decorate([
    (0, common_1.Module)({})
], CloudModule);
exports.CloudModule = CloudModule;
