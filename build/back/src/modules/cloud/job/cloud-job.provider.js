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
exports.CloudJobProvider = void 0;
const lodash_1 = require("lodash");
const models_1 = require("./models");
const cloud_job_factory_1 = require("./cloud-job.factory");
const utils_1 = require("../../../common/utils");
const common_1 = require("@nestjs/common");
let CloudJobProvider = class CloudJobProvider {
    constructor(cloudJobFactory) {
        this.cloudJobFactory = cloudJobFactory;
        this.jobs = new Map();
    }
    async addJob(sessionMetadata, dto, utm) {
        try {
            const job = await this.cloudJobFactory.create(dto.name, dto.data || {}, {
                sessionMetadata,
                utm,
            });
            if (this.jobs.size) {
                this.jobs.forEach((ongoingJob) => {
                    ongoingJob.abort('Another job was added');
                });
                this.jobs.clear();
            }
            this.jobs.set(job.id, job);
            if (dto.runMode === models_1.CloudJobRunMode.Async) {
                job.run().catch(() => { });
                return job.getState();
            }
            return await job.run();
        }
        catch (e) {
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async get(id) {
        return this.jobs.get(id);
    }
    async findUserJobs(sessionMetadata) {
        return (0, lodash_1.filter)([...this.jobs.values()], (job) => { var _a, _b; return ((_b = (_a = job.options) === null || _a === void 0 ? void 0 : _a.sessionMetadata) === null || _b === void 0 ? void 0 : _b.userId) === sessionMetadata.userId; });
    }
};
CloudJobProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloud_job_factory_1.CloudJobFactory])
], CloudJobProvider);
exports.CloudJobProvider = CloudJobProvider;
