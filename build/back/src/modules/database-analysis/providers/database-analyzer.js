"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseAnalyzer = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const base_helper_1 = require("../../../utils/base.helper");
const TOP_KEYS_LIMIT = 15;
const TOP_NSP_LIMIT = 15;
let DatabaseAnalyzer = class DatabaseAnalyzer {
    async analyze(analysis, keys) {
        const namespaces = await this.getNamespacesMap(keys, analysis.delimiter);
        return {
            ...analysis,
            totalKeys: await this.calculateSimpleSummary(keys, 1),
            totalMemory: await this.calculateSimpleSummary(keys, 'memory'),
            topKeysNsp: await this.calculateNspSummary(namespaces, 'keys'),
            topMemoryNsp: await this.calculateNspSummary(namespaces, 'memory'),
            topKeysLength: await this.calculateTopKeys([keys], 'length'),
            topKeysMemory: await this.calculateTopKeys([keys], 'memory'),
            expirationGroups: await this.calculateExpirationTimeGroups(keys),
        };
    }
    async calculateSimpleSummary(keys, field) {
        const summary = {
            total: 0,
            types: new Map(),
        };
        if ((0, lodash_1.isNumber)(field)) {
            keys.forEach((key) => {
                summary.total += 1;
                summary.types.set(key.type, (summary.types.get(key.type) || 0) + 1);
            });
        }
        else {
            keys.forEach((key) => {
                summary.total += key[field];
                summary.types.set(key.type, (summary.types.get(key.type) || 0) + key[field]);
            });
        }
        return {
            ...summary,
            types: this.calculateSimpleTypeSummary(summary.types),
        };
    }
    calculateSimpleTypeSummary(types) {
        return (0, lodash_1.sortBy)([...types.keys()].map((type) => ({ type, total: types.get(type) })), 'total').reverse();
    }
    async getNamespacesMap(keys, delimiter) {
        const namespaces = new Map();
        keys.forEach((key) => {
            const nsp = this.getNamespace(key.name, delimiter);
            if (!nsp) {
                return;
            }
            const namespace = namespaces.get(nsp) || {
                memory: 0,
                keys: 0,
                types: new Map(),
            };
            namespace.keys += 1;
            namespace.memory += key.memory;
            const namespaceType = namespace.types.get(key.type) || {
                memory: 0,
                keys: 0,
            };
            namespaceType.keys += 1;
            namespaceType.memory += key.memory;
            namespace.types.set(key.type, namespaceType);
            namespaces.set(nsp, namespace);
        });
        return namespaces;
    }
    getNamespace(key, delimiter = ':') {
        const pos = key.indexOf(delimiter);
        if (pos > -1) {
            return key.slice(0, pos).toString('hex');
        }
        return undefined;
    }
    async calculateNspSummary(namespaces, field) {
        const nspSummaries = (0, lodash_1.sortBy)([...namespaces.keys()].map((nsp) => ({ nsp, ...namespaces.get(nsp) })), field).reverse().slice(0, TOP_NSP_LIMIT);
        return nspSummaries.map((nspSummary) => ({
            ...nspSummary,
            nsp: Buffer.from(nspSummary.nsp || '', 'hex'),
            types: this.calculateNspTypeSummary(nspSummary.types, field),
        }));
    }
    calculateNspTypeSummary(nspTypes, field) {
        return (0, lodash_1.sortBy)([...nspTypes.keys()].map((type) => ({ type, ...nspTypes.get(type) })), field).reverse();
    }
    async calculateTopKeys(keysBatches, field) {
        return (0, base_helper_1.sortByNumberField)([].concat(...keysBatches.map((keysBatch) => (0, base_helper_1.sortByNumberField)(keysBatch, field).reverse().slice(0, TOP_KEYS_LIMIT))), field).reverse().slice(0, TOP_KEYS_LIMIT);
    }
    async calculateExpirationTimeGroups(keys) {
        const groups = [
            {
                threshold: 0,
                total: 0,
                label: 'No Expiry',
            },
            {
                threshold: 60 * 60,
                total: 0,
                label: '<1 hr',
            },
            {
                threshold: 4 * 60 * 60,
                total: 0,
                label: '1-4 Hrs',
            },
            {
                threshold: 12 * 60 * 60,
                total: 0,
                label: '4-12 Hrs',
            },
            {
                threshold: 24 * 60 * 60,
                total: 0,
                label: '12-24 Hrs',
            },
            {
                threshold: 7 * 24 * 60 * 60,
                total: 0,
                label: '1-7 Days',
            },
            {
                threshold: 30 * 24 * 60 * 60,
                total: 0,
                label: '>7 Days',
            },
            {
                threshold: Number.MAX_SAFE_INTEGER,
                total: 0,
                label: '>1 Month',
            },
        ];
        keys.forEach((key) => {
            for (let i = 0; i < groups.length; i += 1) {
                if (key.ttl < groups[i].threshold) {
                    groups[i].total += key.memory;
                    break;
                }
            }
        });
        return groups;
    }
};
DatabaseAnalyzer = __decorate([
    (0, common_1.Injectable)()
], DatabaseAnalyzer);
exports.DatabaseAnalyzer = DatabaseAnalyzer;
