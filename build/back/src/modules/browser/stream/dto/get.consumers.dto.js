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
exports.GetConsumersDto = exports.ConsumerDto = void 0;
const dto_1 = require("../../keys/dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../common/decorators");
class ConsumerDto {
    constructor() {
        this.pending = 0;
        this.idle = 0;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The consumer\'s name',
        example: 'consumer-2',
    }),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], ConsumerDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of pending messages for the client, '
            + 'which are messages that were delivered but are yet to be acknowledged',
        example: 2,
    }),
    __metadata("design:type", Number)
], ConsumerDto.prototype, "pending", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of milliseconds that have passed since the consumer last interacted with the server',
        example: 22442,
    }),
    __metadata("design:type", Number)
], ConsumerDto.prototype, "idle", void 0);
exports.ConsumerDto = ConsumerDto;
class GetConsumersDto extends dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Consumer group name',
        example: 'group-1',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, decorators_1.IsRedisString)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], GetConsumersDto.prototype, "groupName", void 0);
exports.GetConsumersDto = GetConsumersDto;
