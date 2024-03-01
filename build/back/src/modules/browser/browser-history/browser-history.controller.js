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
exports.BrowserHistoryController = void 0;
const common_1 = require("@nestjs/common");
const api_endpoint_decorator_1 = require("../../../decorators/api-endpoint.decorator");
const swagger_1 = require("@nestjs/swagger");
const interceptors_1 = require("../../../common/interceptors");
const constants_1 = require("../../../common/constants");
const api_redis_params_decorator_1 = require("../../../decorators/api-redis-params.decorator");
const dto_1 = require("./dto");
const browser_history_service_1 = require("./browser-history.service");
let BrowserHistoryController = class BrowserHistoryController {
    constructor(service) {
        this.service = service;
    }
    async list(databaseId, { mode = constants_1.BrowserHistoryMode.Pattern }) {
        return this.service.list(databaseId, mode);
    }
    async delete(databaseId, id) {
        await this.service.delete(databaseId, id);
    }
    async bulkDelete(databaseId, dto) {
        return this.service.bulkDelete(databaseId, dto.ids);
    }
};
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 200,
        description: 'Get browser history',
        responses: [
            {
                status: 200,
                type: dto_1.BrowserHistory,
            },
        ],
    }),
    (0, common_1.Get)(''),
    (0, swagger_1.ApiQuery)({
        name: 'mode',
        enum: constants_1.BrowserHistoryMode,
    }),
    __param(0, (0, common_1.Param)('dbInstance')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BrowserHistoryController.prototype, "list", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 200,
        description: 'Delete browser history item by id',
    }),
    __param(0, (0, common_1.Param)('dbInstance')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BrowserHistoryController.prototype, "delete", null);
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 200,
        description: 'Delete bulk browser history items',
        responses: [
            {
                status: 200,
                type: dto_1.DeleteBrowserHistoryItemsResponse,
            },
        ],
    }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, common_1.Delete)(''),
    __param(0, (0, common_1.Param)('dbInstance')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.DeleteBrowserHistoryItemsDto]),
    __metadata("design:returntype", Promise)
], BrowserHistoryController.prototype, "bulkDelete", null);
BrowserHistoryController = __decorate([
    (0, common_1.UseInterceptors)(interceptors_1.BrowserSerializeInterceptor),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiTags)('Browser: Browser History'),
    (0, common_1.Controller)('history'),
    __metadata("design:paramtypes", [browser_history_service_1.BrowserHistoryService])
], BrowserHistoryController);
exports.BrowserHistoryController = BrowserHistoryController;
