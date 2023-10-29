"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionProvider = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const pattern_subscription_1 = require("../model/pattern.subscription");
const simple_subscription_1 = require("../model/simple.subscription");
let SubscriptionProvider = class SubscriptionProvider {
    createSubscription(userClient, dto) {
        switch (dto.type) {
            case constants_1.SubscriptionType.PSubscribe:
                return new pattern_subscription_1.PatternSubscription(userClient, dto);
            case constants_1.SubscriptionType.Subscribe:
                return new simple_subscription_1.SimpleSubscription(userClient, dto);
            case constants_1.SubscriptionType.SSubscribe:
            default:
                throw new common_1.BadRequestException('Unsupported Subscription type');
        }
    }
};
SubscriptionProvider = __decorate([
    (0, common_1.Injectable)()
], SubscriptionProvider);
exports.SubscriptionProvider = SubscriptionProvider;
