"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkActionProgress = void 0;
class BulkActionProgress {
    constructor() {
        this.total = 0;
        this.scanned = 0;
        this.cursor = 0;
    }
    setTotal(total) {
        this.total = total;
    }
    setCursor(cursor) {
        if (cursor === 0) {
            this.scanned = this.total;
            this.cursor = -1;
        }
        else {
            this.cursor = cursor;
        }
    }
    getCursor() {
        return this.cursor;
    }
    addScanned(scanned) {
        this.scanned += scanned;
        if (this.scanned > this.total) {
            this.scanned = this.total;
        }
    }
    getOverview() {
        return {
            total: this.total,
            scanned: this.scanned,
        };
    }
}
exports.BulkActionProgress = BulkActionProgress;
