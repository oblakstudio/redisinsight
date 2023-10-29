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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
const settings_service_1 = require("./settings.service");
const settings_dto_1 = require("./dto/settings.dto");
let SettingsController = class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async getAppSettings() {
        return this.settingsService.getAppSettings('1');
    }
    async getAgreementsSpec() {
        return this.settingsService.getAgreementsSpec();
    }
    async update(dto) {
        return this.settingsService.updateAppSettings('1', dto);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get info about application settings',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Application settings',
                type: settings_dto_1.GetAppSettingsResponse,
            },
        ],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getAppSettings", null);
__decorate([
    (0, common_1.Get)('/agreements/spec'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get json with agreements specification',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Agreements specification',
                type: settings_dto_1.GetAgreementsSpecResponse,
            },
        ],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getAgreementsSpec", null);
__decorate([
    (0, common_1.Patch)(''),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Update user application settings and agreements',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Application settings',
                type: settings_dto_1.GetAppSettingsResponse,
            },
        ],
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [settings_dto_1.UpdateSettingsDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "update", null);
SettingsController = __decorate([
    (0, swagger_1.ApiTags)('Settings'),
    (0, common_1.Controller)('settings'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
exports.SettingsController = SettingsController;
