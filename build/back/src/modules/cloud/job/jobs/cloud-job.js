"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudJob = exports.CloudJobOptions = void 0;
const uuid_1 = require("uuid");
const config_1 = require("../../../../utils/config");
const cloud_job_info_1 = require("../models/cloud-job-info");
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../exceptions");
const constants_1 = require("../constants");
const lodash_1 = require("lodash");
const cloudConfig = config_1.default.get('cloud');
class CloudJobOptions {
    constructor() {
        this.stateCallbacks = [];
    }
}
exports.CloudJobOptions = CloudJobOptions;
class CloudJob {
    constructor(options) {
        this.logger = new common_1.Logger(this.constructor.name);
        this.id = (0, uuid_1.v4)();
        this.name = constants_1.CloudJobName.Unknown;
        this.status = cloud_job_info_1.CloudJobStatus.Initializing;
        this.step = cloud_job_info_1.CloudJobStep.Credentials;
        this.options = options;
        if (!this.options.stateCallbacks) {
            this.options.stateCallbacks = [];
        }
        this.debounce = (0, lodash_1.debounce)(() => {
            this.triggerChangeStateCallbacks();
        }, 1000, {
            maxWait: 2000,
        });
    }
    triggerChangeStateCallbacks() {
        var _a;
        try {
            (((_a = this.options) === null || _a === void 0 ? void 0 : _a.stateCallbacks) || []).forEach((cb) => {
                var _a, _b;
                (_b = (_a = cb === null || cb === void 0 ? void 0 : cb(this)) === null || _a === void 0 ? void 0 : _a.catch) === null || _b === void 0 ? void 0 : _b.call(_a, () => { });
            });
        }
        catch (e) {
        }
    }
    async run() {
        try {
            this.changeState({
                status: cloud_job_info_1.CloudJobStatus.Running,
            });
            if (!this.options.capiCredentials) {
                this.logger.debug('Generating capi credentials');
                this.changeState({ step: cloud_job_info_1.CloudJobStep.Credentials });
                this.options.capiCredentials = await this.dependencies.cloudCapiKeyService.getCapiCredentials(this.options.sessionMetadata, this.options.utm);
            }
            return await this.iteration();
        }
        catch (e) {
            this.logger.error('Cloud job failed', e);
            const error = (0, exceptions_1.wrapCloudJobError)(await this.dependencies.cloudCapiKeyService.handleCapiKeyUnauthorizedError(e, this.options.sessionMetadata));
            this.changeState({
                status: cloud_job_info_1.CloudJobStatus.Failed,
                error,
            });
            throw error;
        }
    }
    abort(reason) {
        var _a, _b;
        (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.abortController) === null || _b === void 0 ? void 0 : _b.abort(reason);
    }
    getState() {
        var _a, _b;
        return {
            id: this.id,
            name: ((_a = this.options) === null || _a === void 0 ? void 0 : _a.name) || this.name,
            status: this.status,
            result: this.result,
            error: this.error ? (0, exceptions_1.wrapCloudJobError)(this.error).getResponse() : undefined,
            child: (_b = this.child) === null || _b === void 0 ? void 0 : _b.getState(),
            step: this.step,
        };
    }
    createChildJob(TargetJob, data, options = {}) {
        return new TargetJob({
            ...this.options,
            ...options,
            stateCallbacks: [() => this.changeState()],
            child: true,
        }, data, this.dependencies);
    }
    async runChildJob(TargetJob, data, options) {
        const child = this.createChildJob(TargetJob, data, options);
        this.changeState({ child });
        const result = await child.run();
        this.changeState({ child: null });
        return result;
    }
    addStateCallback(callback) {
        this.options.stateCallbacks.push(callback);
    }
    changeState(state = {}) {
        Object.entries(state).forEach(([key, value]) => { this[key] = value; });
        if (this.options.child) {
            this.triggerChangeStateCallbacks();
        }
        else {
            this.debounce();
        }
    }
    checkSignal() {
        var _a, _b, _c, _d, _e;
        if (((_c = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.abortController) === null || _b === void 0 ? void 0 : _b.signal) === null || _c === void 0 ? void 0 : _c.aborted) === true) {
            const reason = (_e = (_d = this.abortController) === null || _d === void 0 ? void 0 : _d.signal) === null || _e === void 0 ? void 0 : _e.reason;
            this.logger.error(`Job ${this.name} aborted with reason: ${reason}`);
            throw new exceptions_1.CloudJobAbortedException(undefined, { cause: reason });
        }
    }
    runNextIteration(timeout = cloudConfig.jobIterationInterval) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                this.iteration().then(res).catch(rej);
            }, timeout);
        });
    }
}
exports.CloudJob = CloudJob;
