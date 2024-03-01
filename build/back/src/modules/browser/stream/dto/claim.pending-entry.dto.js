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
exports.ClaimPendingEntryDto = void 0;
const dto_1 = require("../../keys/dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../common/decorators");
class ClaimPendingEntryDto extends dto_1.KeyDto {
    constructor() {
        super(...arguments);
        this.minIdleTime = 0;
    }
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
], ClaimPendingEntryDto.prototype, "groupName", void 0);
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
], ClaimPendingEntryDto.prototype, "consumerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Claim only if its idle time is greater the minimum idle time ',
        type: Number,
        minimum: 0,
        default: 0,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ClaimPendingEntryDto.prototype, "minIdleTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Entries IDs',
        type: String,
        isArray: true,
        example: ['1650985323741-0', '1650985323770-0'],
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    (0, decorators_1.IsRedisString)({ each: true }),
    (0, decorators_1.RedisStringType)({ each: true }),
    __metadata("design:type", Array)
], ClaimPendingEntryDto.prototype, "entries", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Set the idle time (last time it was delivered) of the message',
        type: Number,
        minimum: 0,
    }),
    (0, class_validator_1.NotEquals)(null),
    (0, class_validator_1.ValidateIf)((object, value) => value !== undefined),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ClaimPendingEntryDto.prototype, "idle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'This is the same as IDLE but instead of a relative amount of milliseconds, '
            + 'it sets the idle time to a specific Unix time (in milliseconds)',
        type: Number,
    }),
    (0, class_validator_1.NotEquals)(null),
    (0, class_validator_1.ValidateIf)((object, value) => value !== undefined),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ClaimPendingEntryDto.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Set the retry counter to the specified value. '
            + 'This counter is incremented every time a message is delivered again. '
            + 'Normally XCLAIM does not alter this counter, which is just served to clients when the XPENDING command '
            + 'is called: this way clients can detect anomalies, like messages that are never processed '
            + 'for some reason after a big number of delivery attempts',
        type: Number,
        minimum: 0,
    }),
    (0, class_validator_1.NotEquals)(null),
    (0, class_validator_1.ValidateIf)((object, value) => value !== undefined),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ClaimPendingEntryDto.prototype, "retryCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Creates the pending message entry in the PEL even if certain specified IDs are not already '
            + 'in the PEL assigned to a different client',
        type: Boolean,
    }),
    (0, class_validator_1.NotEquals)(null),
    (0, class_validator_1.ValidateIf)((object, value) => value !== undefined),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ClaimPendingEntryDto.prototype, "force", void 0);
exports.ClaimPendingEntryDto = ClaimPendingEntryDto;
