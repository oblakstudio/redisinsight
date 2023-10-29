"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CustomTutorialModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTutorialModule = void 0;
const common_1 = require("@nestjs/common");
const custom_tutorial_controller_1 = require("./custom-tutorial.controller");
const custom_tutorial_service_1 = require("./custom-tutorial.service");
const custom_tutorial_fs_provider_1 = require("./providers/custom-tutorial.fs.provider");
const custom_tutorial_manifest_provider_1 = require("./providers/custom-tutorial.manifest.provider");
const custom_tutorial_repository_1 = require("./repositories/custom-tutorial.repository");
const local_custom_tutorial_repository_1 = require("./repositories/local.custom-tutorial.repository");
const custom_tutorial_analytics_1 = require("./custom-tutorial.analytics");
let CustomTutorialModule = CustomTutorialModule_1 = class CustomTutorialModule {
    static register(repository = local_custom_tutorial_repository_1.LocalCustomTutorialRepository) {
        return {
            module: CustomTutorialModule_1,
            controllers: [custom_tutorial_controller_1.CustomTutorialController],
            providers: [
                custom_tutorial_service_1.CustomTutorialService,
                custom_tutorial_fs_provider_1.CustomTutorialFsProvider,
                custom_tutorial_manifest_provider_1.CustomTutorialManifestProvider,
                custom_tutorial_analytics_1.CustomTutorialAnalytics,
                {
                    provide: custom_tutorial_repository_1.CustomTutorialRepository,
                    useClass: repository,
                },
            ],
        };
    }
};
CustomTutorialModule = CustomTutorialModule_1 = __decorate([
    (0, common_1.Module)({})
], CustomTutorialModule);
exports.CustomTutorialModule = CustomTutorialModule;
