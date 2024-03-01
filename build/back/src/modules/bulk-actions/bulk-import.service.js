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
exports.BulkImportService = void 0;
const path_1 = require("path");
const fs = require("fs-extra");
const common_1 = require("@nestjs/common");
const readline = require("readline");
const utils_1 = require("../../common/utils");
const database_client_factory_1 = require("../database/providers/database.client.factory");
const cli_helper_1 = require("../../utils/cli-helper");
const bulk_action_summary_1 = require("./models/bulk-action-summary");
const constants_1 = require("./constants");
const bulk_actions_analytics_1 = require("./bulk-actions.analytics");
const client_1 = require("../redis/client");
const config_1 = require("../../utils/config");
const BATCH_LIMIT = 10000;
const PATH_CONFIG = config_1.default.get('dir_path');
const SERVER_CONFIG = config_1.default.get('server');
let BulkImportService = class BulkImportService {
    constructor(databaseClientFactory, analytics) {
        this.databaseClientFactory = databaseClientFactory;
        this.analytics = analytics;
        this.logger = new common_1.Logger('BulkImportService');
    }
    async executeBatch(client, batch) {
        const result = new bulk_action_summary_1.BulkActionSummary();
        result.addProcessed(batch.length);
        try {
            if (client.getConnectionType() === client_1.RedisClientConnectionType.CLUSTER) {
                await Promise.all(batch.map(async (command) => {
                    try {
                        await client.call(command);
                        result.addSuccess(1);
                    }
                    catch (e) {
                        result.addFailed(1);
                    }
                }));
            }
            else {
                (await client.sendPipeline(batch, { unknownCommands: true })).forEach(([err]) => {
                    if (err) {
                        result.addFailed(1);
                    }
                    else {
                        result.addSuccess(1);
                    }
                });
            }
        }
        catch (e) {
            this.logger.error('Unable to execute batch of commands', e);
            result.addFailed(batch.length);
        }
        return result;
    }
    async import(clientMetadata, fileStream) {
        const startTime = Date.now();
        const result = {
            id: 'empty',
            databaseId: clientMetadata.databaseId,
            type: constants_1.BulkActionType.Upload,
            summary: {
                processed: 0,
                succeed: 0,
                failed: 0,
                errors: [],
            },
            progress: null,
            filter: null,
            status: constants_1.BulkActionStatus.Completed,
            duration: 0,
        };
        this.analytics.sendActionStarted(result);
        let parseErrors = 0;
        let client;
        try {
            client = await this.databaseClientFactory.createClient(clientMetadata);
            let batch = [];
            const batchResults = [];
            try {
                const rl = readline.createInterface({
                    input: fileStream,
                });
                for await (const line of rl) {
                    try {
                        const command = (0, cli_helper_1.splitCliCommandLine)((line.trim()));
                        if (batch.length >= BATCH_LIMIT) {
                            batchResults.push(await this.executeBatch(client, batch));
                            batch = [];
                        }
                        if (command === null || command === void 0 ? void 0 : command[0]) {
                            batch.push(command);
                        }
                    }
                    catch (e) {
                        parseErrors += 1;
                    }
                }
            }
            catch (e) {
                result.summary.errors.push(e);
                result.status = constants_1.BulkActionStatus.Failed;
                this.analytics.sendActionFailed(result, e);
            }
            batchResults.push(await this.executeBatch(client, batch));
            batchResults.forEach((batchResult) => {
                result.summary.processed += batchResult.getOverview().processed;
                result.summary.succeed += batchResult.getOverview().succeed;
                result.summary.failed += batchResult.getOverview().failed;
            });
            result.duration = Date.now() - startTime;
            result.summary.processed += parseErrors;
            result.summary.failed += parseErrors;
            if (result.status === constants_1.BulkActionStatus.Completed) {
                this.analytics.sendActionSucceed(result);
            }
            client.disconnect();
            return result;
        }
        catch (e) {
            this.logger.error('Unable to process an import file', e);
            const exception = (0, utils_1.wrapHttpError)(e);
            this.analytics.sendActionFailed(result, exception);
            client === null || client === void 0 ? void 0 : client.disconnect();
            throw exception;
        }
    }
    async uploadFromTutorial(clientMetadata, dto) {
        try {
            const filePath = (0, path_1.join)(dto.path);
            const staticPath = (0, path_1.join)(SERVER_CONFIG.base, SERVER_CONFIG.staticUri);
            let trimmedPath = filePath;
            if (filePath.indexOf(staticPath) === 0) {
                trimmedPath = filePath.slice(staticPath.length);
            }
            const path = (0, path_1.join)(PATH_CONFIG.homedir, trimmedPath);
            if (!path.startsWith(PATH_CONFIG.homedir) || !await fs.pathExists(path)) {
                throw new common_1.BadRequestException('Data file was not found');
            }
            return this.import(clientMetadata, fs.createReadStream(path));
        }
        catch (e) {
            this.logger.error('Unable to process an import file path from tutorial', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
};
BulkImportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_client_factory_1.DatabaseClientFactory,
        bulk_actions_analytics_1.BulkActionsAnalytics])
], BulkImportService);
exports.BulkImportService = BulkImportService;
