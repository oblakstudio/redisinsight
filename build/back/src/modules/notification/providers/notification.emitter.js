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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEmitter = void 0;
const common_1 = require("@nestjs/common");
const notification_entity_1 = require("../entities/notification.entity");
const constants_1 = require("../constants");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const dto_1 = require("../dto");
let NotificationEmitter = class NotificationEmitter {
    constructor(repository, eventEmitter) {
        this.repository = repository;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger('NotificationEmitter');
    }
    async notification(notifications) {
        try {
            if (!(notifications === null || notifications === void 0 ? void 0 : notifications.length)) {
                return;
            }
            this.logger.debug(`${notifications.length} new notification(s) to emit`);
            const totalUnread = await this.repository
                .createQueryBuilder()
                .where({ read: false })
                .getCount();
            this.eventEmitter.emit(constants_1.NotificationServerEvents.Notification, new dto_1.NotificationsDto({
                notifications,
                totalUnread,
            }));
        }
        catch (e) {
            this.logger.error('Unable to prepare dto for notifications', e);
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.NotificationEvents.NewNotifications),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], NotificationEmitter.prototype, "notification", null);
NotificationEmitter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.NotificationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], NotificationEmitter);
exports.NotificationEmitter = NotificationEmitter;
