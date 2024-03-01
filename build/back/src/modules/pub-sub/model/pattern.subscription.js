"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternSubscription = void 0;
const abstract_subscription_1 = require("./abstract.subscription");
class PatternSubscription extends abstract_subscription_1.AbstractSubscription {
    async subscribe(client) {
        await client.pSubscribe(this.channel);
    }
    async unsubscribe(client) {
        await client.pUnsubscribe(this.channel);
    }
}
exports.PatternSubscription = PatternSubscription;
