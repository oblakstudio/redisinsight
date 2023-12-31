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
const stream_1 = require("stream");
const readline = require("readline");
const utils_1 = require("../../common/utils");
const database_connection_service_1 = require("../database/database-connection.service");
const cli_helper_1 = require("../../utils/cli-helper");
const bulk_action_summary_1 = require("./models/bulk-action-summary");
const constants_1 = require("./constants");
const bulk_actions_analytics_service_1 = require("./bulk-actions-analytics.service");
const config_1 = require("../../utils/config");
const BATCH_LIMIT = 10000;
const PATH_CONFIG = config_1.default.get('dir_path');
const SERVER_CONFIG = config_1.default.get('server');
let BulkImportService = class BulkImportService {
    constructor(databaseConnectionService, analyticsService) {
        this.databaseConnectionService = databaseConnectionService;
        this.analyticsService = analyticsService;
        this.logger = new common_1.Logger('BulkImportService');
    }
    async executeBatch(client, batch) {
        const result = new bulk_action_summary_1.BulkActionSummary();
        result.addProcessed(batch.length);
        try {
            if (client === null || client === void 0 ? void 0 : client.isCluster) {
                await Promise.all(batch.map(async ([command, args]) => {
                    try {
                        await client.call(command, args);
                        result.addSuccess(1);
                    }
                    catch (e) {
                        result.addFailed(1);
                    }
                }));
            }
            else {
                const commands = batch.map(([cmd, args]) => ['call', cmd, ...args]);
                (await client.pipeline(commands).exec()).forEach(([err]) => {
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
    async import(clientMetadata, dto) {
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
        this.analyticsService.sendActionStarted(result);
        let parseErrors = 0;
        let client;
        try {
            client = await this.databaseConnectionService.createClient(clientMetadata);
            const stream = stream_1.Readable.from(dto.file.buffer);
            let batch = [];
            const batchResults = [];
            await new Promise((res) => {
                const rl = readline.createInterface(stream);
                rl.on('line', (line) => {
                    try {
                        const [command, ...args] = (0, cli_helper_1.splitCliCommandLine)((line.trim()));
                        if (batch.length >= BATCH_LIMIT) {
                            batchResults.push(this.executeBatch(client, batch));
                            batch = [];
                        }
                        if (command) {
                            batch.push([command.toLowerCase(), args]);
                        }
                    }
                    catch (e) {
                        parseErrors += 1;
                    }
                });
                rl.on('error', (error) => {
                    result.summary.errors.push(error);
                    result.status = constants_1.BulkActionStatus.Failed;
                    this.analyticsService.sendActionFailed(result, error);
                    res(null);
                });
                rl.on('close', () => {
                    batchResults.push(this.executeBatch(client, batch));
                    res(null);
                });
            });
            (await Promise.all(batchResults)).forEach((batchResult) => {
                result.summary.processed += batchResult.getOverview().processed;
                result.summary.succeed += batchResult.getOverview().succeed;
                result.summary.failed += batchResult.getOverview().failed;
            });
            result.duration = Date.now() - startTime;
            result.summary.processed += parseErrors;
            result.summary.failed += parseErrors;
            if (result.status === constants_1.BulkActionStatus.Completed) {
                this.analyticsService.sendActionSucceed(result);
            }
            client.disconnect();
            return result;
        }
        catch (e) {
            this.logger.error('Unable to process an import file', e);
            const exception = (0, utils_1.wrapHttpError)(e);
            this.analyticsService.sendActionFailed(result, exception);
            client === null || client === void 0 ? void 0 : client.disconnect();
            throw exception;
        }
    }
    async uploadFromTutorial(clientMetadata, dto) {
        var _a;
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
            if (((_a = (await fs.stat(path))) === null || _a === void 0 ? void 0 : _a.size) > 100 * 1024 * 1024) {
                throw new common_1.BadRequestException('Maximum file size is 100MB');
            }
            const buffer = await fs.readFile(path);
            return this.import(clientMetadata, {
                file: { buffer },
            });
        }
        catch (e) {
            this.logger.error('Unable to process an import file path from tutorial', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
};
BulkImportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_connection_service_1.DatabaseConnectionService,
        bulk_actions_analytics_service_1.BulkActionsAnalyticsService])
], BulkImportService);
exports.BulkImportService = BulkImportService;
