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
exports.GetSetMembersResponse = exports.SetScanResponse = exports.GetSetMembersDto = exports.DeleteMembersFromSetResponse = exports.CreateSetWithExpireDto = exports.DeleteMembersFromSetDto = exports.AddMembersToSetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../common/decorators");
const keys_dto_1 = require("./keys.dto");
class AddMembersToSetDto extends keys_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Set members',
        isArray: true,
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, decorators_1.IsRedisString)({ each: true }),
    (0, decorators_1.RedisStringType)({ each: true }),
    __metadata("design:type", Array)
], AddMembersToSetDto.prototype, "members", void 0);
exports.AddMembersToSetDto = AddMembersToSetDto;
class DeleteMembersFromSetDto extends keys_dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Key members',
        type: String,
        isArray: true,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, decorators_1.IsRedisString)({ each: true }),
    (0, decorators_1.RedisStringType)({ each: true }),
    __metadata("design:type", Array)
], DeleteMembersFromSetDto.prototype, "members", void 0);
exports.DeleteMembersFromSetDto = DeleteMembersFromSetDto;
class CreateSetWithExpireDto extends (0, swagger_1.IntersectionType)(AddMembersToSetDto, keys_dto_1.KeyWithExpireDto) {
}
exports.CreateSetWithExpireDto = CreateSetWithExpireDto;
class DeleteMembersFromSetResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of affected members',
        type: Number,
    }),
    __metadata("design:type", Number)
], DeleteMembersFromSetResponse.prototype, "affected", void 0);
exports.DeleteMembersFromSetResponse = DeleteMembersFromSetResponse;
class GetSetMembersDto extends keys_dto_1.ScanDataTypeDto {
}
exports.GetSetMembersDto = GetSetMembersDto;
class SetScanResponse extends keys_dto_1.KeyResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        minimum: 0,
        description: 'The new cursor to use in the next call.'
            + ' If the property has value of 0, then the iteration is completed.',
    }),
    __metadata("design:type", Number)
], SetScanResponse.prototype, "nextCursor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => String,
        description: 'Array of members.',
        isArray: true,
    }),
    (0, decorators_1.RedisStringType)({ each: true }),
    __metadata("design:type", Array)
], SetScanResponse.prototype, "members", void 0);
exports.SetScanResponse = SetScanResponse;
class GetSetMembersResponse extends SetScanResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of members in the currently-selected set.',
    }),
    __metadata("design:type", Number)
], GetSetMembersResponse.prototype, "total", void 0);
exports.GetSetMembersResponse = GetSetMembersResponse;
