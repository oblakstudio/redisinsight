"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusterStrategy = void 0;
const lodash_1 = require("lodash");
const config_1 = require("../../../../../../utils/config");
const utils_1 = require("../../../../../../utils");
const browser_tool_commands_1 = require("../../../../constants/browser-tool-commands");
const clusterCursor_1 = require("../../../../utils/clusterCursor");
const database_total_util_1 = require("../../../../../database/utils/database.total.util");
const abstract_strategy_1 = require("./abstract.strategy");
const REDIS_SCAN_CONFIG = config_1.default.get('redis_scan');
class ClusterStrategy extends abstract_strategy_1.AbstractStrategy {
    constructor(redisManager, settingsService) {
        super(redisManager);
        this.redisManager = redisManager;
        this.settingsService = settingsService;
    }
    async getKeys(clientOptions, args) {
        const match = args.match !== undefined ? args.match : '*';
        const count = args.count || REDIS_SCAN_CONFIG.countDefault;
        const client = await this.redisManager.getRedisClient(clientOptions);
        const nodes = await this.getNodesToScan(clientOptions, args.cursor);
        const settings = await this.settingsService.getAppSettings('1');
        await this.calculateNodesTotalKeys(nodes);
        if (!(0, utils_1.isRedisGlob)(match)) {
            const keyName = Buffer.from((0, utils_1.unescapeRedisGlob)(match));
            nodes.forEach((node) => {
                node.cursor = 0;
                node.scanned = (0, lodash_1.isNull)(node.total) ? 1 : node.total;
            });
            nodes[0].keys = [await this.getKeyInfo(client, keyName)];
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
            await this.scanNodes(clientOptions, nodes, match, count, args.type);
            allNodesScanned = !nodes.some((node) => node.cursor !== 0);
        }
        await Promise.all(nodes.map(async (node) => {
            if (node.keys.length && args.keysInfo) {
                node.keys = await this.getKeysInfo(node.node, node.keys, args.type);
            }
            else {
                node.keys = node.keys.map((name) => ({ name, type: args.type || undefined }));
            }
        }));
        return nodes.map((node) => (0, lodash_1.omit)(node, 'node'));
    }
    async getNodesToScan(clientMetadata, initialCursor) {
        const nodesClients = await this.redisManager.getNodes(clientMetadata, 'master');
        if (Number.isNaN((0, lodash_1.toNumber)(initialCursor))) {
            const nodes = (0, clusterCursor_1.parseClusterCursor)(initialCursor);
            nodes.forEach((node, index) => {
                nodes[index].node = nodesClients.find(({ options: { host, port } }) => host === node.host && port === node.port);
            });
            return nodes;
        }
        return nodesClients.map((node) => ({
            node,
            host: node.options.host,
            port: node.options.port,
            cursor: 0,
            keys: [],
            total: 0,
            scanned: 0,
        }));
    }
    async calculateNodesTotalKeys(nodes) {
        await Promise.all(nodes.map(async (node) => {
            node.total = await (0, database_total_util_1.getTotal)(node === null || node === void 0 ? void 0 : node.node);
        }));
    }
    async scanNodes(clientOptions, nodes, match, count, type) {
        await Promise.all(nodes.map(async (node) => {
            if ((node.cursor === 0 && node.scanned !== 0) || node.total === 0) {
                return;
            }
            const commandArgs = [`${node.cursor}`, 'MATCH', match, 'COUNT', count];
            if (type) {
                commandArgs.push('TYPE', type);
            }
            const { result, } = await this.redisManager.execCommandFromNode(clientOptions, browser_tool_commands_1.BrowserToolKeysCommands.Scan, commandArgs, { host: node.host, port: node.port }, null);
            node.cursor = parseInt(result[0], 10);
            node.keys.push(...result[1]);
            node.scanned += count;
        }));
    }
}
exports.ClusterStrategy = ClusterStrategy;
