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
exports.PubSubService = void 0;
const common_1 = require("@nestjs/common");
const user_session_provider_1 = require("./providers/user-session.provider");
const subscription_provider_1 = require("./providers/subscription.provider");
const pub_sub_analytics_service_1 = require("./pub-sub.analytics.service");
const utils_1 = require("../../utils");
const database_client_factory_1 = require("../database/providers/database.client.factory");
let PubSubService = class PubSubService {
    constructor(sessionProvider, subscriptionProvider, databaseClientFactory, analyticsService) {
        this.sessionProvider = sessionProvider;
        this.subscriptionProvider = subscriptionProvider;
        this.databaseClientFactory = databaseClientFactory;
        this.analyticsService = analyticsService;
        this.logger = new common_1.Logger('PubSubService');
    }
    async subscribe(userClient, dto) {
        try {
            this.logger.log('Subscribing to channels(s)');
            const session = await this.sessionProvider.getOrCreateUserSession(userClient);
            await Promise.all(dto.subscriptions.map((subDto) => session.subscribe(this.subscriptionProvider.createSubscription(userClient, subDto))));
            this.analyticsService.sendChannelSubscribeEvent(userClient.getDatabaseId());
        }
        catch (e) {
            this.logger.error('Unable to create subscriptions', e);
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async unsubscribe(userClient, dto) {
        try {
            this.logger.log('Unsubscribing from channels(s)');
            const session = await this.sessionProvider.getOrCreateUserSession(userClient);
            await Promise.all(dto.subscriptions.map((subDto) => session.unsubscribe(this.subscriptionProvider.createSubscription(userClient, subDto))));
            this.analyticsService.sendChannelUnsubscribeEvent(userClient.getDatabaseId());
        }
        catch (e) {
            this.logger.error('Unable to unsubscribe', e);
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async publish(clientMetadata, dto) {
        try {
            this.logger.log('Publishing message.');
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const affected = await client.publish(dto.channel, dto.message);
            this.analyticsService.sendMessagePublishedEvent(clientMetadata.databaseId, affected);
            return {
                affected,
            };
        }
        catch (e) {
            this.logger.error('Unable to publish a message', e);
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async handleDisconnect(id) {
        this.logger.log(`Handle disconnect event: ${id}`);
        const session = this.sessionProvider.getUserSession(id);
        if (session) {
            session.destroy();
            this.sessionProvider.removeUserSession(id);
        }
    }
};
PubSubService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_session_provider_1.UserSessionProvider,
        subscription_provider_1.SubscriptionProvider,
        database_client_factory_1.DatabaseClientFactory,
        pub_sub_analytics_service_1.PubSubAnalyticsService])
], PubSubService);
exports.PubSubService = PubSubService;
