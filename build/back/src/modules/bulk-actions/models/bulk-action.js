"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkAction = void 0;
const lodash_1 = require("lodash");
const constants_1 = require("../constants");
const common_1 = require("@nestjs/common");
const client_1 = require("../../redis/client");
class BulkAction {
    constructor(id, databaseId, type, filter, socket, analytics) {
        this.id = id;
        this.databaseId = databaseId;
        this.type = type;
        this.filter = filter;
        this.socket = socket;
        this.analytics = analytics;
        this.logger = new common_1.Logger('BulkAction');
        this.startTime = Date.now();
        this.runners = [];
        this.debounce = (0, lodash_1.debounce)(this.sendOverview.bind(this), 1000, { maxWait: 1000 });
        this.status = constants_1.BulkActionStatus.Initialized;
    }
    async prepare(redisClient, RunnerClassName) {
        if (this.status !== constants_1.BulkActionStatus.Initialized) {
            throw new Error(`Unable to prepare bulk action with "${this.status}" status`);
        }
        this.status = constants_1.BulkActionStatus.Preparing;
        this.runners = (await redisClient.nodes(client_1.RedisClientNodeRole.PRIMARY)).map((node) => new RunnerClassName(this, node));
        await Promise.all(this.runners.map((runner) => runner.prepareToStart()));
        this.status = constants_1.BulkActionStatus.Ready;
    }
    async start() {
        if (this.status !== constants_1.BulkActionStatus.Ready) {
            throw new Error(`Unable to start bulk action with "${this.status}" status`);
        }
        this.run().catch();
        return this.getOverview();
    }
    async run() {
        try {
            this.setStatus(constants_1.BulkActionStatus.Running);
            await Promise.all(this.runners.map((runner) => runner.run()));
            this.setStatus(constants_1.BulkActionStatus.Completed);
        }
        catch (e) {
            this.logger.error('Error on BulkAction Runner', e);
            this.error = e;
            this.setStatus(constants_1.BulkActionStatus.Failed);
        }
    }
    getOverview() {
        const progress = this.runners.map((runner) => runner.getProgress().getOverview())
            .reduce((cur, prev) => ({
            total: prev.total + cur.total,
            scanned: prev.scanned + cur.scanned,
        }), {
            total: 0,
            scanned: 0,
        });
        const summary = this.runners.map((runner) => runner.getSummary().getOverview())
            .reduce((cur, prev) => ({
            processed: prev.processed + cur.processed,
            succeed: prev.succeed + cur.succeed,
            failed: prev.failed + cur.failed,
            errors: prev.errors.concat(cur.errors),
        }), {
            processed: 0,
            succeed: 0,
            failed: 0,
            errors: [],
        });
        summary.errors = summary.errors.slice(0, 500).map((error) => ({
            key: error.key.toString(),
            error: error.error.toString(),
        }));
        return {
            id: this.id,
            databaseId: this.databaseId,
            type: this.type,
            duration: (this.endTime || Date.now()) - this.startTime,
            status: this.status,
            filter: this.filter.getOverview(),
            progress,
            summary,
        };
    }
    getId() {
        return this.id;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        switch (this.status) {
            case constants_1.BulkActionStatus.Completed:
            case constants_1.BulkActionStatus.Failed:
            case constants_1.BulkActionStatus.Aborted:
                return;
            default:
                this.status = status;
        }
        switch (status) {
            case constants_1.BulkActionStatus.Aborted:
            case constants_1.BulkActionStatus.Failed:
            case constants_1.BulkActionStatus.Completed:
                if (!this.endTime) {
                    this.endTime = Date.now();
                }
            default:
                this.changeState();
        }
    }
    getFilter() {
        return this.filter;
    }
    getSocket() {
        return this.socket;
    }
    changeState() {
        this.debounce();
    }
    sendOverview() {
        const overview = this.getOverview();
        if (overview.status === constants_1.BulkActionStatus.Completed) {
            this.analytics.sendActionSucceed(overview);
        }
        if (overview.status === constants_1.BulkActionStatus.Failed) {
            this.analytics.sendActionFailed(overview, this.error);
        }
        if (overview.status === constants_1.BulkActionStatus.Aborted) {
            this.analytics.sendActionStopped(overview);
        }
        try {
            this.socket.emit('overview', overview);
        }
        catch (e) {
            this.logger.error('Unable to send overview', e);
        }
    }
}
exports.BulkAction = BulkAction;
