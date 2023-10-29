"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const fs_1 = require("fs");
const config_1 = require("../../utils/config");
const path = require("path");
const lodash_1 = require("lodash");
const plugin_response_1 = require("./plugin.response");
const PATH_CONFIG = config_1.default.get('dir_path');
const SERVER_CONFIG = config_1.default.get('server');
let PluginService = class PluginService {
    constructor() {
        this.logger = new common_1.Logger('PluginService');
        this.validator = new class_validator_1.Validator();
    }
    async getAll() {
        return {
            static: path.posix.join(SERVER_CONFIG.pluginsAssetsUri),
            plugins: [
                ...(await this.scanPluginsFolder(PATH_CONFIG.defaultPlugins, SERVER_CONFIG.defaultPluginsUri, true)),
                ...(await this.scanPluginsFolder(PATH_CONFIG.customPlugins, SERVER_CONFIG.customPluginsUri)),
            ],
        };
    }
    async scanPluginsFolder(pluginsFolder, urlPrefix, internal = false) {
        const plugins = (0, fs_1.existsSync)(pluginsFolder) ? (0, fs_1.readdirSync)(pluginsFolder) : [];
        return (0, lodash_1.filter)(await Promise.all(plugins.map(async (pluginFolder) => {
            try {
                const manifest = JSON.parse((0, fs_1.readFileSync)(path.join(pluginsFolder, pluginFolder, 'package.json'), 'utf8'));
                const plugin = (0, class_transformer_1.plainToClass)(plugin_response_1.Plugin, manifest);
                await this.validator.validateOrReject(plugin, {
                    whitelist: true,
                });
                plugin.internal = internal || undefined;
                plugin.baseUrl = path.posix.join(urlPrefix, pluginFolder, '/');
                plugin.main = path.posix.join(urlPrefix, pluginFolder, manifest.main);
                if (plugin.styles) {
                    plugin.styles = path.posix.join(urlPrefix, pluginFolder, manifest.styles);
                }
                return plugin;
            }
            catch (error) {
                this.logger.error(`Error when trying to process plugin ${pluginFolder}`, error);
                return undefined;
            }
        })), (plugin) => !!plugin);
    }
};
PluginService = __decorate([
    (0, common_1.Injectable)()
], PluginService);
exports.PluginService = PluginService;
