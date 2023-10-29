"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFile = exports.updateFolderFromArchive = exports.getFile = void 0;
const axios_1 = require("axios");
const fs = require("fs-extra");
const AdmZip = require("adm-zip");
const path_1 = require("path");
const getFile = async (url) => {
    const { data } = await axios_1.default.get(url, {
        responseType: 'arraybuffer',
    });
    return data;
};
exports.getFile = getFile;
const updateFolderFromArchive = async (path, data) => {
    await fs.remove(path);
    await fs.ensureDir(path);
    const zip = new AdmZip(data);
    zip.extractAllTo(path, true);
};
exports.updateFolderFromArchive = updateFolderFromArchive;
const updateFile = async (path, fileName, data) => {
    await fs.ensureDir(path);
    const buildInfoPath = (0, path_1.join)(path, fileName);
    await fs.writeFile(buildInfoPath, data);
};
exports.updateFile = updateFile;
