"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubModule = void 0;
const common_1 = require("@nestjs/common");
const pub_sub_gateway_1 = require("./pub-sub.gateway");
const pub_sub_service_1 = require("./pub-sub.service");
const user_session_provider_1 = require("./providers/user-session.provider");
const subscription_provider_1 = require("./providers/subscription.provider");
const redis_client_provider_1 = require("./providers/redis-client.provider");
const pub_sub_controller_1 = require("./pub-sub.controller");
const pub_sub_analytics_service_1 = require("./pub-sub.analytics.service");
let PubSubModule = class PubSubModule {
};
PubSubModule = __decorate([
    (0, common_1.Module)({
        providers: [
            pub_sub_gateway_1.PubSubGateway,
            pub_sub_service_1.PubSubService,
            pub_sub_analytics_service_1.PubSubAnalyticsService,
            user_session_provider_1.UserSessionProvider,
            subscription_provider_1.SubscriptionProvider,
            redis_client_provider_1.RedisClientProvider,
        ],
        controllers: [pub_sub_controller_1.PubSubController],
    })
], PubSubModule);
exports.PubSubModule = PubSubModule;
