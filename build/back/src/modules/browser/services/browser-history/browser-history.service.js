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
exports.BrowserHistoryService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../../utils");
const lodash_1 = require("lodash");
const class_transformer_1 = require("class-transformer");
const database_connection_service_1 = require("../../../database/database-connection.service");
const browser_history_provider_1 = require("../../providers/history/browser-history.provider");
const get_browser_history_dto_1 = require("../../dto/browser-history/get.browser-history.dto");
let BrowserHistoryService = class BrowserHistoryService {
    constructor(databaseConnectionService, browserHistoryProvider) {
        this.databaseConnectionService = databaseConnectionService;
        this.browserHistoryProvider = browserHistoryProvider;
        this.logger = new common_1.Logger('BrowserHistoryService');
    }
    async create(clientMetadata, dto) {
        let client;
        try {
            client = await this.databaseConnectionService.createClient(clientMetadata);
            const history = (0, class_transformer_1.plainToClass)(get_browser_history_dto_1.BrowserHistory, { ...dto, databaseId: clientMetadata.databaseId });
            client.disconnect();
            return this.browserHistoryProvider.create(history);
        }
        catch (e) {
            client === null || client === void 0 ? void 0 : client.disconnect();
            this.logger.error('Unable to create browser history item', e);
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw (0, utils_1.catchAclError)(e);
        }
    }
    async get(id) {
        return this.browserHistoryProvider.get(id);
    }
    async list(databaseId, mode) {
        return this.browserHistoryProvider.list(databaseId, mode);
    }
    async delete(databaseId, id) {
        return this.browserHistoryProvider.delete(databaseId, id);
    }
    async bulkDelete(databaseId, ids) {
        this.logger.log(`Deleting many browser history items: ${ids}`);
        return {
            affected: (0, lodash_1.sum)(await Promise.all(ids.map(async (id) => {
                try {
                    await this.delete(databaseId, id);
                    return 1;
                }
                catch (e) {
                    return 0;
                }
            }))),
        };
    }
};
BrowserHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_connection_service_1.DatabaseConnectionService,
        browser_history_provider_1.BrowserHistoryProvider])
], BrowserHistoryService);
exports.BrowserHistoryService = BrowserHistoryService;
