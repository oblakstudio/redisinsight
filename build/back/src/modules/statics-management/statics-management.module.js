"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticsManagementModule = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const config_1 = require("../../utils/config");
const auto_updated_statics_provider_1 = require("./providers/auto-updated-statics.provider");
const SERVER_CONFIG = config_1.default.get('server');
const PATH_CONFIG = config_1.default.get('dir_path');
const TUTORIALS_CONFIG = config_1.default.get('tutorials');
const CONTENT_CONFIG = config_1.default.get('content');
const downloadableStaticFiles = (res) => {
    var _a, _b;
    if (((_b = (_a = res.req) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.download) === 'true') {
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment;');
    }
};
let StaticsManagementModule = class StaticsManagementModule {
};
StaticsManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: SERVER_CONFIG.tutorialsUri,
                rootPath: (0, path_1.join)(PATH_CONFIG.tutorials),
                serveStaticOptions: {
                    fallthrough: false,
                    setHeaders: downloadableStaticFiles,
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: SERVER_CONFIG.customTutorialsUri,
                rootPath: (0, path_1.join)(PATH_CONFIG.customTutorials),
                serveStaticOptions: {
                    fallthrough: false,
                    setHeaders: downloadableStaticFiles,
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: SERVER_CONFIG.contentUri,
                rootPath: (0, path_1.join)(PATH_CONFIG.content),
                serveStaticOptions: {
                    fallthrough: false,
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: SERVER_CONFIG.defaultPluginsUri,
                rootPath: (0, path_1.join)(PATH_CONFIG.defaultPlugins),
                serveStaticOptions: {
                    fallthrough: false,
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: SERVER_CONFIG.customPluginsUri,
                rootPath: (0, path_1.join)(PATH_CONFIG.customPlugins),
                serveStaticOptions: {
                    fallthrough: false,
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: SERVER_CONFIG.pluginsAssetsUri,
                rootPath: (0, path_1.join)(PATH_CONFIG.pluginsAssets),
                serveStaticOptions: {
                    fallthrough: false,
                },
            }),
        ],
        providers: [
            {
                provide: 'TutorialsProvider',
                useFactory: () => new auto_updated_statics_provider_1.AutoUpdatedStaticsProvider({
                    name: 'TutorialsProvider',
                    destinationPath: PATH_CONFIG.tutorials,
                    defaultSourcePath: PATH_CONFIG.defaultTutorials,
                    ...TUTORIALS_CONFIG,
                }),
            },
            {
                provide: 'ContentProvider',
                useFactory: () => new auto_updated_statics_provider_1.AutoUpdatedStaticsProvider({
                    name: 'ContentProvider',
                    destinationPath: PATH_CONFIG.content,
                    defaultSourcePath: PATH_CONFIG.defaultContent,
                    ...CONTENT_CONFIG,
                }),
            },
        ],
    })
], StaticsManagementModule);
exports.StaticsManagementModule = StaticsManagementModule;
