"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertREClusterModuleName = void 0;
const constants_1 = require("../../../constants");
function convertREClusterModuleName(name) {
    var _a;
    return (_a = constants_1.RE_CLUSTER_MODULES_NAMES[name]) !== null && _a !== void 0 ? _a : name;
}
exports.convertREClusterModuleName = convertREClusterModuleName;
