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
exports.FeatureController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
const feature_service_1 = require("./feature.service");
const features_config_service_1 = require("./features-config.service");
let FeatureController = class FeatureController {
    constructor(featureService, featuresConfigService) {
        this.featureService = featureService;
        this.featuresConfigService = featuresConfigService;
    }
    async list() {
        return this.featureService.list();
    }
    async sync() {
        return this.featuresConfigService.sync();
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get list of features',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Get list of features',
            },
        ],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeatureController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('/sync'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeatureController.prototype, "sync", null);
FeatureController = __decorate([
    (0, swagger_1.ApiTags)('Info'),
    (0, common_1.Controller)('features'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [feature_service_1.FeatureService,
        features_config_service_1.FeaturesConfigService])
], FeatureController);
exports.FeatureController = FeatureController;
