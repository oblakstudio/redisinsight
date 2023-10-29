"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoUpdatedStaticsProvider = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs-extra");
const AdmZip = require("adm-zip");
const url_1 = require("url");
const path_1 = require("path");
const lodash_1 = require("lodash");
const utils_1 = require("../../../utils");
let AutoUpdatedStaticsProvider = class AutoUpdatedStaticsProvider {
    constructor(options) {
        this.logger = new common_1.Logger(options.name);
        this.options = options;
    }
    async onModuleInit() {
        await this.initDefaults().catch((e) => this.logger.warn('Unable to populate default data', e));
        this.autoUpdate();
    }
    async initDefaults() {
        try {
            if (!await fs.pathExists((0, path_1.join)(this.options.destinationPath, this.options.buildInfo))) {
                await fs.ensureDir(this.options.destinationPath);
                await fs.copy(this.options.defaultSourcePath, this.options.destinationPath, {
                    overwrite: true,
                });
            }
        }
        catch (e) {
            this.logger.error('Unable to create static files from default', e);
        }
    }
    async autoUpdate() {
        this.logger.log('Checking for updates...');
        if (!this.options.devMode && await this.isUpdatesAvailable()) {
            this.logger.log('Updates available! Updating...');
            try {
                await this.updateStaticFiles();
            }
            catch (e) {
                this.logger.warn('Unable to update auto static files', e);
            }
        }
    }
    async updateStaticFiles() {
        const latestArchive = await this.getLatestArchive();
        if (latestArchive) {
            const zip = new AdmZip(latestArchive);
            await fs.remove(this.options.destinationPath);
            await zip.extractAllTo(this.options.destinationPath, true);
            await fs.writeFile((0, path_1.join)(this.options.destinationPath, this.options.buildInfo), JSON.stringify(await this.getRemoteBuildInfo()));
        }
    }
    async getLatestArchive() {
        try {
            return await (0, utils_1.getFile)(new url_1.URL((0, path_1.join)(this.options.updateUrl, this.options.zip)).toString());
        }
        catch (e) {
            this.logger.warn('Unable to get remote archive', e);
            return null;
        }
    }
    async isUpdatesAvailable() {
        const currentBuildInfo = await this.getCurrentBuildInfo();
        const remoteBuildInfo = await this.getRemoteBuildInfo();
        return (0, lodash_1.get)(remoteBuildInfo, ['timestamp'], 0) > (0, lodash_1.get)(currentBuildInfo, ['timestamp'], 0);
    }
    async getRemoteBuildInfo() {
        try {
            const buildInfoBuffer = await (0, utils_1.getFile)(new url_1.URL((0, path_1.join)(this.options.updateUrl, this.options.buildInfo)).toString());
            return JSON.parse(buildInfoBuffer.toString());
        }
        catch (e) {
            this.logger.warn('Unable to get remote build info', e);
            return {};
        }
    }
    async getCurrentBuildInfo() {
        try {
            return JSON.parse(await fs.readFile((0, path_1.join)(this.options.destinationPath, this.options.buildInfo), 'utf8'));
        }
        catch (e) {
            this.logger.warn('Unable to get local checksum', e);
            return {};
        }
    }
};
AutoUpdatedStaticsProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], AutoUpdatedStaticsProvider);
exports.AutoUpdatedStaticsProvider = AutoUpdatedStaticsProvider;
