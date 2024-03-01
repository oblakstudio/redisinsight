"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusterIoredisClient = void 0;
const client_1 = require("..");
const lodash_1 = require("lodash");
var IoredisNodeRole;
(function (IoredisNodeRole) {
    IoredisNodeRole["PRIMARY"] = "master";
    IoredisNodeRole["SECONDARY"] = "slave";
    IoredisNodeRole["ALL"] = "all";
})(IoredisNodeRole || (IoredisNodeRole = {}));
class ClusterIoredisClient extends client_1.IoredisClient {
    getConnectionType() {
        return client_1.RedisClientConnectionType.CLUSTER;
    }
    async nodes(role) {
        return this.client.nodes(role ? IoredisNodeRole[role] : IoredisNodeRole.ALL)
            .map((node) => {
            let natAddress = {};
            if (this.client.options.natMap) {
                const natAddressString = (0, lodash_1.findKey)(this.client.options.natMap, {
                    host: node.options.host,
                    port: node.options.port,
                });
                if (natAddressString) {
                    const [, natHost, natPort] = natAddressString.match(/(.+):(\d+)$/);
                    natAddress = {
                        natHost,
                        natPort: +natPort,
                    };
                }
            }
            return new client_1.StandaloneIoredisClient(this.clientMetadata, node, {
                host: node.options.host,
                port: node.options.port,
                ...natAddress,
            });
        });
    }
}
exports.ClusterIoredisClient = ClusterIoredisClient;
