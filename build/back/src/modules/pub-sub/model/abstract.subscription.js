"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSubscription = void 0;
const lodash_1 = require("lodash");
const EMIT_WAIT = 30;
const EMIT_MAX_WAIT = 100;
const MESSAGES_MAX = 5000;
class AbstractSubscription {
    constructor(userClient, dto) {
        this.messages = [];
        this.userClient = userClient;
        this.channel = dto.channel;
        this.type = dto.type;
        this.id = `${this.type}:${this.channel}`;
        this.debounce = (0, lodash_1.debounce)(() => {
            if (this.messages.length) {
                this.userClient.getSocket()
                    .emit(this.id, {
                    messages: this.messages.slice(0, MESSAGES_MAX),
                    count: this.messages.length,
                });
                this.messages = [];
            }
        }, EMIT_WAIT, {
            maxWait: EMIT_MAX_WAIT,
        });
    }
    getId() {
        return this.id;
    }
    getChannel() {
        return this.channel;
    }
    getType() {
        return this.type;
    }
    pushMessage(message) {
        this.messages.push(message);
        this.debounce();
    }
    toString() {
        return `${this.constructor.name}:${JSON.stringify({
            id: this.id,
            mL: this.messages.length,
        })}`;
    }
}
exports.AbstractSubscription = AbstractSubscription;
