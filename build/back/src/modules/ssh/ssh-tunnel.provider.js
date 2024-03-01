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
const ssh_tunnel_1 = require("./models/ssh-tunnel");
const exceptions_1 = require("./exceptions");
const tunnel_ssh_1 = require("tunnel-ssh");
let SshTunnelProvider = class SshTunnelProvider {
    async createTunnel(target, sshOptions) {
        try {
            const [server, client] = await (0, tunnel_ssh_1.createTunnel)({
                autoClose: false,
            }, {
                host: '127.0.0.1',
            }, {
                ...sshOptions,
            }, {
                dstAddr: target.host,
                dstPort: target.port,
            });
            return new ssh_tunnel_1.SshTunnel(server, client, {
                targetHost: target.host,
                targetPort: target.port,
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
