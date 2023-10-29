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
exports.CloudTaskCapiService = void 0;
const common_1 = require("@nestjs/common");
const cloud_task_capi_provider_1 = require("./providers/cloud-task.capi.provider");
const utils_1 = require("../../../common/utils");
const utils_2 = require("./utils");
const exceptions_1 = require("../job/exceptions");
let CloudTaskCapiService = class CloudTaskCapiService {
    constructor(cloudTaskCapiProvider) {
        this.cloudTaskCapiProvider = cloudTaskCapiProvider;
        this.logger = new common_1.Logger('CloudTaskCapiService');
    }
    async getTask(credentials, id) {
        try {
            this.logger.debug('Trying to get cloud task', { id });
            const task = await this.cloudTaskCapiProvider.getTask(credentials, id);
            if (!task) {
                throw new exceptions_1.CloudTaskNotFoundException();
            }
            this.logger.debug('Successfully fetched cloud task', task);
            return (0, utils_2.parseCloudTaskCapiResponse)(task);
        }
        catch (e) {
            this.logger.error('Unable to get cloud task', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
};
CloudTaskCapiService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [cloud_task_capi_provider_1.CloudTaskCapiProvider])
], CloudTaskCapiService);
exports.CloudTaskCapiService = CloudTaskCapiService;
