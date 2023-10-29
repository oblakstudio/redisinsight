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
exports.CloudDatabaseCapiService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../common/utils");
const cloud_database_capi_provider_1 = require("./cloud-database.capi.provider");
const models_1 = require("./models");
const utils_2 = require("./utils");
const config_1 = require("../../../utils/config");
const utils_3 = require("../task/utils");
const cloudConfig = config_1.default.get('cloud');
let CloudDatabaseCapiService = class CloudDatabaseCapiService {
    constructor(capi) {
        this.capi = capi;
        this.logger = new common_1.Logger('CloudDatabaseCapiService');
    }
    async getDatabase(authDto, dto) {
        try {
            this.logger.log('Getting cloud database', dto);
            const database = await this.capi.getDatabase(authDto, dto);
            this.logger.log('Succeed to get databases in RE cloud subscription.');
            return (0, utils_2.parseCloudDatabaseCapiResponse)(database, dto.subscriptionId, dto.subscriptionType, dto.free);
        }
        catch (e) {
            this.logger.error('Failed to get cloud database', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async getDatabases(authDto, dto) {
        try {
            this.logger.log('Getting cloud databases from subscription');
            const data = await this.capi.getDatabases(authDto, dto);
            this.logger.log('Succeed to get cloud databases from subscription.');
            return (0, utils_2.parseCloudDatabasesCapiResponse)(data, dto.subscriptionType, dto.free);
        }
        catch (e) {
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async createFreeDatabase(authDto, dto) {
        try {
            this.logger.log('Creating free database');
            const task = await this.capi.createFreeDatabase(authDto, {
                ...dto,
                name: cloudConfig.freeDatabaseName,
                protocol: models_1.CloudDatabaseProtocol.Stack,
                dataPersistence: models_1.CloudDatabasePersistencePolicy.None,
                dataEvictionPolicy: models_1.CloudDatabaseDataEvictionPolicy.VolatileLru,
                replication: false,
                alerts: [
                    {
                        name: models_1.CloudDatabaseAlertName.ConnectionsLimit,
                        value: 80,
                    },
                    {
                        name: models_1.CloudDatabaseAlertName.DatasetsSize,
                        value: 80,
                    },
                ],
            });
            return (0, utils_3.parseCloudTaskCapiResponse)(task);
        }
        catch (e) {
            this.logger.error('Unable to create free database', e);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
};
CloudDatabaseCapiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloud_database_capi_provider_1.CloudDatabaseCapiProvider])
], CloudDatabaseCapiService);
exports.CloudDatabaseCapiService = CloudDatabaseCapiService;
