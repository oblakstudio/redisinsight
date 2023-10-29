"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SshTunnelProvider = void 0;
const common_1 = require("@nestjs/common");
const detectPort = require("detect-port");
const net_1 = require("net");
const ssh2_1 = require("ssh2");
const ssh_tunnel_1 = require("./models/ssh-tunnel");
const exceptions_1 = require("./exceptions");
let SshTunnelProvider = class SshTunnelProvider {
    async createServer() {
        return new Promise((resolve, reject) => {
            try {
                const server = (0, net_1.createServer)();
                server.on('listening', () => resolve(server));
                server.on('error', (e) => {
                    reject(new exceptions_1.UnableToCreateLocalServerException(e.message));
                });
                detectPort({
                    hostname: '127.0.0.1',
                    port: 50000,
                })
                    .then((port) => {
                    server.listen({
                        host: '127.0.0.1',
                        port,
                    });
                })
                    .catch(reject);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    async createClient(options) {
        return new Promise((resolve, reject) => {
            const conn = new ssh2_1.Client();
            conn.on('ready', () => resolve(conn));
            conn.on('error', (e) => {
                reject(new exceptions_1.UnableToCreateSshConnectionException(e.message));
            });
            conn.connect(options);
        });
    }
    async createTunnel(database) {
        try {
            const client = await this.createClient(database === null || database === void 0 ? void 0 : database.sshOptions);
            const server = await this.createServer();
            return new ssh_tunnel_1.SshTunnel(server, client, {
                targetHost: database.host,
                targetPort: database.port,
            });
        }
        catch (e) {
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw new exceptions_1.UnableToCreateTunnelException(e.message);
        }
    }
};
SshTunnelProvider = __decorate([
    (0, common_1.Injectable)()
], SshTunnelProvider);
exports.SshTunnelProvider = SshTunnelProvider;
