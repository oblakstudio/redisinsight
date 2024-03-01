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
exports.StreamEntryDto = exports.StreamEntryFieldDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../common/decorators");
const class_transformer_1 = require("class-transformer");
class StreamEntryFieldDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Entry field name',
        example: 'field1',
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, decorators_1.IsRedisString)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], StreamEntryFieldDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Entry value',
        example: 'value1',
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, decorators_1.IsRedisString)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], StreamEntryFieldDto.prototype, "value", void 0);
exports.StreamEntryFieldDto = StreamEntryFieldDto;
class StreamEntryDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Entry ID',
        example: '*',
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StreamEntryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Object,
        description: 'Entry fields',
        example: [{ name: 'field1', value: 'value1' }, { name: 'field2', value: 'value2' }],
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => StreamEntryFieldDto),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], StreamEntryDto.prototype, "fields", void 0);
exports.StreamEntryDto = StreamEntryDto;
