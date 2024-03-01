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
exports.KeysController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const keys_service_1 = require("./keys.service");
const api_redis_params_decorator_1 = require("../../../decorators/api-redis-params.decorator");
const browser_client_metadata_decorator_1 = require("../decorators/browser-client-metadata.decorator");
const decorators_1 = require("../../../common/decorators");
const models_1 = require("../../../common/models");
const dto_1 = require("./dto");
const interceptors_1 = require("../../../common/interceptors");
let KeysController = class KeysController {
    constructor(keysService) {
        this.keysService = keysService;
    }
    async getKeys(clientMetadata, dto) {
        return this.keysService.getKeys(clientMetadata, dto);
    }
    async getKeysInfo(clientMetadata, dto) {
        return this.keysService.getKeysInfo(clientMetadata, dto);
    }
    async getKeyInfo(clientMetadata, dto) {
        return await this.keysService.getKeyInfo(clientMetadata, dto.keyName);
    }
    async deleteKey(clientMetadata, dto) {
        return await this.keysService.deleteKeys(clientMetadata, dto.keyNames);
    }
    async renameKey(clientMetadata, dto) {
        return await this.keysService.renameKey(clientMetadata, dto);
    }
    async updateTtl(clientMetadata, dto) {
        return await this.keysService.updateTtl(clientMetadata, dto);
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ description: 'Get keys by cursor position' }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Keys list',
        type: dto_1.GetKeysWithDetailsResponse,
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.GetKeysDto]),
    __metadata("design:returntype", Promise)
], KeysController.prototype, "getKeys", null);
__decorate([
    (0, common_1.Post)('get-metadata'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ description: 'Get info for multiple keys' }),
    (0, swagger_1.ApiBody)({ type: dto_1.GetKeysInfoDto }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Info for multiple keys',
        type: dto_1.GetKeysWithDetailsResponse,
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.GetKeysInfoDto]),
    __metadata("design:returntype", Promise)
], KeysController.prototype, "getKeysInfo", null);
__decorate([
    (0, common_1.Post)('/get-info'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ description: 'Get key info' }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_1.GetKeyInfoDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Keys info',
        type: dto_1.GetKeyInfoResponse,
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.GetKeyInfoDto]),
    __metadata("design:returntype", Promise)
], KeysController.prototype, "getKeyInfo", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, swagger_1.ApiOperation)({ description: 'Delete key' }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_1.DeleteKeysDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Number of affected keys.',
        type: dto_1.DeleteKeysResponse,
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.DeleteKeysDto]),
    __metadata("design:returntype", Promise)
], KeysController.prototype, "deleteKey", null);
__decorate([
    (0, common_1.Patch)('/name'),
    (0, swagger_1.ApiOperation)({ description: 'Rename key' }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_1.RenameKeyDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'New key name.',
        type: dto_1.RenameKeyResponse,
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.RenameKeyDto]),
    __metadata("design:returntype", Promise)
], KeysController.prototype, "renameKey", null);
__decorate([
    (0, common_1.Patch)('/ttl'),
    (0, swagger_1.ApiOperation)({ description: 'Update the remaining time to live of a key' }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateKeyTtlDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'The remaining time to live of a key.',
        type: dto_1.KeyTtlResponse,
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.UpdateKeyTtlDto]),
    __metadata("design:returntype", Promise)
], KeysController.prototype, "updateTtl", null);
KeysController = __decorate([
    (0, swagger_1.ApiTags)('Browser: Keys'),
    (0, common_1.UseInterceptors)(interceptors_1.BrowserSerializeInterceptor),
    (0, common_1.Controller)('keys'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [keys_service_1.KeysService])
], KeysController);
exports.KeysController = KeysController;
