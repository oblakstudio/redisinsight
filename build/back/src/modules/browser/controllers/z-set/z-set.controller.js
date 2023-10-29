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
exports.ZSetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_redis_instance_operation_decorator_1 = require("../../../../decorators/api-redis-instance-operation.decorator");
const base_controller_1 = require("../base.controller");
const browser_client_metadata_decorator_1 = require("../../decorators/browser-client-metadata.decorator");
const decorators_1 = require("../../../../common/decorators");
const models_1 = require("../../../../common/models");
const dto_1 = require("../../dto");
const z_set_business_service_1 = require("../../services/z-set-business/z-set-business.service");
let ZSetController = class ZSetController extends base_controller_1.BaseController {
    constructor(zSetBusinessService) {
        super();
        this.zSetBusinessService = zSetBusinessService;
    }
    async createSet(clientMetadata, dto) {
        return await this.zSetBusinessService.createZSet(clientMetadata, dto);
    }
    async getZSet(clientMetadata, dto) {
        return await this.zSetBusinessService.getMembers(clientMetadata, dto);
    }
    async addMembers(clientMetadata, dto) {
        return await this.zSetBusinessService.addMembers(clientMetadata, dto);
    }
    async updateMember(clientMetadata, dto) {
        return await this.zSetBusinessService.updateMember(clientMetadata, dto);
    }
    async deleteMembers(clientMetadata, dto) {
        return await this.zSetBusinessService.deleteMembers(clientMetadata, dto);
    }
    async searchZSet(clientMetadata, dto) {
        return await this.zSetBusinessService.searchMembers(clientMetadata, dto);
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Set key to hold ZSet data type',
        statusCode: 201,
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.CreateZSetWithExpireDto]),
    __metadata("design:returntype", Promise)
], ZSetController.prototype, "createSet", null);
__decorate([
    (0, common_1.Post)('/get-members'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Get specified members of the ZSet stored at key',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Ok',
                type: dto_1.GetZSetResponse,
            },
        ],
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.GetZSetMembersDto]),
    __metadata("design:returntype", Promise)
], ZSetController.prototype, "getZSet", null);
__decorate([
    (0, common_1.Put)(''),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Add the specified members to the ZSet stored at key',
        statusCode: 200,
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.AddMembersToZSetDto]),
    __metadata("design:returntype", Promise)
], ZSetController.prototype, "addMembers", null);
__decorate([
    (0, common_1.Patch)(''),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Update the specified member in the ZSet stored at key',
        statusCode: 200,
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.UpdateMemberInZSetDto]),
    __metadata("design:returntype", Promise)
], ZSetController.prototype, "updateMember", null);
__decorate([
    (0, common_1.Delete)('/members'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Remove the specified members from the Set stored at key',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Ok',
                type: dto_1.DeleteMembersFromZSetResponse,
            },
        ],
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.DeleteMembersFromZSetDto]),
    __metadata("design:returntype", Promise)
], ZSetController.prototype, "deleteMembers", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Search members in ZSet stored at key',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Ok',
                type: dto_1.SearchZSetMembersResponse,
            },
        ],
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.SearchZSetMembersDto]),
    __metadata("design:returntype", Promise)
], ZSetController.prototype, "searchZSet", null);
ZSetController = __decorate([
    (0, swagger_1.ApiTags)('ZSet'),
    (0, common_1.Controller)('/zSet'),
    __metadata("design:paramtypes", [z_set_business_service_1.ZSetBusinessService])
], ZSetController);
exports.ZSetController = ZSetController;
