"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysScanner = void 0;
const ioredis_1 = require("ioredis");
const common_1 = require("@nestjs/common");
const database_total_util_1 = require("../../database/utils/database.total.util");
const key_info_provider_1 = require("./key-info/key-info.provider");
let KeysScanner = class KeysScanner {
    constructor(keyInfoProvider) {
        this.keyInfoProvider = keyInfoProvider;
    }
    async scan(client, opts) {
        let nodes = [];
        if (client instanceof ioredis_1.Cluster) {
            nodes = client.nodes('master');
        }
        else {
            nodes = [client];
        }
        return Promise.all(nodes.map((node) => this.nodeScan(node, opts)));
    }
    async nodeScan(client, opts) {
        const total = await (0, database_total_util_1.getTotal)(client);
        let indexes;
        let libraries;
        try {
            indexes = await client.sendCommand(new ioredis_1.Command('FT._LIST', [], { replyEncoding: 'utf8' }));
        }
        catch (err) {
        }
        try {
            libraries = await client.sendCommand(new ioredis_1.Command('TFUNCTION', ['LIST'], { replyEncoding: 'utf8' }));
        }
        catch (err) {
        }
        const [, keys,] = await client.sendCommand(new ioredis_1.Command('scan', [0, ...opts.filter.getScanArgsArray()]));
        const [sizes, types, ttls] = await Promise.all([
            client.pipeline(keys.map((key) => ([
                'memory',
                'usage',
                key,
                'samples',
                '0',
            ]))).exec(),
            client.pipeline(keys.map((key) => ([
                'type',
                key,
            ]))).exec(),
            client.pipeline(keys.map((key) => ([
                'ttl',
                key,
            ]))).exec(),
        ]);
        const lengths = await Promise.all(keys.map(async (key, i) => {
            const strategy = this.keyInfoProvider.getStrategy(types[i][1]);
            return strategy.getLengthSafe(client, key);
        }));
        const nodeKeys = [];
        for (let i = 0; i < keys.length; i += 1) {
            nodeKeys.push({
                name: keys[i],
                memory: sizes[i][0] ? null : sizes[i][1],
                length: lengths[i],
                type: types[i][0] ? 'N/A' : types[i][1],
                ttl: ttls[i][0] ? -2 : ttls[i][1],
            });
        }
        return {
            keys: nodeKeys,
            indexes,
            libraries,
            progress: {
                total,
                scanned: opts.filter.count,
                processed: nodeKeys.length,
            },
            client,
        };
    }
};
KeysScanner = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [key_info_provider_1.KeyInfoProvider])
], KeysScanner);
exports.KeysScanner = KeysScanner;
