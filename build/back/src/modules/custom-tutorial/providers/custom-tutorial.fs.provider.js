"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CustomTutorialFsProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTutorialFsProvider = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const uuid_1 = require("uuid");
const fs = require("fs-extra");
const config_1 = require("../../../utils/config");
const AdmZip = require("adm-zip");
const axios_1 = require("axios");
const utils_1 = require("../../../common/utils");
const error_messages_1 = require("../../../constants/error-messages");
const PATH_CONFIG = config_1.default.get('dir_path');
const TMP_FOLDER = `${PATH_CONFIG.tmpDir}/RedisInsight/custom-tutorials`;
let CustomTutorialFsProvider = CustomTutorialFsProvider_1 = class CustomTutorialFsProvider {
    constructor() {
        this.logger = new common_1.Logger('CustomTutorialFsProvider');
    }
    async extractAll(zip, targetPath, overwrite = true, keepOriginalPermission = false) {
        zip.getEntries().forEach((entry) => {
            if (!entry.entryName.includes('__MACOSX')) {
                zip.extractEntryTo(entry, targetPath, true, overwrite, keepOriginalPermission);
            }
        });
    }
    async unzipToTmpFolder(zip) {
        try {
            const path = await CustomTutorialFsProvider_1.prepareTmpFolder();
            await fs.remove(path);
            await this.extractAll(zip, path, true);
            return CustomTutorialFsProvider_1.prepareTutorialFolder(path);
        }
        catch (e) {
            this.logger.error('Unable to unzip archive', e);
            throw new common_1.InternalServerErrorException(e.message);
        }
    }
    async unzipFromMemoryStoredFile(file) {
        return this.unzipToTmpFolder(new AdmZip(file.buffer));
    }
    async unzipFromExternalLink(link) {
        try {
            const { data } = await axios_1.default.get(link, {
                responseType: 'arraybuffer',
            });
            return this.unzipToTmpFolder(new AdmZip(data));
        }
        catch (e) {
            this.logger.error('Unable to fetch zip file from external source');
            throw (0, utils_1.wrapHttpError)(e, error_messages_1.default.CUSTOM_TUTORIAL_UNABLE_TO_FETCH_FROM_EXTERNAL);
        }
    }
    async moveFolder(tmpPath, dest, force = false) {
        try {
            if (force && await fs.pathExists(dest)) {
                await fs.remove(dest);
            }
            await fs.move(tmpPath, dest);
        }
        catch (e) {
            this.logger.error('Unable to move tutorial to a folder', e);
            throw new common_1.InternalServerErrorException(e.message);
        }
    }
    async removeFolder(path) {
        try {
            await fs.remove(path);
        }
        catch (e) {
            this.logger.warn('Unable to delete tutorial folder', e);
        }
    }
    static async prepareTmpFolder() {
        const path = (0, path_1.join)(TMP_FOLDER, (0, uuid_1.v4)());
        await fs.ensureDir(path);
        return path;
    }
    static async prepareTutorialFolder(path) {
        const entries = await fs.readdir(path);
        const firstEntryPath = (0, path_1.join)(path, entries[0] || '');
        if ((entries === null || entries === void 0 ? void 0 : entries.length) === 1 && (await fs.lstat(firstEntryPath)).isDirectory()) {
            const newPath = await CustomTutorialFsProvider_1.prepareTmpFolder();
            await fs.copy(firstEntryPath, newPath);
            return newPath;
        }
        return path;
    }
};
CustomTutorialFsProvider = CustomTutorialFsProvider_1 = __decorate([
    (0, common_1.Injectable)()
], CustomTutorialFsProvider);
exports.CustomTutorialFsProvider = CustomTutorialFsProvider;
