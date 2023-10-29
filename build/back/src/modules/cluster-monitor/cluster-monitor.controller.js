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
exports.ClusterMonitorController = void 0;
const common_1 = require("@nestjs/common");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
const cluster_monitor_service_1 = require("./cluster-monitor.service");
const swagger_1 = require("@nestjs/swagger");
const models_1 = require("./models");
const models_2 = require("../../common/models");
const decorators_1 = require("../../common/decorators");
let ClusterMonitorController = class ClusterMonitorController {
    constructor(clusterMonitorService) {
        this.clusterMonitorService = clusterMonitorService;
    }
    async getClusterDetails(clientMetadata) {
        return this.clusterMonitorService.getClusterDetails(clientMetadata);
    }
};
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 200,
        description: 'Get list of available plugins',
        responses: [
            {
                status: 200,
                type: models_1.ClusterDetails,
            },
        ],
    }),
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.ClientMetadataParam)({
        ignoreDbIndex: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_2.ClientMetadata]),
    __metadata("design:returntype", Promise)
], ClusterMonitorController.prototype, "getClusterDetails", null);
ClusterMonitorController = __decorate([
    (0, swagger_1.ApiTags)('Cluster Monitor'),
    (0, common_1.Controller)('/cluster-details'),
    __metadata("design:paramtypes", [cluster_monitor_service_1.ClusterMonitorService])
], ClusterMonitorController);
exports.ClusterMonitorController = ClusterMonitorController;
