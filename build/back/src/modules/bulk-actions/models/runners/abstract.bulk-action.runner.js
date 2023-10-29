"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractBulkActionRunner = void 0;
const bulk_action_progress_1 = require("../bulk-action-progress");
const bulk_action_summary_1 = require("../bulk-action-summary");
class AbstractBulkActionRunner {
    constructor(bulkAction) {
        this.bulkAction = bulkAction;
        this.progress = new bulk_action_progress_1.BulkActionProgress();
        this.summary = new bulk_action_summary_1.BulkActionSummary();
    }
    getProgress() {
        return this.progress;
    }
    getSummary() {
        return this.summary;
    }
}
exports.AbstractBulkActionRunner = AbstractBulkActionRunner;
