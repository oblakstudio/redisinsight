"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnsupportedCommands = exports.WorkbenchToolUnsupportedCommands = void 0;
const config_1 = require("../../../utils/config");
const WORKBENCH_CONFIG = config_1.default.get('workbench');
var WorkbenchToolUnsupportedCommands;
(function (WorkbenchToolUnsupportedCommands) {
    WorkbenchToolUnsupportedCommands["Monitor"] = "monitor";
    WorkbenchToolUnsupportedCommands["Subscribe"] = "subscribe";
    WorkbenchToolUnsupportedCommands["PSubscribe"] = "psubscribe";
    WorkbenchToolUnsupportedCommands["SSubscribe"] = "ssubscribe";
    WorkbenchToolUnsupportedCommands["Sync"] = "sync";
    WorkbenchToolUnsupportedCommands["PSync"] = "psync";
    WorkbenchToolUnsupportedCommands["ScriptDebug"] = "script debug";
    WorkbenchToolUnsupportedCommands["Select"] = "select";
    WorkbenchToolUnsupportedCommands["Hello3"] = "hello 3";
})(WorkbenchToolUnsupportedCommands = exports.WorkbenchToolUnsupportedCommands || (exports.WorkbenchToolUnsupportedCommands = {}));
const getUnsupportedCommands = () => [
    ...Object.values(WorkbenchToolUnsupportedCommands),
    ...WORKBENCH_CONFIG.unsupportedCommands,
];
exports.getUnsupportedCommands = getUnsupportedCommands;
