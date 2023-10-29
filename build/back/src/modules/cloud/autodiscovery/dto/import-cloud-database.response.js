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
exports.ImportCloudDatabaseResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const models_1 = require("../../../../common/models");
const models_2 = require("../../database/models");
class ImportCloudDatabaseResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subscription id',
        type: Number,
    }),
    __metadata("design:type", Number)
], ImportCloudDatabaseResponse.prototype, "subscriptionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database id',
        type: Number,
    }),
    __metadata("design:type", Number)
], ImportCloudDatabaseResponse.prototype, "databaseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Add Redis Cloud database status',
        default: models_1.ActionStatus.Success,
        enum: models_1.ActionStatus,
    }),
    __metadata("design:type", String)
], ImportCloudDatabaseResponse.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Message',
        type: String,
    }),
    __metadata("design:type", String)
], ImportCloudDatabaseResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The database details.',
        type: models_2.CloudDatabase,
    }),
    __metadata("design:type", models_2.CloudDatabase)
], ImportCloudDatabaseResponse.prototype, "databaseDetails", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Error',
    }),
    __metadata("design:type", Object)
], ImportCloudDatabaseResponse.prototype, "error", void 0);
exports.ImportCloudDatabaseResponse = ImportCloudDatabaseResponse;
