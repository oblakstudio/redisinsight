"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilerClient = void 0;
const lodash_1 = require("lodash");
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const error_messages_1 = require("../../../constants/error-messages");
class ProfilerClient {
    constructor(id, client) {
        this.logger = new common_1.Logger('ProfilerClient');
        this.logsEmitters = new Map();
        this.id = id;
        this.client = client;
        this.items = [];
        this.debounce = (0, lodash_1.debounce)(() => {
            if (this.items.length) {
                this.logsEmitters.forEach((emitter) => {
                    emitter.emit(this.items);
                });
                this.items = [];
            }
        }, 10, {
            maxWait: 50,
        });
    }
    handleOnData(payload) {
        const { time, args, source, database, } = payload;
        this.items.push({
            time, args, source, database,
        });
        this.debounce();
    }
    handleOnDisconnect() {
        this.client.emit(constants_1.ProfilerServerEvents.Exception, new websockets_1.WsException(error_messages_1.default.NO_CONNECTION_TO_REDIS_DB));
    }
    addLogsEmitter(emitter) {
        this.logsEmitters.set(emitter.id, emitter);
        emitter.addProfilerClient(this.id);
        this.logCurrentState();
    }
    async flushLogs() {
        this.logsEmitters.forEach((emitter) => emitter.flushLogs());
    }
    destroy() {
        this.logsEmitters.forEach((emitter) => emitter.removeProfilerClient(this.id));
    }
    logCurrentState() {
        this.logger.debug(`Emitters: ${this.logsEmitters.size}`);
    }
}
exports.ProfilerClient = ProfilerClient;
