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
exports.CloudJobController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../common/decorators");
const swagger_1 = require("@nestjs/swagger");
const api_endpoint_decorator_1 = require("../../../decorators/api-endpoint.decorator");
const cloud_job_service_1 = require("./cloud-job.service");
const create_database_cloud_job_data_dto_1 = require("./dto/create-database.cloud-job.data.dto");
const create_cloud_job_dto_1 = require("./dto/create.cloud-job.dto");
const models_1 = require("./models");
const models_2 = require("../common/models");
let CloudJobController = class CloudJobController {
    constructor(service) {
        this.service = service;
    }
    async createFreeDatabase(sessionMetadata, dto, utm) {
        return this.service.create(sessionMetadata, dto, utm);
    }
    async getUserJobsInfo(sessionMetadata) {
        return this.service.getUserJobsInfo(sessionMetadata);
    }
    async getJobInfo(sessionMetadata, id) {
        return this.service.getJobInfo(sessionMetadata, id);
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Create cloud job',
        statusCode: 200,
        responses: [{ type: models_1.CloudJobInfo }],
    }),
    __param(0, (0, decorators_1.RequestSessionMetadata)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_cloud_job_dto_1.CreateCloudJobDto,
        models_2.CloudRequestUtm]),
    __metadata("design:returntype", Promise)
], CloudJobController.prototype, "createFreeDatabase", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get list of user jobs',
        statusCode: 200,
        responses: [{ type: models_1.CloudJobInfo, isArray: true }],
    }),
    __param(0, (0, decorators_1.RequestSessionMetadata)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CloudJobController.prototype, "getUserJobsInfo", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get user jobs',
        statusCode: 200,
        responses: [{ type: models_1.CloudJobInfo }],
    }),
    __param(0, (0, decorators_1.RequestSessionMetadata)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CloudJobController.prototype, "getJobInfo", null);
CloudJobController = __decorate([
    (0, swagger_1.ApiExtraModels)(create_database_cloud_job_data_dto_1.CreateDatabaseCloudJobDataDto),
    (0, swagger_1.ApiTags)('Cloud Jobs'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('cloud/me/jobs'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [cloud_job_service_1.CloudJobService])
], CloudJobController);
exports.CloudJobController = CloudJobController;
