"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SshTunnel = void 0;
class SshTunnel {
    constructor(server, client, options) {
        var _a;
        this.server = server;
        this.client = client;
        this.options = options;
        const address = (_a = this.server) === null || _a === void 0 ? void 0 : _a.address();
        this.serverAddress = {
            host: '127.0.0.1',
            port: address === null || address === void 0 ? void 0 : address.port,
        };
    }
    close() {
        var _a, _b, _c, _d;
        (_b = (_a = this.server) === null || _a === void 0 ? void 0 : _a.close) === null || _b === void 0 ? void 0 : _b.call(_a);
        (_d = (_c = this.client) === null || _c === void 0 ? void 0 : _c.end) === null || _d === void 0 ? void 0 : _d.call(_c);
    }
}
exports.SshTunnel = SshTunnel;
