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
exports.ImportCloudDatabasesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const import_cloud_database_dto_1 = require("./import-cloud-database.dto");
class ImportCloudDatabasesDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cloud databases list.',
        type: import_cloud_database_dto_1.ImportCloudDatabaseDto,
        isArray: true,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => import_cloud_database_dto_1.ImportCloudDatabaseDto),
    __metadata("design:type", Array)
], ImportCloudDatabasesDto.prototype, "databases", void 0);
exports.ImportCloudDatabasesDto = ImportCloudDatabasesDto;
