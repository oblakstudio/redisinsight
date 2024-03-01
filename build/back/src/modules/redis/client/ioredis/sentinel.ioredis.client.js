"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentinelIoredisClient = void 0;
const client_1 = require("..");
class SentinelIoredisClient extends client_1.StandaloneIoredisClient {
    getConnectionType() {
        return client_1.RedisClientConnectionType.SENTINEL;
    }
}
exports.SentinelIoredisClient = SentinelIoredisClient;
