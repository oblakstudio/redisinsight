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
exports.GlobalNotificationProvider = void 0;
const config_1 = require("../../../utils/config");
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../utils");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const notification_entity_1 = require("../entities/notification.entity");
const constants_1 = require("../constants");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const dto_1 = require("../dto");
const event_emitter_1 = require("@nestjs/event-emitter");
const NOTIFICATIONS_CONFIG = config_1.default.get('notifications');
let GlobalNotificationProvider = class GlobalNotificationProvider {
    constructor(repository, eventEmitter) {
        this.repository = repository;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger('GlobalNotificationProvider');
        this.validator = new class_validator_1.Validator();
    }
    init() {
        if (this.interval) {
            return;
        }
        this.interval = setInterval(() => {
            this.sync().catch();
        }, NOTIFICATIONS_CONFIG.syncInterval);
        this.sync().catch();
    }
    async sync() {
        try {
            const remoteNotificationsDto = await this.getNotificationsFromRemote();
            await this.validatedNotifications(remoteNotificationsDto);
            const toInsert = (0, lodash_1.keyBy)(remoteNotificationsDto.notifications.map((notification) => new notification_entity_1.NotificationEntity({
                ...notification,
                type: constants_1.NotificationType.Global,
                read: false,
            })), 'timestamp');
            const currentNotifications = (0, lodash_1.keyBy)(await this.repository
                .createQueryBuilder('n')
                .where({ type: constants_1.NotificationType.Global })
                .select(['n.timestamp', 'n.read'])
                .getMany(), 'timestamp');
            await this.repository
                .createQueryBuilder('n')
                .delete()
                .where({ type: constants_1.NotificationType.Global })
                .execute();
            const newNotifications = [];
            (0, lodash_1.forEach)(toInsert, (notification) => {
                if (currentNotifications[notification.timestamp]) {
                    toInsert[notification.timestamp].read = currentNotifications[notification.timestamp].read;
                }
                else {
                    newNotifications.push(notification);
                }
            });
            await this.repository.insert((0, lodash_1.values)(toInsert));
            this.eventEmitter.emit(constants_1.NotificationEvents.NewNotifications, (0, lodash_1.orderBy)(newNotifications, ['timestamp'], 'desc'));
        }
        catch (e) {
            this.logger.error('Unable to sync notifications with remote', e);
        }
    }
    async validatedNotifications(dto) {
        this.logger.debug('Validating notifications from remote');
        try {
            const notificationsDto = (0, class_transformer_1.plainToClass)(dto_1.CreateNotificationsDto, dto);
            await this.validator.validateOrReject(notificationsDto, {
                whitelist: true,
            });
        }
        catch (e) {
            this.logger.error(`Invalid notification(s) found. ${e.message}`, e);
            throw new common_1.BadRequestException(e);
        }
    }
    async getNotificationsFromRemote() {
        this.logger.debug('Getting notifications from remote');
        try {
            const buffer = await (0, utils_1.getFile)(NOTIFICATIONS_CONFIG.updateUrl);
            const serializedString = buffer.toString();
            const json = JSON.parse(serializedString);
            return (0, class_transformer_1.plainToClass)(dto_1.CreateNotificationsDto, json);
        }
        catch (e) {
            this.logger.error(`Unable to download or parse notifications json. ${e.message}`, e);
            throw new common_1.InternalServerErrorException('Unable to get and parse file from remote');
        }
    }
};
GlobalNotificationProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.NotificationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], GlobalNotificationProvider);
exports.GlobalNotificationProvider = GlobalNotificationProvider;
