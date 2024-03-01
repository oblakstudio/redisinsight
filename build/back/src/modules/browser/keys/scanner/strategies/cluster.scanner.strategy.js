"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusterScannerStrategy = void 0;
const lodash_1 = require("lodash");
const config_1 = require("../../../../../utils/config");
const utils_1 = require("../../../../../utils");
const browser_tool_commands_1 = require("../../../constants/browser-tool-commands");
const utils_2 = require("../../../utils");
const common_1 = require("@nestjs/common");
const scanner_strategy_1 = require("./scanner.strategy");
const client_1 = require("../../../../redis/client");
const utils_3 = require("../../../../redis/utils");
const REDIS_SCAN_CONFIG = config_1.default.get('redis_scan');
let ClusterScannerStrategy = class ClusterScannerStrategy extends scanner_strategy_1.ScannerStrategy {
    async getNodesToScan(client, initialCursor) {
        const nodesClients = await client.nodes(client_1.RedisClientNodeRole.PRIMARY);
        if (Number.isNaN((0, lodash_1.toNumber)(initialCursor))) {
            const nodes = (0, utils_2.parseClusterCursor)(initialCursor);
            nodes.forEach((node, index) => {
                nodes[index].node = nodesClients.find(({ options: { host, port, natHost, natPort, }, }) => (host === node.host && port === node.port) || (natHost === node.host && natPort === node.port));
            });
            return nodes;
        }
        return nodesClients.map((node) => ({
            node,
            host: node.options.natHost || node.options.host,
            port: node.options.natPort || node.options.port,
            cursor: 0,
            keys: [],
            total: 0,
            scanned: 0,
        }));
    }
    async calculateNodesTotalKeys(nodes) {
        await Promise.all(nodes.map(async (node) => {
            node.total = await (0, utils_3.getTotalKeys)(node === null || node === void 0 ? void 0 : node.node);
        }));
    }
    async scanNodes(nodes, match, count, type) {
        await Promise.all(nodes.map(async (node) => {
            if ((node.cursor === 0 && node.scanned !== 0) || node.total === 0) {
                return;
            }
            const commandArgs = [`${node.cursor}`, 'MATCH', match, 'COUNT', count];
            if (type) {
                commandArgs.push('TYPE', type);
            }
            const result = await node.node.sendCommand([
                browser_tool_commands_1.BrowserToolKeysCommands.Scan,
                ...commandArgs,
            ]);
            node.cursor = parseInt(result[0], 10);
            node.keys.push(...result[1]);
            node.scanned += count;
        }));
    }
    async getKeys(client, args) {
        const match = args.match !== undefined ? args.match : '*';
        const count = args.count || REDIS_SCAN_CONFIG.countDefault;
        const nodes = await this.getNodesToScan(client, args.cursor);
        const settings = await this.settingsService.getAppSettings('1');
        await this.calculateNodesTotalKeys(nodes);
        if (!(0, utils_1.isRedisGlob)(match)) {
            const keyName = Buffer.from((0, utils_1.unescapeRedisGlob)(match));
            nodes.forEach((node) => {
                node.cursor = 0;
                node.scanned = (0, lodash_1.isNull)(node.total) ? 1 : node.total;
            });
            nodes[0].keys = await this.getKeysInfo(client, [keyName], args.type);
            nodes[0].keys = nodes[0].keys.filter((key) => {
                if (key.ttl === -2) {
                    return false;
                }
                if (args.type) {
                    return key.type === args.type;
                }
                return true;
            });
            return nodes.map((node) => (0, lodash_1.omit)(node, 'node'));
        }
        let allNodesScanned = false;
        while (!allNodesScanned
            && nodes.reduce((prev, cur) => prev + cur.keys.length, 0) < count
            && ((nodes.reduce((prev, cur) => prev + cur.total, 0) < settings.scanThreshold
                && nodes.find((node) => !!node.cursor))
                || nodes.reduce((prev, cur) => prev + cur.scanned, 0)
                    < settings.scanThreshold)) {
            await this.scanNodes(nodes, match, count, args.type);
            allNodesScanned = !nodes.some((node) => node.cursor !== 0);
        }
        await Promise.all(nodes.map(async (node) => {
            if (node.keys.length && args.keysInfo) {
                node.keys = await this.getKeysInfo(node.node, node.keys, args.type);
            }
            else {
                node.keys = node.keys.map((name) => ({
                    name,
                    type: args.type || undefined,
                }));
            }
        }));
        return nodes.map((node) => (0, lodash_1.omit)(node, 'node'));
    }
    async getKeysInfo(client, keys, filterType) {
        return Promise.all(keys.map(async (key) => {
            const commands = [
                [browser_tool_commands_1.BrowserToolKeysCommands.Ttl, key],
                ['memory', 'usage', key, 'samples', '0'],
            ];
            if (!filterType) {
                commands.push([browser_tool_commands_1.BrowserToolKeysCommands.Type, key]);
            }
            const result = await client.sendPipeline(commands, { replyEncoding: 'utf8' });
            if (filterType) {
                result.push([null, filterType]);
            }
            const [[, ttl = null], [, size = null], [, type = null],] = result;
            return {
                name: key,
                type,
                ttl,
                size,
            };
        }));
    }
};
ClusterScannerStrategy = __decorate([
    (0, common_1.Injectable)()
], ClusterScannerStrategy);
exports.ClusterScannerStrategy = ClusterScannerStrategy;
