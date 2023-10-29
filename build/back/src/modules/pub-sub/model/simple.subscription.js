"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleSubscription = void 0;
const abstract_subscription_1 = require("./abstract.subscription");
class SimpleSubscription extends abstract_subscription_1.AbstractSubscription {
    async subscribe(client) {
        await client.subscribe(this.channel);
    }
    async unsubscribe(client) {
        await client.unsubscribe(this.channel);
    }
}
exports.SimpleSubscription = SimpleSubscription;
