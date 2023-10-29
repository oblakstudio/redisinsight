"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudTaskModule = void 0;
const common_1 = require("@nestjs/common");
const cloud_task_capi_service_1 = require("./cloud-task.capi.service");
const cloud_task_capi_provider_1 = require("./providers/cloud-task.capi.provider");
let CloudTaskModule = class CloudTaskModule {
};
CloudTaskModule = __decorate([
    (0, common_1.Module)({
        providers: [
            cloud_task_capi_provider_1.CloudTaskCapiProvider,
            cloud_task_capi_service_1.CloudTaskCapiService,
        ],
        exports: [
            cloud_task_capi_service_1.CloudTaskCapiService,
        ],
    })
], CloudTaskModule);
exports.CloudTaskModule = CloudTaskModule;
