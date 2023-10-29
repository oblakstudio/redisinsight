"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTutorialManifestProvider = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const lodash_1 = require("lodash");
const fs = require("fs-extra");
const custom_tutorial_manifest_1 = require("../models/custom-tutorial.manifest");
const class_transformer_1 = require("class-transformer");
const utils_1 = require("../../../utils");
const MANIFEST_FILE = 'manifest.json';
const SYS_MANIFEST_FILE = '_manifest.json';
let CustomTutorialManifestProvider = class CustomTutorialManifestProvider {
    constructor() {
        this.logger = new common_1.Logger('CustomTutorialManifestProvider');
    }
    async generateManifestFile(path) {
        try {
            const manifest = {
                children: await this.generateManifestEntry(path, '/'),
            };
            await fs.writeFile((0, path_1.join)(path, SYS_MANIFEST_FILE), JSON.stringify(manifest), 'utf8');
            return manifest;
        }
        catch (e) {
            this.logger.warn('Unable to automatically generate manifest file', e);
            return null;
        }
    }
    async generateManifestEntry(path, relativePath = '/') {
        const manifest = [];
        const entries = await fs.readdir(path);
        for (let i = 0; i < entries.length; i += 1) {
            const entry = entries[i];
            if (entry.startsWith('.') || entry.startsWith('_')) {
                continue;
            }
            const isDirectory = (await fs.lstat((0, path_1.join)(path, entry))).isDirectory();
            const { name, ext } = (0, path_1.parse)(entry);
            if (isDirectory) {
                manifest.push({
                    id: entry,
                    label: name,
                    type: custom_tutorial_manifest_1.CustomTutorialManifestType.Group,
                    children: await this.generateManifestEntry((0, path_1.join)(path, entry), (0, path_1.join)(relativePath, entry)),
                });
            }
            else if (ext === '.md') {
                manifest.push({
                    id: entry,
                    label: name,
                    type: custom_tutorial_manifest_1.CustomTutorialManifestType.InternalLink,
                    args: {
                        path: (0, utils_1.winPathToNormalPath)((0, path_1.join)(relativePath, entry)),
                    },
                });
            }
        }
        return manifest;
    }
    async isOriginalManifestExists(path) {
        return fs.existsSync((0, path_1.join)(path, MANIFEST_FILE));
    }
    async getOriginalManifestJson(path) {
        try {
            return JSON.parse(await fs.readFile((0, path_1.join)(path, MANIFEST_FILE), 'utf8'));
        }
        catch (e) {
            this.logger.warn('Unable to find original manifest.json');
        }
        return null;
    }
    async getManifestJsonFile(path) {
        const manifest = await this.getOriginalManifestJson(path);
        if (manifest) {
            return manifest;
        }
        try {
            return JSON.parse(await fs.readFile((0, path_1.join)(path, SYS_MANIFEST_FILE), 'utf8'));
        }
        catch (e) {
            this.logger.warn('Unable to get _manifest for tutorial');
        }
        return await this.generateManifestFile(path);
    }
    async getManifestJson(path) {
        try {
            const manifestJson = await this.getManifestJsonFile(path);
            if (!(0, lodash_1.isPlainObject)(manifestJson)) {
                return null;
            }
            return (0, class_transformer_1.plainToClass)(custom_tutorial_manifest_1.RootCustomTutorialManifest, manifestJson, { excludeExtraneousValues: true });
        }
        catch (e) {
            this.logger.warn('Unable to get manifest for tutorial');
            return null;
        }
    }
    async generateTutorialManifest(tutorial) {
        try {
            const manifest = await this.getManifestJson(tutorial.absolutePath) || {};
            return {
                ...manifest,
                _actions: tutorial.actions,
                _path: tutorial.path,
                type: custom_tutorial_manifest_1.CustomTutorialManifestType.Group,
                id: tutorial.id,
                label: tutorial.name || (manifest === null || manifest === void 0 ? void 0 : manifest.label),
                children: (manifest === null || manifest === void 0 ? void 0 : manifest.children) || [],
            };
        }
        catch (e) {
            this.logger.warn('Unable to generate manifest for tutorial', e);
            return null;
        }
    }
};
CustomTutorialManifestProvider = __decorate([
    (0, common_1.Injectable)()
], CustomTutorialManifestProvider);
exports.CustomTutorialManifestProvider = CustomTutorialManifestProvider;
