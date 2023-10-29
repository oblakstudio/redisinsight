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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const typeorm_1 = require("@nestjs/typeorm");
const notification_entity_1 = require("./entities/notification.entity");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
let NotificationService = class NotificationService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger('NotificationService');
    }
    async getNotifications() {
        this.logger.debug('Getting notifications list.');
        try {
            const notifications = await this.repository
                .createQueryBuilder('n')
                .orderBy('timestamp', 'DESC')
                .getMany();
            const totalUnread = await this.repository
                .createQueryBuilder()
                .where({ read: false })
                .getCount();
            return (0, class_transformer_1.plainToClass)(dto_1.NotificationsDto, {
                notifications,
                totalUnread,
            });
        }
        catch (e) {
            this.logger.error('Unable to get notifications list', e);
            throw new common_1.InternalServerErrorException('Unable to get notifications list');
        }
    }
    async readNotifications(dto) {
        try {
            this.logger.debug('Updating "read=true" status for notification(s).');
            const { type, timestamp } = dto;
            const query = {};
            if (type) {
                query.type = type;
            }
            if (timestamp) {
                query.timestamp = timestamp;
            }
            await this.repository
                .createQueryBuilder('n')
                .update()
                .where(query)
                .set({ read: true })
                .execute();
            const totalUnread = await this.repository
                .createQueryBuilder()
                .where({ read: false })
                .getCount();
            return new dto_1.NotificationsDto({
                notifications: [],
                totalUnread,
            });
        }
        catch (e) {
            this.logger.error('Unable to "read" notification(s)', e);
            throw new common_1.InternalServerErrorException('Unable to "read" notification(s)');
        }
    }
};
NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.NotificationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationService);
exports.NotificationService = NotificationService;
