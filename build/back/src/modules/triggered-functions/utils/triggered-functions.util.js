"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLibraryFunctions = exports.getShortLibraryInformation = exports.getLibraryInformation = void 0;
const lodash_1 = require("lodash");
const models_1 = require("../models");
const utils_1 = require("../../redis/utils");
const getFunctionDetails = (functions, type, libName) => functions.map((reply) => {
    if (type === models_1.FunctionType.ClusterFunction) {
        return ({
            name: reply,
            type,
            library: libName,
        });
    }
    const func = (0, utils_1.convertArrayReplyToObject)(reply);
    return ({
        name: func.name,
        success: func.num_success,
        fail: func.num_failed,
        total: func.num_trigger,
        isAsync: func.is_async,
        flags: func.flags,
        lastError: func.last_error,
        lastExecutionTime: func.last_execution_time,
        totalExecutionTime: func.total_execution_time,
        prefix: func.prefix,
        trim: func.trim,
        window: func.window,
        description: func.description,
        type,
        library: libName,
    });
});
const getFunctionName = (functions, type) => functions.map((reply) => ({
    name: reply,
    type,
}));
const getFunctionNames = (lib) => {
    const functionGroups = Object.values(models_1.FunctionType).map((type) => getFunctionName(lib[type] || [], type));
    return (0, lodash_1.concat)(...functionGroups);
};
const collectFunctions = (lib) => {
    const functionGroups = Object.values(models_1.FunctionType).map((type) => getFunctionDetails(lib[type] || [], type, lib.name));
    return (0, lodash_1.concat)(...functionGroups);
};
const getTotalFunctions = (lib) => (Object.values(models_1.FunctionType).reduce((prev, cur) => { var _a; return prev + (((_a = lib[cur]) === null || _a === void 0 ? void 0 : _a.length) || 0); }, 0));
const getLibraryInformation = (lib) => {
    const library = (0, utils_1.convertArrayReplyToObject)(lib);
    const functions = getFunctionNames(library);
    return ({
        name: library.name,
        apiVersion: library.api_version,
        user: library.user,
        pendingJobs: library.pending_jobs,
        configuration: library.configuration,
        code: library.code,
        functions,
    });
};
exports.getLibraryInformation = getLibraryInformation;
const getShortLibraryInformation = (lib) => {
    const library = (0, utils_1.convertArrayReplyToObject)(lib);
    const totalFunctions = getTotalFunctions(library);
    return ({
        name: library.name,
        user: library.user,
        pendingJobs: library.pending_jobs,
        totalFunctions,
    });
};
exports.getShortLibraryInformation = getShortLibraryInformation;
const getLibraryFunctions = (lib) => collectFunctions((0, utils_1.convertArrayReplyToObject)(lib));
exports.getLibraryFunctions = getLibraryFunctions;
