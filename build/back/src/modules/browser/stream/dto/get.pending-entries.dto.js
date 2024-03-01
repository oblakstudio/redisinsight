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
exports.GetPendingEntriesDto = exports.PendingEntryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../keys/dto");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../common/decorators");
const get_consumers_dto_1 = require("./get.consumers.dto");
class PendingEntryDto {
    constructor() {
        this.idle = 0;
        this.delivered = 0;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Entry ID',
        example: '*',
    }),
    __metadata("design:type", String)
], PendingEntryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Consumer name',
        example: 'consumer-1',
    }),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], PendingEntryDto.prototype, "consumerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of milliseconds that elapsed since the last time '
            + 'this message was delivered to this consumer',
        example: 22442,
    }),
    __metadata("design:type", Number)
], PendingEntryDto.prototype, "idle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of times this message was delivered',
        example: 2,
    }),
    __metadata("design:type", Number)
], PendingEntryDto.prototype, "delivered", void 0);
exports.PendingEntryDto = PendingEntryDto;
class GetPendingEntriesDto extends (0, swagger_1.IntersectionType)(dto_1.KeyDto, get_consumers_dto_1.GetConsumersDto) {
    constructor() {
        super(...arguments);
        this.start = '-';
        this.end = '+';
        this.count = 500;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Consumer name',
        example: 'consumer-1',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, decorators_1.IsRedisString)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], GetPendingEntriesDto.prototype, "consumerName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Specifying the start id',
        type: String,
        default: '-',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPendingEntriesDto.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Specifying the end id',
        type: String,
        default: '+',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPendingEntriesDto.prototype, "end", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Specifying the number of pending messages to return.',
        type: Number,
        minimum: 1,
        default: 500,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetPendingEntriesDto.prototype, "count", void 0);
exports.GetPendingEntriesDto = GetPendingEntriesDto;
