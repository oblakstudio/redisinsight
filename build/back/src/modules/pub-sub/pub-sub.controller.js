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
exports.PubSubController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_redis_instance_operation_decorator_1 = require("../../decorators/api-redis-instance-operation.decorator");
const pub_sub_service_1 = require("./pub-sub.service");
const publish_dto_1 = require("./dto/publish.dto");
const publish_response_1 = require("./dto/publish.response");
const models_1 = require("../../common/models");
const decorators_1 = require("../../common/decorators");
let PubSubController = class PubSubController {
    constructor(service) {
        this.service = service;
    }
    async publish(clientMetadata, dto) {
        return this.service.publish(clientMetadata, dto);
    }
};
__decorate([
    (0, common_1.Post)('messages'),
    (0, api_redis_instance_operation_decorator_1.ApiRedisInstanceOperation)({
        description: 'Publish message to a channel',
        statusCode: 201,
        responses: [
            {
                status: 201,
                description: 'Returns number of clients message ws delivered',
                type: publish_response_1.PublishResponse,
            },
        ],
    }),
    __param(0, (0, decorators_1.ClientMetadataParam)({
        ignoreDbIndex: true,
    })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        publish_dto_1.PublishDto]),
    __metadata("design:returntype", Promise)
], PubSubController.prototype, "publish", null);
PubSubController = __decorate([
    (0, swagger_1.ApiTags)('Pub/Sub'),
    (0, common_1.Controller)('pub-sub'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [pub_sub_service_1.PubSubService])
], PubSubController);
exports.PubSubController = PubSubController;
