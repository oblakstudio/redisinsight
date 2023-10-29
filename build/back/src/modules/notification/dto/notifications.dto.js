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
exports.NotificationsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const notification_dto_1 = require("./notification.dto");
class NotificationsDto {
    constructor(entity) {
        Object.assign(this, entity);
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => notification_dto_1.NotificationDto,
        isArray: true,
        description: 'Ordered notifications list',
    }),
    __metadata("design:type", Array)
], NotificationsDto.prototype, "notifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        example: 2,
        description: 'Number of unread notifications',
    }),
    __metadata("design:type", Number)
], NotificationsDto.prototype, "totalUnread", void 0);
exports.NotificationsDto = NotificationsDto;
