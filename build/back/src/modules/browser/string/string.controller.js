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
exports.StringController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_redis_params_decorator_1 = require("../../../decorators/api-redis-params.decorator");
const dto_1 = require("./dto");
const dto_2 = require("../keys/dto");
const browser_client_metadata_decorator_1 = require("../decorators/browser-client-metadata.decorator");
const decorators_1 = require("../../../common/decorators");
const models_1 = require("../../../common/models");
const interceptors_1 = require("../../../common/interceptors");
const api_endpoint_decorator_1 = require("../../../decorators/api-endpoint.decorator");
const string_service_1 = require("./string.service");
let StringController = class StringController {
    constructor(stringService) {
        this.stringService = stringService;
    }
    async setString(clientMetadata, dto) {
        return this.stringService.setString(clientMetadata, dto);
    }
    async getStringValue(clientMetadata, dto) {
        return this.stringService.getStringValue(clientMetadata, dto);
    }
    async downloadStringFile(res, clientMetadata, dto) {
        const { stream } = await this.stringService.downloadStringValue(clientMetadata, dto);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment;filename="string_value"');
        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
        stream
            .on('error', () => res.status(404).send())
            .pipe(res);
    }
    async updateStringValue(clientMetadata, dto) {
        return this.stringService.updateStringValue(clientMetadata, dto);
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ description: 'Set key to hold string value' }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_1.SetStringWithExpireDto }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.SetStringWithExpireDto]),
    __metadata("design:returntype", Promise)
], StringController.prototype, "setString", null);
__decorate([
    (0, common_1.Post)('/get-value'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ description: 'Get string value' }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_1.GetStringInfoDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'String value',
        type: dto_1.GetStringValueResponse,
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.GetStringInfoDto]),
    __metadata("design:returntype", Promise)
], StringController.prototype, "getStringValue", null);
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Endpoint do download string value',
        statusCode: 200,
    }),
    (0, common_1.Post)('/download-value'),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_2.GetKeyInfoDto }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, models_1.ClientMetadata,
        dto_2.GetKeyInfoDto]),
    __metadata("design:returntype", Promise)
], StringController.prototype, "downloadStringFile", null);
__decorate([
    (0, common_1.Put)(''),
    (0, swagger_1.ApiOperation)({ description: 'Update string value' }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_1.SetStringDto }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.SetStringDto]),
    __metadata("design:returntype", Promise)
], StringController.prototype, "updateStringValue", null);
StringController = __decorate([
    (0, swagger_1.ApiTags)('Browser: String'),
    (0, common_1.UseInterceptors)(interceptors_1.BrowserSerializeInterceptor),
    (0, common_1.Controller)('string'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [string_service_1.StringService])
], StringController);
exports.StringController = StringController;
