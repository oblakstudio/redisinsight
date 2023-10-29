"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const file_helper_1 = require("../src/utils/file-helper");
const config_1 = require("../src/utils/config");
const PATH_CONFIG = (0, config_1.get)('dir_path');
const CONTENT_CONFIG = (0, config_1.get)('content');
const archiveUrl = new URL(path.join(CONTENT_CONFIG.updateUrl, CONTENT_CONFIG.zip)).toString();
const buildInfoUrl = new URL(path.join(CONTENT_CONFIG.updateUrl, CONTENT_CONFIG.buildInfo)).toString();
async function init() {
    try {
        const data = await (0, file_helper_1.getFile)(archiveUrl);
        await (0, file_helper_1.updateFolderFromArchive)(PATH_CONFIG.defaultContent, data);
        const buildInfo = await (0, file_helper_1.getFile)(buildInfoUrl);
        await (0, file_helper_1.updateFile)(PATH_CONFIG.defaultContent, CONTENT_CONFIG.buildInfo, buildInfo);
        process.exit(0);
    }
    catch (e) {
        console.error('Something went wrong trying to get default commands jsons', e);
        process.exit(1);
    }
}
init();
