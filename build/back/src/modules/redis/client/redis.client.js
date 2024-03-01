"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = exports.RedisClientNodeRole = exports.RedisClientConnectionType = void 0;
const models_1 = require("../../../common/models");
const lodash_1 = require("lodash");
const config_1 = require("../../../utils/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const REDIS_CLIENTS_CONFIG = config_1.default.get('redis_clients');
var RedisClientConnectionType;
(function (RedisClientConnectionType) {
    RedisClientConnectionType["STANDALONE"] = "STANDALONE";
    RedisClientConnectionType["CLUSTER"] = "CLUSTER";
    RedisClientConnectionType["SENTINEL"] = "SENTINEL";
})(RedisClientConnectionType = exports.RedisClientConnectionType || (exports.RedisClientConnectionType = {}));
var RedisClientNodeRole;
(function (RedisClientNodeRole) {
    RedisClientNodeRole["PRIMARY"] = "PRIMARY";
    RedisClientNodeRole["SECONDARY"] = "SECONDARY";
})(RedisClientNodeRole = exports.RedisClientNodeRole || (exports.RedisClientNodeRole = {}));
class RedisClient extends event_emitter_1.EventEmitter2 {
    constructor(clientMetadata, client, options) {
        super();
        this.clientMetadata = clientMetadata;
        this.client = client;
        this.options = options;
        this.clientMetadata = RedisClient.prepareClientMetadata(clientMetadata);
        this.lastTimeUsed = Date.now();
        this.id = RedisClient.generateId(this.clientMetadata);
    }
    getClient() {
        return this.client;
    }
    setLastUsed() {
        this.lastTimeUsed = Date.now();
    }
    isIdle() {
        return Date.now() - this.lastTimeUsed > REDIS_CLIENTS_CONFIG.idleThreshold;
    }
    static prepareClientMetadata(clientMetadata) {
        return {
            ...clientMetadata,
            db: clientMetadata.context === models_1.ClientContext.CLI ? null : clientMetadata.db,
        };
    }
    static generateId(cm) {
        var _a, _b, _c;
        const empty = '(nil)';
        const separator = '_';
        const id = [
            cm.databaseId,
            cm.context,
            cm.uniqueId || empty,
            (0, lodash_1.isNumber)(cm.db) ? cm.db : empty,
        ].join(separator);
        const uId = [
            ((_a = cm.sessionMetadata) === null || _a === void 0 ? void 0 : _a.userId) || empty,
            ((_b = cm.sessionMetadata) === null || _b === void 0 ? void 0 : _b.sessionId) || empty,
            ((_c = cm.sessionMetadata) === null || _c === void 0 ? void 0 : _c.uniqueId) || empty,
        ].join(separator);
        return [
            id,
            uId,
        ].join(separator);
    }
}
exports.RedisClient = RedisClient;
