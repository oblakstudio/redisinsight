"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandaloneScannerStrategy = void 0;
const lodash_1 = require("lodash");
const config_1 = require("../../../../../utils/config");
const utils_1 = require("../../../../../utils");
const browser_tool_commands_1 = require("../../../constants/browser-tool-commands");
const common_1 = require("@nestjs/common");
const scanner_strategy_1 = require("./scanner.strategy");
const utils_2 = require("../../../../redis/utils");
const REDIS_SCAN_CONFIG = config_1.default.get('redis_scan');
let StandaloneScannerStrategy = class StandaloneScannerStrategy extends scanner_strategy_1.ScannerStrategy {
    async getKeysTtl(client, keys) {
        const result = await client.sendPipeline(keys.map((key) => [browser_tool_commands_1.BrowserToolKeysCommands.Ttl, key]));
        return result.map((item) => (item[0] ? null : item[1]));
    }
    async getKeysType(client, keys) {
        const result = await client.sendPipeline(keys.map((key) => [browser_tool_commands_1.BrowserToolKeysCommands.Type, key]), { replyEncoding: 'utf8' });
        return result.map((item) => (item[0] ? null : item[1]));
    }
    async getKeysSize(client, keys) {
        const result = await client.sendPipeline(keys.map((key) => [
            browser_tool_commands_1.BrowserToolKeysCommands.MemoryUsage,
            key,
            'samples',
            '0',
        ]));
        return result.map((item) => (item[0] ? null : item[1]));
    }
    async scan(client, node, match, count, type) {
        const COUNT = Math.min(2000, count);
        let fullScanned = false;
        const settings = await this.settingsService.getAppSettings('1');
        while ((node.total >= 0 || (0, lodash_1.isNull)(node.total))
            && !fullScanned
            && node.keys.length < count
            && (node.scanned < settings.scanThreshold)) {
            let commandArgs = [`${node.cursor}`, 'MATCH', match, 'COUNT', COUNT];
            if (type) {
                commandArgs = [...commandArgs, 'TYPE', type];
            }
            const execResult = await client.sendCommand([
                browser_tool_commands_1.BrowserToolKeysCommands.Scan,
                ...commandArgs,
            ]);
            const [nextCursor, keys] = execResult;
            node.cursor = parseInt(nextCursor, 10);
            node.scanned += COUNT;
            node.keys.push(...keys);
            fullScanned = node.cursor === 0;
        }
    }
    async getKeys(client, args) {
        var _a;
        const match = args.match !== undefined ? args.match : '*';
        const count = args.count || REDIS_SCAN_CONFIG.countDefault;
        const node = {
            total: 0,
            scanned: 0,
            keys: [],
            cursor: parseInt(args.cursor, 10),
        };
        node.total = await (0, utils_2.getTotalKeys)(client);
        if (!(0, utils_1.isRedisGlob)(match)) {
            const keyName = Buffer.from((0, utils_1.unescapeRedisGlob)(match));
            node.cursor = 0;
            node.scanned = (0, lodash_1.isNull)(node.total) ? 1 : node.total;
            node.keys = await this.getKeysInfo(client, [keyName], args.type);
            node.keys = node.keys.filter((key) => {
                if (key.ttl === -2) {
                    return false;
                }
                if (args.type) {
                    return key.type === args.type;
                }
                return true;
            });
            return [node];
        }
        await this.scan(client, node, match, count, args.type);
        if (node.keys.length && args.keysInfo) {
            node.keys = await this.getKeysInfo(client, node.keys, args.type);
        }
        else {
            node.keys = node.keys.map((name) => ({ name, type: args.type || undefined }));
        }
        if (!node.total && (node.cursor > 0 || ((_a = node.keys) === null || _a === void 0 ? void 0 : _a.length))) {
            node.total = null;
        }
        return [node];
    }
    async getKeysInfo(client, keys, filterType) {
        const sizeResults = await this.getKeysSize(client, keys);
        const typeResults = filterType
            ? Array(keys.length).fill(filterType)
            : await this.getKeysType(client, keys);
        const ttlResults = await this.getKeysTtl(client, keys);
        return keys.map((key, index) => ({
            name: key,
            type: typeResults[index],
            ttl: ttlResults[index],
            size: sizeResults[index],
        }));
    }
};
StandaloneScannerStrategy = __decorate([
    (0, common_1.Injectable)()
], StandaloneScannerStrategy);
exports.StandaloneScannerStrategy = StandaloneScannerStrategy;
