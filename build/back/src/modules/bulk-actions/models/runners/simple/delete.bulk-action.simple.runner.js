"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBulkActionSimpleRunner = void 0;
const abstract_bulk_action_simple_runner_1 = require("./abstract.bulk-action.simple.runner");
class DeleteBulkActionSimpleRunner extends abstract_bulk_action_simple_runner_1.AbstractBulkActionSimpleRunner {
    prepareCommands(keys) {
        return keys.map((key) => ['del', key]);
    }
}
exports.DeleteBulkActionSimpleRunner = DeleteBulkActionSimpleRunner;
