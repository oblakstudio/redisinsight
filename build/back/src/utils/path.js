"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winPathToNormalPath = void 0;
const winPathToNormalPath = (path) => path.replace(/\\/g, '/');
exports.winPathToNormalPath = winPathToNormalPath;
