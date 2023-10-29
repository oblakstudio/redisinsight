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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
const analytics_dto_1 = require("./dto/analytics.dto");
const analytics_service_1 = require("./analytics.service");
let AnalyticsController = class AnalyticsController {
    constructor(service) {
        this.service = service;
    }
    async sendEvent(dto) {
        return this.service.sendEvent(dto);
    }
    async sendPage(dto) {
        return this.service.sendPage(dto);
    }
};
__decorate([
    (0, common_1.Post)('send-event'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Send telemetry event',
        statusCode: 204,
        responses: [
            {
                status: 204,
            },
        ],
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_dto_1.SendEventDto]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "sendEvent", null);
__decorate([
    (0, common_1.Post)('send-page'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Send telemetry page',
        statusCode: 204,
        responses: [
            {
                status: 204,
            },
        ],
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_dto_1.SendEventDto]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "sendPage", null);
AnalyticsController = __decorate([
    (0, swagger_1.ApiTags)('Analytics'),
    (0, common_1.Controller)('analytics'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
exports.AnalyticsController = AnalyticsController;
