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
exports.CustomTutorialService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const custom_tutorial_repository_1 = require("./repositories/custom-tutorial.repository");
const custom_tutorial_1 = require("./models/custom-tutorial");
const class_transformer_1 = require("class-transformer");
const error_messages_1 = require("../../constants/error-messages");
const custom_tutorial_fs_provider_1 = require("./providers/custom-tutorial.fs.provider");
const custom_tutorial_manifest_provider_1 = require("./providers/custom-tutorial.manifest.provider");
const custom_tutorial_manifest_1 = require("./models/custom-tutorial.manifest");
const utils_1 = require("../../common/utils");
const path_1 = require("path");
const lodash_1 = require("lodash");
const URL = require("url");
const class_validator_1 = require("class-validator");
const custom_tutorial_analytics_1 = require("./custom-tutorial.analytics");
let CustomTutorialService = class CustomTutorialService {
    constructor(customTutorialRepository, customTutorialFsProvider, customTutorialManifestProvider, analytics) {
        this.customTutorialRepository = customTutorialRepository;
        this.customTutorialFsProvider = customTutorialFsProvider;
        this.customTutorialManifestProvider = customTutorialManifestProvider;
        this.analytics = analytics;
        this.logger = new common_1.Logger('CustomTutorialService');
        this.validator = new class_validator_1.Validator();
        this.exceptionFactory = (new common_1.ValidationPipe()).createExceptionFactory();
    }
    async validateManifestJson(path) {
        const manifest = await this.customTutorialManifestProvider.getOriginalManifestJson(path);
        if (!manifest && await this.customTutorialManifestProvider.isOriginalManifestExists(path)) {
            throw new common_1.BadRequestException('Unable to parse manifest.json file');
        }
        if (manifest) {
            if (!(0, lodash_1.isPlainObject)(manifest)) {
                throw new common_1.BadRequestException('Manifest json should be an object');
            }
            const errors = await this.validator.validate((0, class_transformer_1.plainToClass)(custom_tutorial_manifest_1.RootCustomTutorialManifest, manifest), { whitelist: true });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                throw this.exceptionFactory(errors);
            }
        }
    }
    async determineTutorialName(path, link) {
        const manifest = await this.customTutorialManifestProvider.getManifestJson(path);
        if (!(manifest === null || manifest === void 0 ? void 0 : manifest.label)) {
            return (0, path_1.parse)(URL.parse(link).pathname).name;
        }
        return manifest.label;
    }
    async create(dto) {
        var _a;
        try {
            let tmpPath = '';
            if (dto.file) {
                tmpPath = await this.customTutorialFsProvider.unzipFromMemoryStoredFile(dto.file);
            }
            else if (dto.link) {
                tmpPath = await this.customTutorialFsProvider.unzipFromExternalLink(dto.link);
            }
            else {
                throw new common_1.BadRequestException('File or external link should be provided');
            }
            await this.validateManifestJson(tmpPath);
            const model = (0, class_transformer_1.plainToClass)(custom_tutorial_1.CustomTutorial, {
                ...dto,
                id: (0, uuid_1.v4)(),
            });
            await this.customTutorialFsProvider.moveFolder(tmpPath, model.absolutePath);
            model.name = await this.determineTutorialName(model.absolutePath, ((_a = dto === null || dto === void 0 ? void 0 : dto.file) === null || _a === void 0 ? void 0 : _a.originalName) || dto.link);
            const tutorial = await this.customTutorialRepository.create(model);
            this.analytics.sendImportSucceeded({
                manifest: !!(await this.customTutorialManifestProvider.getOriginalManifestJson(tutorial.absolutePath)),
            });
            return await this.customTutorialManifestProvider.generateTutorialManifest(tutorial);
        }
        catch (e) {
            this.analytics.sendImportFailed(e);
            this.logger.error('Unable to create custom tutorials', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async getGlobalManifest() {
        const children = [];
        try {
            const tutorials = await this.customTutorialRepository.list();
            const manifests = await Promise.all(tutorials.map(this.customTutorialManifestProvider.generateTutorialManifest.bind(this.customTutorialManifestProvider)));
            manifests.forEach((manifest) => {
                if (manifest) {
                    children.push(manifest);
                }
            });
        }
        catch (e) {
            this.logger.warn('Unable to generate entire custom tutorials manifest', e);
        }
        return {
            type: custom_tutorial_manifest_1.CustomTutorialManifestType.Group,
            id: 'custom-tutorials',
            label: 'MY TUTORIALS',
            _actions: [custom_tutorial_1.CustomTutorialActions.CREATE],
            args: {
                withBorder: true,
                initialIsOpen: true,
            },
            children,
        };
    }
    async get(id) {
        const model = await this.customTutorialRepository.get(id);
        if (!model) {
            this.logger.error(`Custom Tutorial with ${id} was not Found`);
            throw new common_1.NotFoundException(error_messages_1.default.CUSTOM_TUTORIAL_NOT_FOUND);
        }
        return model;
    }
    async delete(id) {
        try {
            const tutorial = await this.get(id);
            await this.customTutorialRepository.delete(id);
            await this.customTutorialFsProvider.removeFolder(tutorial.absolutePath);
        }
        catch (e) {
            this.logger.error('Unable to delete custom tutorial', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
};
CustomTutorialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [custom_tutorial_repository_1.CustomTutorialRepository,
        custom_tutorial_fs_provider_1.CustomTutorialFsProvider,
        custom_tutorial_manifest_provider_1.CustomTutorialManifestProvider,
        custom_tutorial_analytics_1.CustomTutorialAnalytics])
], CustomTutorialService);
exports.CustomTutorialService = CustomTutorialService;
