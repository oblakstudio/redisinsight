"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnsupportedCommands = exports.CliToolUnsupportedCommands = void 0;
const config_1 = require("../../../utils/config");
const REDIS_CLI_CONFIG = config_1.default.get('redis_cli');
var CliToolUnsupportedCommands;
(function (CliToolUnsupportedCommands) {
    CliToolUnsupportedCommands["Monitor"] = "monitor";
    CliToolUnsupportedCommands["Subscribe"] = "subscribe";
    CliToolUnsupportedCommands["PSubscribe"] = "psubscribe";
    CliToolUnsupportedCommands["SSubscribe"] = "ssubscribe";
    CliToolUnsupportedCommands["Sync"] = "sync";
    CliToolUnsupportedCommands["PSync"] = "psync";
    CliToolUnsupportedCommands["ScriptDebug"] = "script debug";
    CliToolUnsupportedCommands["Hello3"] = "hello 3";
})(CliToolUnsupportedCommands = exports.CliToolUnsupportedCommands || (exports.CliToolUnsupportedCommands = {}));
const getUnsupportedCommands = () => [
    ...Object.values(CliToolUnsupportedCommands),
    ...REDIS_CLI_CONFIG.unsupportedCommands,
];
exports.getUnsupportedCommands = getUnsupportedCommands;
