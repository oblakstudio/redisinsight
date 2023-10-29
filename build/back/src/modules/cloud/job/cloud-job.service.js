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
exports.CloudJobService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../common/utils");
const cloud_job_provider_1 = require("./cloud-job.provider");
const exceptions_1 = require("./exceptions");
const constants_1 = require("../common/constants");
let CloudJobService = class CloudJobService {
    constructor(cloudJobProvider) {
        this.cloudJobProvider = cloudJobProvider;
    }
    async create(sessionMetadata, dto, utm) {
        try {
            return await this.cloudJobProvider.addJob(sessionMetadata, dto, utm);
        }
        catch (e) {
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async getUserJobsInfo(sessionMetadata) {
        try {
            const jobs = await this.cloudJobProvider.findUserJobs(sessionMetadata);
            return jobs.map((job) => job.getState());
        }
        catch (e) {
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async get(sessionMetadata, id) {
        var _a, _b;
        try {
            const job = await this.cloudJobProvider.get(id);
            if (!job) {
                throw new exceptions_1.CloudJobNotFoundException();
            }
            if (((_b = (_a = job.options) === null || _a === void 0 ? void 0 : _a.sessionMetadata) === null || _b === void 0 ? void 0 : _b.userId) !== sessionMetadata.userId) {
                throw new common_1.ForbiddenException('This job doesn\'t belong to the user');
            }
            return job;
        }
        catch (e) {
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async getJobInfo(sessionMetadata, id) {
        try {
            const job = await this.get(sessionMetadata, id);
            return job.getState();
        }
        catch (e) {
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async monitorJob(sessionMetadata, dto, client) {
        const job = await this.get(sessionMetadata, dto.jobId);
        job.addStateCallback(async (cloudJob) => {
            client.emit(constants_1.CloudJobEvents.Monitor, cloudJob.getState());
        });
        return job.getState();
    }
};
CloudJobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloud_job_provider_1.CloudJobProvider])
], CloudJobService);
exports.CloudJobService = CloudJobService;
