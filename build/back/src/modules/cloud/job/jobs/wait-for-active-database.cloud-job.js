"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitForActiveDatabaseCloudJob = void 0;
const cloud_job_1 = require("./cloud-job");
const models_1 = require("../../database/models");
const models_2 = require("../models");
const exceptions_1 = require("../exceptions");
const constants_1 = require("../constants");
class WaitForActiveDatabaseCloudJob extends cloud_job_1.CloudJob {
    constructor(options, data, dependencies) {
        super(options);
        this.options = options;
        this.data = data;
        this.dependencies = dependencies;
        this.name = constants_1.CloudJobName.WaitForActiveDatabase;
    }
    async iteration() {
        this.logger.log('Waiting for cloud database active state');
        this.checkSignal();
        this.logger.debug('Fetching cloud database');
        const database = await this.dependencies.cloudDatabaseCapiService.getDatabase(this.options.capiCredentials, {
            subscriptionId: this.data.subscriptionId,
            subscriptionType: this.data.subscriptionType,
            databaseId: this.data.databaseId,
        });
        switch (database === null || database === void 0 ? void 0 : database.status) {
            case models_1.CloudDatabaseStatus.Active:
                this.logger.debug('Cloud database is in the active states');
                this.changeState({ status: models_2.CloudJobStatus.Finished });
                return database;
            case models_1.CloudDatabaseStatus.ImportPending:
            case models_1.CloudDatabaseStatus.ActiveChangePending:
            case models_1.CloudDatabaseStatus.Pending:
            case models_1.CloudDatabaseStatus.Draft:
                this.logger.debug('Cloud database is not in the active state. Scheduling new iteration');
                return await this.runNextIteration();
            case models_1.CloudDatabaseStatus.CreationFailed:
                throw new exceptions_1.CloudDatabaseInFailedStateException();
            case models_1.CloudDatabaseStatus.DeletePending:
            case models_1.CloudDatabaseStatus.Recovery:
            default:
                throw new exceptions_1.CloudDatabaseInUnexpectedStateException();
        }
    }
}
exports.WaitForActiveDatabaseCloudJob = WaitForActiveDatabaseCloudJob;
