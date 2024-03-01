"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandaloneIoredisClient = void 0;
const client_1 = require("..");
class StandaloneIoredisClient extends client_1.IoredisClient {
    getConnectionType() {
        return client_1.RedisClientConnectionType.STANDALONE;
    }
    async nodes() {
        return [this];
    }
}
exports.StandaloneIoredisClient = StandaloneIoredisClient;
