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
exports.RejsonRlController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const rejson_rl_service_1 = require("./rejson-rl.service");
const api_redis_instance_operation_decorator_1 = require("../../../decorators/api-redis-instance-operation.decorator");
const browser_client_metadata_decorator_1 = require("../decorators/browser-client-metadata.decorator");
const models_1 = require("../../../common/models");
let RejsonRlController = class RejsonRlController {
    constructor(service) {
        this.service = service;
    }
    async getJson(clientMetadata, dto) {
        return this.service.getJson(clientMetadata, dto);
    }
    async createJson(clientMetadata, dto) {
        return this.service.create(clientMetadata, dto);
    }
    async jsonSet(clientMetadata, dto) {
        return this.service.jsonSet(clientMetadata, dto);
    }
    async arrAppend(clientMetadata, dto) {
        return this.service.arrAppend(clientMetadata, dto);
    }
    async remove(clientMetadata, dto) {
        return this.service.remove(clientMetadata, dto);
    }
};
__decorate([
    (0, common_1.Post)('/get'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Get json properties by path',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Download full data by path or returns description of data inside',
                type: dto_1.GetRejsonRlResponseDto,
            },
        ],
    }),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.GetRejsonRlDto]),
    __metadata("design:returntype", Promise)
], RejsonRlController.prototype, "getJson", null);
__decorate([
    (0, common_1.Post)(''),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Create new REJSON-RL data type',
        statusCode: 201,
    }),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.CreateRejsonRlWithExpireDto]),
    __metadata("design:returntype", Promise)
], RejsonRlController.prototype, "createJson", null);
__decorate([
    (0, common_1.Patch)('/set'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Modify REJSON-RL data type by path',
        statusCode: 200,
    }),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.ModifyRejsonRlSetDto]),
    __metadata("design:returntype", Promise)
], RejsonRlController.prototype, "jsonSet", null);
__decorate([
    (0, common_1.Patch)('/arrappend'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Append item inside REJSON-RL array',
        statusCode: 200,
    }),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.ModifyRejsonRlArrAppendDto]),
    __metadata("design:returntype", Promise)
], RejsonRlController.prototype, "arrAppend", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Removes path in the REJSON-RL',
        statusCode: 200,
    }),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.RemoveRejsonRlDto]),
    __metadata("design:returntype", Promise)
], RejsonRlController.prototype, "remove", null);
RejsonRlController = __decorate([
    (0, swagger_1.ApiTags)('Browser: REJSON-RL'),
    (0, common_1.Controller)('rejson-rl'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [rejson_rl_service_1.RejsonRlService])
], RejsonRlController);
exports.RejsonRlController = RejsonRlController;
