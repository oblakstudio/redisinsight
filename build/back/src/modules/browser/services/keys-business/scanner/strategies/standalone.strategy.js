"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandaloneStrategy = void 0;
const lodash_1 = require("lodash");
const config_1 = require("../../../../../../utils/config");
const utils_1 = require("../../../../../../utils");
const browser_tool_commands_1 = require("../../../../constants/browser-tool-commands");
const database_total_util_1 = require("../../../../../database/utils/database.total.util");
const abstract_strategy_1 = require("./abstract.strategy");
const REDIS_SCAN_CONFIG = config_1.default.get('redis_scan');
class StandaloneStrategy extends abstract_strategy_1.AbstractStrategy {
    constructor(redisManager, settingsService) {
        super(redisManager);
        this.redisManager = redisManager;
        this.settingsService = settingsService;
    }
    async getKeys(clientOptions, args) {
        var _a;
        const match = args.match !== undefined ? args.match : '*';
        const count = args.count || REDIS_SCAN_CONFIG.countDefault;
        const client = await this.redisManager.getRedisClient(clientOptions);
        const node = {
            total: 0,
            scanned: 0,
            keys: [],
            cursor: parseInt(args.cursor, 10),
        };
        node.total = await (0, database_total_util_1.getTotal)(client);
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
        await this.scan(clientOptions, node, match, count, args.type);
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
    async scan(clientOptions, node, match, count, type) {
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
            const execResult = await this.redisManager.execCommand(clientOptions, browser_tool_commands_1.BrowserToolKeysCommands.Scan, [...commandArgs], null);
            const [nextCursor, keys] = execResult;
            node.cursor = parseInt(nextCursor, 10);
            node.scanned += COUNT;
            node.keys.push(...keys);
            fullScanned = node.cursor === 0;
        }
    }
}
exports.StandaloneStrategy = StandaloneStrategy;
