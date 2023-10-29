"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRedisModule = exports.AppTool = exports.ReplyError = exports.RedisError = void 0;
class RedisError extends Error {
}
exports.RedisError = RedisError;
class ReplyError extends RedisError {
}
exports.ReplyError = ReplyError;
var AppTool;
(function (AppTool) {
    AppTool["Common"] = "Common";
    AppTool["Browser"] = "Browser";
    AppTool["CLI"] = "CLI";
    AppTool["Workbench"] = "Workbench";
})(AppTool = exports.AppTool || (exports.AppTool = {}));
class IRedisModule {
}
exports.IRedisModule = IRedisModule;
