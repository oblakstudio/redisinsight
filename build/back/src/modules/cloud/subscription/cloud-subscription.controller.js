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
exports.CloudSubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../common/decorators");
const swagger_1 = require("@nestjs/swagger");
const api_endpoint_decorator_1 = require("../../../decorators/api-endpoint.decorator");
const cloud_subscription_api_service_1 = require("./cloud-subscription.api.service");
const models_1 = require("../common/models");
const dto_1 = require("./dto");
let CloudSubscriptionController = class CloudSubscriptionController {
    constructor(service) {
        this.service = service;
    }
    async getPlans(sessionMetadata, utm) {
        return this.service.getSubscriptionPlans(sessionMetadata, utm);
    }
};
__decorate([
    (0, common_1.Get)('/plans'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get list of plans with cloud regions',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'List of plans with cloud regions',
                type: dto_1.CloudSubscriptionPlanResponse,
                isArray: true,
            },
        ],
    }),
    __param(0, (0, decorators_1.RequestSessionMetadata)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, models_1.CloudRequestUtm]),
    __metadata("design:returntype", Promise)
], CloudSubscriptionController.prototype, "getPlans", null);
CloudSubscriptionController = __decorate([
    (0, swagger_1.ApiTags)('Cloud Subscription'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('cloud/me/subscription'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [cloud_subscription_api_service_1.CloudSubscriptionApiService])
], CloudSubscriptionController);
exports.CloudSubscriptionController = CloudSubscriptionController;
