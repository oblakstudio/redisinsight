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
exports.TriggeredFunctionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_redis_instance_operation_decorator_1 = require("../../decorators/api-redis-instance-operation.decorator");
const triggered_functions_service_1 = require("./triggered-functions.service");
const models_1 = require("./models");
const dto_1 = require("./dto");
const models_2 = require("../../common/models");
const decorators_1 = require("../../common/decorators");
let TriggeredFunctionsController = class TriggeredFunctionsController {
    constructor(service) {
        this.service = service;
    }
    async libraryList(clientMetadata) {
        return this.service.libraryList(clientMetadata);
    }
    async details(clientMetadata, dto) {
        return this.service.details(clientMetadata, dto.libraryName);
    }
    async functionsList(clientMetadata) {
        return this.service.functionsList(clientMetadata);
    }
    async upload(clientMetadata, dto) {
        return this.service.upload(clientMetadata, dto);
    }
    async upgrade(clientMetadata, dto) {
        return this.service.upload(clientMetadata, dto, true);
    }
    async deleteLibraries(clientMetadata, dto) {
        return await this.service.delete(clientMetadata, dto.libraryName);
    }
};
__decorate([
    (0, common_1.Get)('/libraries'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Returns short libraries information',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Returns libraries',
                type: models_1.ShortLibrary,
            },
        ],
    }),
    __param(0, (0, decorators_1.ClientMetadataParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_2.ClientMetadata]),
    __metadata("design:returntype", Promise)
], TriggeredFunctionsController.prototype, "libraryList", null);
__decorate([
    (0, common_1.Post)('/get-library'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Returns library details',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Returns library information',
                type: models_1.Library,
            },
        ],
    }),
    __param(0, (0, decorators_1.ClientMetadataParam)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_2.ClientMetadata,
        dto_1.LibraryDto]),
    __metadata("design:returntype", Promise)
], TriggeredFunctionsController.prototype, "details", null);
__decorate([
    (0, common_1.Get)('/functions'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Returns function information',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Returns all functions',
                type: models_1.Function,
            },
        ],
    }),
    __param(0, (0, decorators_1.ClientMetadataParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_2.ClientMetadata]),
    __metadata("design:returntype", Promise)
], TriggeredFunctionsController.prototype, "functionsList", null);
__decorate([
    (0, common_1.Post)('library'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Upload new library',
        statusCode: 201,
    }),
    __param(0, (0, decorators_1.ClientMetadataParam)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_2.ClientMetadata,
        dto_1.UploadLibraryDto]),
    __metadata("design:returntype", Promise)
], TriggeredFunctionsController.prototype, "upload", null);
__decorate([
    (0, common_1.Post)('library/replace'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Upgrade existing library',
        statusCode: 201,
    }),
    __param(0, (0, decorators_1.ClientMetadataParam)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_2.ClientMetadata,
        dto_1.UploadLibraryDto]),
    __metadata("design:returntype", Promise)
], TriggeredFunctionsController.prototype, "upgrade", null);
__decorate([
    (0, common_1.Delete)('/library'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        statusCode: 200,
        description: 'Delete library by name',
    }),
    __param(0, (0, decorators_1.ClientMetadataParam)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_2.ClientMetadata,
        dto_1.DeleteLibraryDto]),
    __metadata("design:returntype", Promise)
], TriggeredFunctionsController.prototype, "deleteLibraries", null);
TriggeredFunctionsController = __decorate([
    (0, swagger_1.ApiTags)('Triggered Functions'),
    (0, common_1.Controller)('triggered-functions'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [triggered_functions_service_1.TriggeredFunctionsService])
], TriggeredFunctionsController);
exports.TriggeredFunctionsController = TriggeredFunctionsController;
