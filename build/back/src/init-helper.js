"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGuidesFolder = exports.migrateHomeFolder = void 0;
const fs = require("fs-extra");
const path_1 = require("path");
const config_1 = require("./utils/config");
const PATH_CONFIG = config_1.default.get('dir_path');
const DB_CONFIG = config_1.default.get('db');
const copySource = async (source, destination) => {
    if (await fs.pathExists(source)) {
        await fs.copy(source, destination).catch();
    }
};
const migrateHomeFolder = async () => {
    try {
        if (!(await fs.pathExists(DB_CONFIG.database)) && await fs.pathExists(PATH_CONFIG.prevHomedir)) {
            await fs.ensureDir(PATH_CONFIG.homedir);
            await Promise.all([
                'redisinsight.db',
                'plugins',
                'custom-tutorials',
            ].map((target) => copySource((0, path_1.join)(PATH_CONFIG.prevHomedir, target), (0, path_1.join)(PATH_CONFIG.homedir, target))));
        }
    }
    catch (e) {
    }
};
exports.migrateHomeFolder = migrateHomeFolder;
const removeGuidesFolder = async () => {
    try {
        if (await fs.pathExists(PATH_CONFIG.guides)) {
            await fs.rm(PATH_CONFIG.guides, { recursive: true, force: true });
        }
    }
    catch (e) {
    }
};
exports.removeGuidesFolder = removeGuidesFolder;
