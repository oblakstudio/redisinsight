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
exports.CloudAuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_endpoint_decorator_1 = require("../../../decorators/api-endpoint.decorator");
const decorators_1 = require("../../../common/decorators");
const cloud_auth_service_1 = require("./cloud-auth.service");
let CloudAuthController = class CloudAuthController {
    constructor(cloudAuthService) {
        this.cloudAuthService = cloudAuthService;
    }
    async callback(query) {
        return this.cloudAuthService.handleCallback(query);
    }
    async logout(sessionMetadata) {
        return this.cloudAuthService.logout(sessionMetadata);
    }
};
__decorate([
    (0, common_1.Get)('oauth/callback'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'OAuth callback',
        statusCode: 200,
    }),
    (0, common_1.Render)('cloud_oauth_callback'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CloudAuthController.prototype, "callback", null);
__decorate([
    (0, common_1.Get)('logout'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Logout user',
        statusCode: 200,
    }),
    __param(0, (0, decorators_1.RequestSessionMetadata)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CloudAuthController.prototype, "logout", null);
CloudAuthController = __decorate([
    (0, swagger_1.ApiTags)('Cloud Auth'),
    (0, common_1.Controller)('cloud'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [cloud_auth_service_1.CloudAuthService])
], CloudAuthController);
exports.CloudAuthController = CloudAuthController;
