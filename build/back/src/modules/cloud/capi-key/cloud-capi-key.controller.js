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
exports.CloudCapiKeyController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../common/decorators");
const swagger_1 = require("@nestjs/swagger");
const api_endpoint_decorator_1 = require("../../../decorators/api-endpoint.decorator");
const model_1 = require("./model");
const cloud_capi_key_service_1 = require("./cloud-capi-key.service");
let CloudCapiKeyController = class CloudCapiKeyController {
    constructor(service) {
        this.service = service;
    }
    async list(sessionMetadata) {
        return this.service.list(sessionMetadata);
    }
    async delete(sessionMetadata, id) {
        return this.service.delete(sessionMetadata, id);
    }
    async deleteAll(sessionMetadata) {
        return this.service.deleteAll(sessionMetadata);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Return list of user\'s existing capi keys',
        statusCode: 200,
        responses: [{ type: model_1.CloudCapiKey, isArray: true }],
    }),
    __param(0, (0, decorators_1.RequestSessionMetadata)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CloudCapiKeyController.prototype, "list", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Removes user\'s capi keys by id',
        statusCode: 200,
    }),
    __param(0, (0, decorators_1.RequestSessionMetadata)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CloudCapiKeyController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Removes all user\'s capi keys',
        statusCode: 200,
    }),
    __param(0, (0, decorators_1.RequestSessionMetadata)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CloudCapiKeyController.prototype, "deleteAll", null);
CloudCapiKeyController = __decorate([
    (0, swagger_1.ApiTags)('Cloud CAPI keys'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('cloud/me/capi-keys'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [cloud_capi_key_service_1.CloudCapiKeyService])
], CloudCapiKeyController);
exports.CloudCapiKeyController = CloudCapiKeyController;
