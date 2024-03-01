"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractBulkActionSimpleRunner = void 0;
const constants_1 = require("../../../constants");
const abstract_bulk_action_runner_1 = require("../abstract.bulk-action.runner");
const utils_1 = require("../../../../redis/utils");
class AbstractBulkActionSimpleRunner extends abstract_bulk_action_runner_1.AbstractBulkActionRunner {
    constructor(bulkAction, node) {
        super(bulkAction);
        this.node = node;
    }
    async prepareToStart() {
        this.progress.setTotal(await (0, utils_1.getTotalKeys)(this.node));
    }
    async run() {
        while (this.progress.getCursor() > -1
            && this.bulkAction.getStatus() === constants_1.BulkActionStatus.Running) {
            await this.runIteration();
        }
    }
    async runIteration() {
        const keys = await this.getKeysToProcess();
        this.progress.addScanned(this.bulkAction.getFilter().getCount());
        if (keys.length) {
            const commands = this.prepareCommands(keys);
            const res = await this.node.sendPipeline(commands);
            this.processIterationResults(keys, res);
        }
        this.bulkAction.changeState();
    }
    async getKeysToProcess() {
        if (this.progress.getCursor() < 0) {
            return [];
        }
        const [cursorBuffer, keys] = await this.node.sendCommand(['scan', this.progress.getCursor(), ...this.bulkAction.getFilter().getScanArgsArray()]);
        const cursor = parseInt(cursorBuffer, 10);
        this.progress.setCursor(cursor);
        return keys;
    }
    processIterationResults(keys, res) {
        this.summary.addProcessed(res.length);
        const errors = [];
        res.forEach(([err], i) => {
            if (err) {
                errors.push({ key: keys[i], error: err.message });
            }
            else {
                this.summary.addSuccess(1);
            }
        });
        this.summary.addErrors(errors);
    }
}
exports.AbstractBulkActionSimpleRunner = AbstractBulkActionSimpleRunner;
