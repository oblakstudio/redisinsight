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
exports.ReadNotificationsDto = void 0;
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants");
const swagger_1 = require("@nestjs/swagger");
class ReadNotificationsDto {
    constructor(dto) {
        Object.assign(this, dto);
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        example: 1655738357,
        description: 'Timestamp of notification',
    }),
    (0, class_validator_1.NotEquals)(null),
    (0, class_validator_1.ValidateIf)((object, value) => value !== undefined),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ReadNotificationsDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: constants_1.NotificationType,
        example: constants_1.NotificationType.Global,
        description: 'Type of notification',
    }),
    (0, class_validator_1.NotEquals)(null),
    (0, class_validator_1.ValidateIf)((object, value) => value !== undefined),
    (0, class_validator_1.IsEnum)(constants_1.NotificationType),
    __metadata("design:type", String)
], ReadNotificationsDto.prototype, "type", void 0);
exports.ReadNotificationsDto = ReadNotificationsDto;
