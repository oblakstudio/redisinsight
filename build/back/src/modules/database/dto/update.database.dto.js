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
exports.UpdateDatabaseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const update_ssh_options_dto_1 = require("../../ssh/dto/update.ssh-options.dto");
const update_sentinel_master_dto_1 = require("../../redis-sentinel/dto/update.sentinel.master.dto");
const create_database_dto_1 = require("./create.database.dto");
class UpdateDatabaseDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_database_dto_1.CreateDatabaseDto, [
    'sshOptions', 'timeout', 'sentinelMaster',
])) {
}
__decorate([
    (0, class_validator_1.ValidateIf)((object, value) => value !== undefined),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateDatabaseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((object, value) => value !== undefined),
    (0, class_validator_1.IsString)({ always: true }),
    __metadata("design:type", String)
], UpdateDatabaseDto.prototype, "host", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((object, value) => value !== undefined),
    (0, class_validator_1.IsInt)({ always: true }),
    __metadata("design:type", Number)
], UpdateDatabaseDto.prototype, "port", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Updated ssh options fields',
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(() => update_ssh_options_dto_1.UpdateSshOptionsDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", update_ssh_options_dto_1.UpdateSshOptionsDto)
], UpdateDatabaseDto.prototype, "sshOptions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Connection timeout',
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1000),
    (0, class_validator_1.Max)(1000000000),
    (0, class_validator_1.IsInt)({ always: true }),
    __metadata("design:type", Number)
], UpdateDatabaseDto.prototype, "timeout", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Updated sentinel master fields',
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(() => update_sentinel_master_dto_1.UpdateSentinelMasterDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", update_sentinel_master_dto_1.UpdateSentinelMasterDto)
], UpdateDatabaseDto.prototype, "sentinelMaster", void 0);
exports.UpdateDatabaseDto = UpdateDatabaseDto;
