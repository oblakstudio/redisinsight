"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientLogsEmitter = void 0;
const constants_1 = require("../constants");
class ClientLogsEmitter {
    constructor(client) {
        this.id = client.id;
        this.client = client;
    }
    async emit(items) {
        return this.client.emit(constants_1.ProfilerServerEvents.Data, items);
    }
    addProfilerClient() { }
    removeProfilerClient() { }
    flushLogs() { }
}
exports.ClientLogsEmitter = ClientLogsEmitter;
