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
exports.NotificationDto = void 0;
const constants_1 = require("../constants");
const swagger_1 = require("@nestjs/swagger");
class NotificationDto {
    constructor(dto) {
        Object.assign(this, dto);
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: constants_1.NotificationType,
        example: constants_1.NotificationType.Global,
        description: 'Type of notification',
    }),
    __metadata("design:type", String)
], NotificationDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        example: 1655738357,
        description: 'Timestamp of notification',
    }),
    __metadata("design:type", Number)
], NotificationDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'Some announcement',
        description: 'Notification title',
    }),
    __metadata("design:type", String)
], NotificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'Some valid <a href="">link</a>',
        description: 'Notification body (with html tags)',
    }),
    __metadata("design:type", String)
], NotificationDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        example: false,
        description: 'Determines if notification was shown to user in the Notification Center',
    }),
    __metadata("design:type", Boolean)
], NotificationDto.prototype, "read", void 0);
exports.NotificationDto = NotificationDto;
