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
exports.CreateBulkActionDto = void 0;
const bulk_action_filter_1 = require("../models/bulk-action-filter");
const constants_1 = require("../constants");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const bulk_action_id_dto_1 = require("./bulk-action-id.dto");
class CreateBulkActionDto extends bulk_action_id_dto_1.BulkActionIdDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBulkActionDto.prototype, "databaseId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(constants_1.BulkActionType, {
        message: `type must be a valid enum value. Valid values: ${Object.values(constants_1.BulkActionType)}.`,
    }),
    __metadata("design:type", String)
], CreateBulkActionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => bulk_action_filter_1.BulkActionFilter),
    __metadata("design:type", bulk_action_filter_1.BulkActionFilter)
], CreateBulkActionDto.prototype, "filter", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2147483647),
    __metadata("design:type", Number)
], CreateBulkActionDto.prototype, "db", void 0);
exports.CreateBulkActionDto = CreateBulkActionDto;
