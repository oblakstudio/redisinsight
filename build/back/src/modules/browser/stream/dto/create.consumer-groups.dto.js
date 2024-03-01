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
exports.CreateConsumerGroupsDto = exports.CreateConsumerGroupDto = exports.ConsumerGroupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../common/decorators");
const class_validator_1 = require("class-validator");
const dto_1 = require("../../keys/dto");
const class_transformer_1 = require("class-transformer");
class ConsumerGroupDto {
    constructor() {
        this.consumers = 0;
        this.pending = 0;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Consumer Group name',
        example: 'group',
    }),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], ConsumerGroupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Number of consumers',
        example: 2,
    }),
    __metadata("design:type", Number)
], ConsumerGroupDto.prototype, "consumers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Number of pending messages',
        example: 2,
    }),
    __metadata("design:type", Number)
], ConsumerGroupDto.prototype, "pending", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Smallest Id of the message that is pending in the group',
        example: '1657892649-0',
    }),
    __metadata("design:type", String)
], ConsumerGroupDto.prototype, "smallestPendingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Greatest Id of the message that is pending in the group',
        example: '1657892680-0',
    }),
    __metadata("design:type", String)
], ConsumerGroupDto.prototype, "greatestPendingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Id of last delivered message',
        example: '1657892648-0',
    }),
    __metadata("design:type", String)
], ConsumerGroupDto.prototype, "lastDeliveredId", void 0);
exports.ConsumerGroupDto = ConsumerGroupDto;
class CreateConsumerGroupDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Consumer group name',
        example: 'group',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, decorators_1.IsRedisString)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], CreateConsumerGroupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Id of last delivered message',
        example: '1657892648-0',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsumerGroupDto.prototype, "lastDeliveredId", void 0);
exports.CreateConsumerGroupDto = CreateConsumerGroupDto;
class CreateConsumerGroupsDto extends dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => CreateConsumerGroupDto,
        isArray: true,
        description: 'List of consumer groups to create',
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_transformer_1.Type)(() => CreateConsumerGroupDto),
    __metadata("design:type", Array)
], CreateConsumerGroupsDto.prototype, "consumerGroups", void 0);
exports.CreateConsumerGroupsDto = CreateConsumerGroupsDto;
