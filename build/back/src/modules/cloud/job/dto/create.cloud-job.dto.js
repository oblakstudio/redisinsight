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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCloudJobDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const cloud_job_data_transformer_1 = require("../transformers/cloud-job-data.transformer");
const constants_1 = require("../constants");
const models_1 = require("../models");
const create_database_cloud_job_data_dto_1 = require("./create-database.cloud-job.data.dto");
const create_subscription_and_database_cloud_job_data_dto_1 = require("./create-subscription-and-database.cloud-job.data.dto");
const import_database_cloud_job_data_dto_1 = require("./import-database.cloud-job.data.dto");
let CreateCloudJobDto = class CreateCloudJobDto {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Job name to create',
        enum: constants_1.CloudJobName,
    }),
    (0, class_validator_1.IsEnum)(constants_1.CloudJobName),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCloudJobDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mod in which to run the job.',
        enum: models_1.CloudJobRunMode,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(models_1.CloudJobRunMode),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCloudJobDto.prototype, "runMode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Any data for create a job.',
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(create_database_cloud_job_data_dto_1.CreateDatabaseCloudJobDataDto) },
            { $ref: (0, swagger_1.getSchemaPath)(create_subscription_and_database_cloud_job_data_dto_1.CreateSubscriptionAndDatabaseCloudJobDataDto) },
            { $ref: (0, swagger_1.getSchemaPath)(import_database_cloud_job_data_dto_1.ImportDatabaseCloudJobDataDto) },
        ],
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(cloud_job_data_transformer_1.cloudJobDataTransformer),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], CreateCloudJobDto.prototype, "data", void 0);
CreateCloudJobDto = __decorate([
    (0, swagger_1.ApiExtraModels)(create_database_cloud_job_data_dto_1.CreateDatabaseCloudJobDataDto, create_subscription_and_database_cloud_job_data_dto_1.CreateSubscriptionAndDatabaseCloudJobDataDto, import_database_cloud_job_data_dto_1.ImportDatabaseCloudJobDataDto)
], CreateCloudJobDto);
exports.CreateCloudJobDto = CreateCloudJobDto;
