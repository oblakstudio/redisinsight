"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkActionSummary = void 0;
class BulkActionSummary {
    constructor() {
        this.processed = 0;
        this.succeed = 0;
        this.failed = 0;
        this.errors = [];
    }
    addProcessed(count) {
        this.processed += count;
    }
    addSuccess(count) {
        this.succeed += count;
    }
    addFailed(count) {
        this.failed += count;
    }
    addErrors(err) {
        if (err.length) {
            this.failed += err.length;
            this.errors = err.concat(this.errors).slice(0, 500);
        }
    }
    getOverview() {
        const overview = {
            processed: this.processed,
            succeed: this.succeed,
            failed: this.failed,
            errors: this.errors,
        };
        this.errors = [];
        return overview;
    }
}
exports.BulkActionSummary = BulkActionSummary;
