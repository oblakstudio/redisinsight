"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SshTunnel = void 0;
const events_1 = require("events");
const exceptions_1 = require("../exceptions");
class SshTunnel extends events_1.EventEmitter {
    constructor(server, client, options) {
        var _a;
        super();
        this.server = server;
        this.client = client;
        const address = (_a = this.server) === null || _a === void 0 ? void 0 : _a.address();
        this.serverAddress = {
            host: address === null || address === void 0 ? void 0 : address.address,
            port: address === null || address === void 0 ? void 0 : address.port,
        };
        this.init(options);
    }
    close() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_b = (_a = this.server) === null || _a === void 0 ? void 0 : _a.close) === null || _b === void 0 ? void 0 : _b.call(_a);
        (_d = (_c = this.client) === null || _c === void 0 ? void 0 : _c.end) === null || _d === void 0 ? void 0 : _d.call(_c);
        (_f = (_e = this.server) === null || _e === void 0 ? void 0 : _e.removeAllListeners) === null || _f === void 0 ? void 0 : _f.call(_e);
        (_h = (_g = this.client) === null || _g === void 0 ? void 0 : _g.removeAllListeners) === null || _h === void 0 ? void 0 : _h.call(_g);
        this.removeAllListeners();
    }
    error(e) {
        this.emit('error', e);
    }
    init(options) {
        this.server.on('close', this.close);
        this.client.on('close', this.close);
        this.server.on('error', this.close);
        this.client.on('error', this.error);
        this.server.on('connection', (connection) => {
            var _a, _b;
            this.client.forwardOut((_a = this.serverAddress) === null || _a === void 0 ? void 0 : _a.host, (_b = this.serverAddress) === null || _b === void 0 ? void 0 : _b.port, options.targetHost, options.targetPort, (e, stream) => {
                if (e) {
                    return this.emit('error', new exceptions_1.UnableToCreateTunnelException(e.message));
                }
                return connection.pipe(stream).pipe(connection);
            });
            connection.on('error', (e) => {
                this.client.emit('error', e);
            });
            connection.on('close', () => {
                this.close();
            });
        });
    }
}
exports.SshTunnel = SshTunnel;
