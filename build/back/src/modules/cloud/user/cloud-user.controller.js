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
exports.CloudUserController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../common/decorators");
const swagger_1 = require("@nestjs/swagger");
const api_endpoint_decorator_1 = require("../../../decorators/api-endpoint.decorator");
const models_1 = require("./models");
const cloud_user_api_service_1 = require("./cloud-user.api.service");
const models_2 = require("../common/models");
let CloudUserController = class CloudUserController {
    constructor(service) {
        this.service = service;
    }
    async me(sessionMetadata, utm) {
        return this.service.me(sessionMetadata, false, utm);
    }
    async setCurrentAccount(id, sessionMetadata) {
        return this.service.setCurrentAccount(sessionMetadata, id);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Return user general info with accounts list',
        statusCode: 200,
        responses: [{ type: models_1.CloudUser }],
    }),
    __param(0, (0, decorators_1.RequestSessionMetadata)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, models_2.CloudRequestUtm]),
    __metadata("design:returntype", Promise)
], CloudUserController.prototype, "me", null);
__decorate([
    (0, common_1.Put)('/accounts/:id/current'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Activate user account',
        statusCode: 200,
        responses: [{ type: models_1.CloudUser }],
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.RequestSessionMetadata)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CloudUserController.prototype, "setCurrentAccount", null);
CloudUserController = __decorate([
    (0, swagger_1.ApiTags)('Cloud User'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('cloud/me'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [cloud_user_api_service_1.CloudUserApiService])
], CloudUserController);
exports.CloudUserController = CloudUserController;
