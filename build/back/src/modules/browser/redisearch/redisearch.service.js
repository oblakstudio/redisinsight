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
exports.RedisearchService = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../constants/error-messages");
const utils_1 = require("../../../utils");
const dto_1 = require("./dto");
const dto_2 = require("../keys/dto");
const constants_1 = require("../../../constants");
const class_transformer_1 = require("class-transformer");
const base_helper_1 = require("../../../utils/base.helper");
const constants_2 = require("../../../common/constants");
const dto_3 = require("../browser-history/dto");
const browser_history_service_1 = require("../browser-history/browser-history.service");
const database_client_factory_1 = require("../../database/providers/database.client.factory");
const client_1 = require("../../redis/client");
let RedisearchService = class RedisearchService {
    constructor(databaseClientFactory, browserHistory) {
        this.databaseClientFactory = databaseClientFactory;
        this.browserHistory = browserHistory;
        this.maxSearchResults = new Map();
        this.logger = new common_1.Logger('RedisearchService');
    }
    async list(clientMetadata) {
        this.logger.log('Getting all redisearch indexes.');
        try {
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            const nodes = await this.getShards(client);
            const res = await Promise.all(nodes.map(async (node) => node.sendCommand(['FT._LIST'])));
            return (0, class_transformer_1.plainToClass)(dto_1.ListRedisearchIndexesResponse, {
                indexes: ((0, lodash_1.uniq)(([].concat(...res)).map((idx) => idx.toString('hex')))).map((idx) => Buffer.from(idx, 'hex')),
            });
        }
        catch (e) {
            this.logger.error('Failed to get redisearch indexes', e);
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async createIndex(clientMetadata, dto) {
        var _a, _b;
        this.logger.log('Creating redisearch index.');
        try {
            const { index, type, prefixes, fields, } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            try {
                const indexInfo = await client.sendCommand([
                    'FT.INFO',
                    index,
                ], { replyEncoding: 'utf8' });
                if (indexInfo) {
                    this.logger.error(`Failed to create redisearch index. ${error_messages_1.default.REDISEARCH_INDEX_EXIST}`);
                    return Promise.reject(new common_1.ConflictException(error_messages_1.default.REDISEARCH_INDEX_EXIST));
                }
            }
            catch (error) {
                if (!((_b = (_a = error.message) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes('unknown index name'))) {
                    throw error;
                }
            }
            const nodes = await this.getShards(client);
            const commandArgs = [
                index, 'ON', type,
            ];
            if (prefixes && prefixes.length) {
                commandArgs.push('PREFIX', prefixes.length, ...prefixes);
            }
            commandArgs.push('SCHEMA', ...[].concat(...fields.map((field) => ([field.name, field.type]))));
            await Promise.all(nodes.map(async (node) => {
                try {
                    await node.sendCommand([
                        'FT.CREATE',
                        ...commandArgs,
                    ], { replyEncoding: 'utf8' });
                }
                catch (e) {
                    if (!e.message.includes('MOVED') && !e.message.includes('already exists')) {
                        throw e;
                    }
                }
            }));
            return undefined;
        }
        catch (e) {
            this.logger.error('Failed to create redisearch index', e);
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async search(clientMetadata, dto) {
        var _a;
        this.logger.log('Searching keys using redisearch.');
        try {
            const { index, query, offset, limit, } = dto;
            const client = await this.databaseClientFactory.getOrCreateClient(clientMetadata);
            if ((0, lodash_1.isUndefined)(this.maxSearchResults.get(clientMetadata.databaseId))) {
                try {
                    const [[, maxSearchResults]] = await client.sendCommand([
                        'FT.CONFIG',
                        'GET',
                        'MAXSEARCHRESULTS',
                    ], { replyEncoding: 'utf8' });
                    this.maxSearchResults.set(clientMetadata.databaseId, (0, lodash_1.toNumber)(maxSearchResults));
                }
                catch (error) {
                    this.maxSearchResults.set(clientMetadata.databaseId, null);
                }
            }
            let safeLimit = limit;
            const maxSearchResult = this.maxSearchResults.get(clientMetadata.databaseId);
            if (maxSearchResult && offset + limit > maxSearchResult) {
                safeLimit = offset <= maxSearchResult ? maxSearchResult - offset : limit;
            }
            const [total, ...keyNames] = await client.sendCommand([
                'FT.SEARCH',
                index,
                query,
                'NOCONTENT',
                'LIMIT',
                offset,
                safeLimit,
            ]);
            let type;
            if (keyNames.length) {
                type = await client.sendCommand([
                    'TYPE',
                    keyNames[0],
                ], { replyEncoding: 'utf8' });
            }
            if (query !== constants_1.DEFAULT_MATCH) {
                await this.browserHistory.create(clientMetadata, (0, class_transformer_1.plainToClass)(dto_3.CreateBrowserHistoryDto, { filter: { match: query, type: null }, mode: constants_2.BrowserHistoryMode.Redisearch }));
            }
            return (0, class_transformer_1.plainToClass)(dto_2.GetKeysWithDetailsResponse, {
                cursor: limit + offset >= total ? 0 : limit + offset,
                total,
                scanned: keyNames.length + offset,
                keys: keyNames.map((name) => ({ name, type })),
                maxResults: maxSearchResult,
            });
        }
        catch (e) {
            this.logger.error('Failed to search keys using redisearch index', e);
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            if ((_a = e.message) === null || _a === void 0 ? void 0 : _a.includes(constants_1.RedisErrorCodes.RedisearchLimit)) {
                throw new common_1.BadRequestException(error_messages_1.default.INCREASE_MINIMUM_LIMIT((0, base_helper_1.numberWithSpaces)(dto.limit)));
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async getShards(client) {
        if (client.getConnectionType() === client_1.RedisClientConnectionType.CLUSTER) {
            return client.nodes(client_1.RedisClientNodeRole.PRIMARY);
        }
        return [client];
    }
};
RedisearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory,
        browser_history_service_1.BrowserHistoryService])
], RedisearchService);
exports.RedisearchService = RedisearchService;
