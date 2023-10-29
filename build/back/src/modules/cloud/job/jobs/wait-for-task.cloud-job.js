"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitForTaskCloudJob = void 0;
const cloud_job_1 = require("./cloud-job");
const models_1 = require("../../task/models");
const models_2 = require("../models");
const exceptions_1 = require("../exceptions");
const constants_1 = require("../constants");
class WaitForTaskCloudJob extends cloud_job_1.CloudJob {
    constructor(options, data, dependencies) {
        super(options);
        this.options = options;
        this.data = data;
        this.dependencies = dependencies;
        this.name = constants_1.CloudJobName.WaitForTask;
    }
    async iteration() {
        var _a;
        this.logger.log('Wait for cloud task complete');
        this.checkSignal();
        this.logger.debug('Fetching cloud task');
        const task = await this.dependencies.cloudTaskCapiService.getTask(this.options.capiCredentials, this.data.taskId);
        switch (task === null || task === void 0 ? void 0 : task.status) {
            case models_1.CloudTaskStatus.Initialized:
            case models_1.CloudTaskStatus.Received:
            case models_1.CloudTaskStatus.ProcessingInProgress:
                this.logger.debug('Cloud task processing is in progress. Scheduling new iteration.');
                return await this.runNextIteration();
            case models_1.CloudTaskStatus.ProcessingCompleted:
                this.logger.debug('Cloud task processing successfully completed.');
                this.changeState({ status: models_2.CloudJobStatus.Finished });
                return task;
            case models_1.CloudTaskStatus.ProcessingError:
                throw new exceptions_1.CloudTaskProcessingErrorException(undefined, { cause: (_a = task.response) === null || _a === void 0 ? void 0 : _a.error });
            default:
                throw new exceptions_1.CloudJobUnexpectedErrorException('Something went wrong. Unknown task status or task was not found');
        }
    }
}
exports.WaitForTaskCloudJob = WaitForTaskCloudJob;
