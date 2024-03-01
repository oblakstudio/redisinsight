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
exports.ListController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_redis_params_decorator_1 = require("../../../decorators/api-redis-params.decorator");
const api_redis_instance_operation_decorator_1 = require("../../../decorators/api-redis-instance-operation.decorator");
const dto_1 = require("./dto");
const dto_2 = require("../keys/dto");
const browser_client_metadata_decorator_1 = require("../decorators/browser-client-metadata.decorator");
const decorators_1 = require("../../../common/decorators");
const models_1 = require("../../../common/models");
const interceptors_1 = require("../../../common/interceptors");
const list_service_1 = require("./list.service");
let ListController = class ListController {
    constructor(listService) {
        this.listService = listService;
    }
    async createList(clientMetadata, dto) {
        return await this.listService.createList(clientMetadata, dto);
    }
    async pushElement(clientMetadata, dto) {
        return await this.listService.pushElement(clientMetadata, dto);
    }
    async getElements(clientMetadata, dto) {
        return this.listService.getElements(clientMetadata, dto);
    }
    async updateElement(clientMetadata, dto) {
        return await this.listService.setElement(clientMetadata, dto);
    }
    async getElement(clientMetadata, index, dto) {
        return this.listService.getElement(clientMetadata, index, dto);
    }
    async deleteElement(clientMetadata, dto) {
        return this.listService.deleteElements(clientMetadata, dto);
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ description: 'Set key to hold list data type' }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateListWithExpireDto }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.CreateListWithExpireDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "createList", null);
__decorate([
    (0, common_1.Put)(''),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Insert element at the head/tail of the List data type',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Length of the list after the push operation',
                type: dto_1.PushListElementsResponse,
            },
        ],
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.PushElementToListDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "pushElement", null);
__decorate([
    (0, common_1.Post)('/get-elements'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({
        description: 'Get specified elements of the list stored at key',
    }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Specified elements of the list stored at key.',
        type: dto_1.GetListElementsResponse,
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.GetListElementsDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "getElements", null);
__decorate([
    (0, common_1.Patch)(''),
    (0, swagger_1.ApiOperation)({
        description: 'Update list element by index.',
    }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_1.SetListElementDto }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.SetListElementDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "updateElement", null);
__decorate([
    (0, common_1.Post)('/get-elements/:index'),
    (0, swagger_1.ApiParam)({
        name: 'index',
        description: 'Zero-based index. 0 - first element, 1 - second element and so on. '
            + 'Negative indices can be used to designate elements starting at the tail of the list. '
            + 'Here, -1 means the last element',
        type: Number,
        required: true,
    }),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Get specified List element by index',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Specified elements of the list stored at key.',
                type: dto_1.GetListElementsResponse,
            },
        ],
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Param)('index')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata, Number, dto_2.KeyDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "getElement", null);
__decorate([
    (0, common_1.Delete)('/elements'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Remove and return the elements from the tail/head of list stored at key.',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Removed elements.',
                type: dto_1.GetListElementsResponse,
            },
        ],
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.DeleteListElementsDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "deleteElement", null);
ListController = __decorate([
    (0, swagger_1.ApiTags)('Browser: List'),
    (0, common_1.UseInterceptors)(interceptors_1.BrowserSerializeInterceptor),
    (0, common_1.Controller)('list'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [list_service_1.ListService])
], ListController);
exports.ListController = ListController;
