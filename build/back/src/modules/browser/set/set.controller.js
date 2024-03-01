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
exports.SetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_redis_params_decorator_1 = require("../../../decorators/api-redis-params.decorator");
const models_1 = require("../../../common/models");
const browser_client_metadata_decorator_1 = require("../decorators/browser-client-metadata.decorator");
const decorators_1 = require("../../../common/decorators");
const dto_1 = require("./dto");
const set_service_1 = require("./set.service");
const interceptors_1 = require("../../../common/interceptors");
let SetController = class SetController {
    constructor(setService) {
        this.setService = setService;
    }
    async createSet(clientMetadata, dto) {
        return await this.setService.createSet(clientMetadata, dto);
    }
    async getMembers(clientMetadata, dto) {
        return await this.setService.getMembers(clientMetadata, dto);
    }
    async addMembers(clientMetadata, dto) {
        return await this.setService.addMembers(clientMetadata, dto);
    }
    async deleteMembers(clientMetadata, dto) {
        return await this.setService.deleteMembers(clientMetadata, dto);
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ description: 'Set key to hold Set data type' }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateSetWithExpireDto }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.CreateSetWithExpireDto]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "createSet", null);
__decorate([
    (0, common_1.Post)('/get-members'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({
        description: 'Get specified members of the set stored at key by cursor position',
    }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Specified members of the set stored at key.',
        type: dto_1.GetSetMembersResponse,
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.GetSetMembersDto]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "getMembers", null);
__decorate([
    (0, common_1.Put)(''),
    (0, swagger_1.ApiOperation)({
        description: 'Add the specified members to the Set stored at key',
    }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_1.AddMembersToSetDto }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.AddMembersToSetDto]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "addMembers", null);
__decorate([
    (0, common_1.Delete)('/members'),
    (0, swagger_1.ApiOperation)({
        description: 'Remove the specified members from the Set stored at key',
    }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_1.DeleteMembersFromSetDto }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.DeleteMembersFromSetDto]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "deleteMembers", null);
SetController = __decorate([
    (0, swagger_1.ApiTags)('Browser: Set'),
    (0, common_1.UseInterceptors)(interceptors_1.BrowserSerializeInterceptor),
    (0, common_1.Controller)('set'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [set_service_1.SetService])
], SetController);
exports.SetController = SetController;
