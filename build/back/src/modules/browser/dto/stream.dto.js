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
exports.ClaimPendingEntriesResponse = exports.ClaimPendingEntryDto = exports.AckPendingEntriesResponse = exports.AckPendingEntriesDto = exports.GetPendingEntriesDto = exports.PendingEntryDto = exports.DeleteConsumersDto = exports.GetConsumersDto = exports.ConsumerDto = exports.DeleteConsumerGroupsResponse = exports.DeleteConsumerGroupsDto = exports.UpdateConsumerGroupDto = exports.CreateConsumerGroupsDto = exports.CreateConsumerGroupDto = exports.ConsumerGroupDto = exports.CreateStreamDto = exports.DeleteStreamEntriesResponse = exports.DeleteStreamEntriesDto = exports.AddStreamEntriesResponse = exports.AddStreamEntriesDto = exports.GetStreamEntriesResponse = exports.GetStreamEntriesDto = exports.StreamEntryDto = exports.StreamEntryFieldDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const keys_dto_1 = require("./keys.dto");
const constants_1 = require("../../../constants");
const class_transformer_1 = require("class-transformer");
const decorators_1 = require("../../../common/decorators");
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
class GetStreamEntriesDto extends keys_dto_1.KeyDto {
    constructor() {
        super(...arguments);
        this.start = '-';
        this.end = '+';
        this.count = 500;
        this.sortOrder = constants_1.SortOrder.Desc;
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Specifying the start id',
        type: String,
        default: '-',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetStreamEntriesDto.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Specifying the end id',
        type: String,
        default: '+',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetStreamEntriesDto.prototype, "end", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Specifying the number of entries to return.',
        type: Number,
        minimum: 1,
        default: 500,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetStreamEntriesDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Get entries sort by IDs order.',
        default: constants_1.SortOrder.Desc,
        enum: constants_1.SortOrder,
    }),
    (0, class_validator_1.IsEnum)(constants_1.SortOrder, {
        message: `sortOrder must be a valid enum value. Valid values: ${Object.values(constants_1.SortOrder)}.`,
    }),
    __metadata("design:type", String)
], GetStreamEntriesDto.prototype, "sortOrder", void 0);
exports.GetStreamEntriesDto = GetStreamEntriesDto;
class GetStreamEntriesResponse extends keys_dto_1.KeyResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Total number of entries',
    }),
    __metadata("design:type", Number)
], GetStreamEntriesResponse.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Last generated id in the stream',
    }),
    __metadata("design:type", String)
], GetStreamEntriesResponse.prototype, "lastGeneratedId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'First stream entry',
        type: StreamEntryDto,
    }),
    (0, class_transformer_1.Type)(() => StreamEntryDto),
    __metadata("design:type", StreamEntryDto)
], GetStreamEntriesResponse.prototype, "firstEntry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last stream entry',
        type: StreamEntryDto,
    }),
    (0, class_transformer_1.Type)(() => StreamEntryDto),
    __metadata("design:type", StreamEntryDto)
], GetStreamEntriesResponse.prototype, "lastEntry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Stream entries',
        type: StreamEntryDto,
        isArray: true,
    }),
    (0, class_transformer_1.Type)(() => StreamEntryDto),
    __metadata("design:type", Array)
], GetStreamEntriesResponse.prototype, "entries", void 0);
exports.GetStreamEntriesResponse = GetStreamEntriesResponse;
class AddStreamEntriesDto extends keys_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Entries to push',
        type: StreamEntryDto,
        isArray: true,
        example: [
            {
                id: '*',
                fields: [{ name: 'field1', value: 'value1' }, { name: 'field2', value: 'value2' }],
            },
            {
                id: '*',
                fields: [{ name: 'field1', value: 'value1' }, { name: 'field2', value: 'value2' }],
            },
        ],
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => StreamEntryDto),
    __metadata("design:type", Array)
], AddStreamEntriesDto.prototype, "entries", void 0);
exports.AddStreamEntriesDto = AddStreamEntriesDto;
class AddStreamEntriesResponse extends keys_dto_1.KeyResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Entries IDs',
        type: String,
        isArray: true,
    }),
    __metadata("design:type", Array)
], AddStreamEntriesResponse.prototype, "entries", void 0);
exports.AddStreamEntriesResponse = AddStreamEntriesResponse;
class DeleteStreamEntriesDto extends keys_dto_1.KeyDto {
}
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
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], DeleteStreamEntriesDto.prototype, "entries", void 0);
exports.DeleteStreamEntriesDto = DeleteStreamEntriesDto;
class DeleteStreamEntriesResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of deleted entries',
        type: Number,
    }),
    __metadata("design:type", Number)
], DeleteStreamEntriesResponse.prototype, "affected", void 0);
exports.DeleteStreamEntriesResponse = DeleteStreamEntriesResponse;
class CreateStreamDto extends (0, swagger_1.IntersectionType)(AddStreamEntriesDto, keys_dto_1.KeyWithExpireDto) {
}
exports.CreateStreamDto = CreateStreamDto;
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
class CreateConsumerGroupsDto extends keys_dto_1.KeyDto {
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
class UpdateConsumerGroupDto extends (0, swagger_1.IntersectionType)(keys_dto_1.KeyDto, CreateConsumerGroupDto) {
}
exports.UpdateConsumerGroupDto = UpdateConsumerGroupDto;
class DeleteConsumerGroupsDto extends keys_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Consumer group names',
        type: String,
        isArray: true,
        example: ['Group-1', 'Group-1'],
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, decorators_1.IsRedisString)({ each: true }),
    (0, decorators_1.RedisStringType)({ each: true }),
    __metadata("design:type", Array)
], DeleteConsumerGroupsDto.prototype, "consumerGroups", void 0);
exports.DeleteConsumerGroupsDto = DeleteConsumerGroupsDto;
class DeleteConsumerGroupsResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of deleted consumer groups',
        type: Number,
    }),
    __metadata("design:type", Number)
], DeleteConsumerGroupsResponse.prototype, "affected", void 0);
exports.DeleteConsumerGroupsResponse = DeleteConsumerGroupsResponse;
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
class GetConsumersDto extends keys_dto_1.KeyDto {
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
class DeleteConsumersDto extends GetConsumersDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Names of consumers to delete',
        type: String,
        isArray: true,
        example: ['consumer-1', 'consumer-2'],
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    (0, decorators_1.IsRedisString)({ each: true }),
    (0, decorators_1.RedisStringType)({ each: true }),
    __metadata("design:type", Array)
], DeleteConsumersDto.prototype, "consumerNames", void 0);
exports.DeleteConsumersDto = DeleteConsumersDto;
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
class GetPendingEntriesDto extends (0, swagger_1.IntersectionType)(keys_dto_1.KeyDto, GetConsumersDto) {
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
class AckPendingEntriesDto extends GetConsumersDto {
}
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
    (0, decorators_1.IsRedisString)({ each: true }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    (0, decorators_1.RedisStringType)({ each: true }),
    __metadata("design:type", Array)
], AckPendingEntriesDto.prototype, "entries", void 0);
exports.AckPendingEntriesDto = AckPendingEntriesDto;
class AckPendingEntriesResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of affected entries',
        type: Number,
    }),
    __metadata("design:type", Number)
], AckPendingEntriesResponse.prototype, "affected", void 0);
exports.AckPendingEntriesResponse = AckPendingEntriesResponse;
class ClaimPendingEntryDto extends keys_dto_1.KeyDto {
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
class ClaimPendingEntriesResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Entries IDs were affected by claim command',
        type: String,
        isArray: true,
        example: ['1650985323741-0', '1650985323770-0'],
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], ClaimPendingEntriesResponse.prototype, "affected", void 0);
exports.ClaimPendingEntriesResponse = ClaimPendingEntriesResponse;
