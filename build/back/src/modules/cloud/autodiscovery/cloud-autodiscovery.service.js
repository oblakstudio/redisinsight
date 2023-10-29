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
exports.CloudAutodiscoveryService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const error_messages_1 = require("../../../constants/error-messages");
const database_service_1 = require("../../database/database.service");
const database_entity_1 = require("../../database/entities/database.entity");
const models_1 = require("../../../common/models");
const cloud_autodiscovery_analytics_1 = require("./cloud-autodiscovery.analytics");
const cloud_subscription_capi_service_1 = require("../subscription/cloud-subscription.capi.service");
const utils_1 = require("../../../common/utils");
const cloud_user_capi_service_1 = require("../user/cloud-user.capi.service");
const cloud_database_capi_service_1 = require("../database/cloud-database.capi.service");
const models_2 = require("../subscription/models");
const models_3 = require("../database/models");
const config_1 = require("../../../utils/config");
const cloudConfig = config_1.default.get('cloud');
let CloudAutodiscoveryService = class CloudAutodiscoveryService {
    constructor(databaseService, cloudSubscriptionCapiService, cloudUserCapiService, cloudDatabaseCapiService, analytics) {
        this.databaseService = databaseService;
        this.cloudSubscriptionCapiService = cloudSubscriptionCapiService;
        this.cloudUserCapiService = cloudUserCapiService;
        this.cloudDatabaseCapiService = cloudDatabaseCapiService;
        this.analytics = analytics;
        this.logger = new common_1.Logger('CloudAutodiscoveryService');
    }
    async getAccount(authDto) {
        try {
            return await this.cloudUserCapiService.getCurrentAccount(authDto);
        }
        catch (e) {
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async getSubscriptions(authDto, type, authType) {
        try {
            const subscriptions = await this.cloudSubscriptionCapiService.getSubscriptions(authDto, type);
            this.analytics.sendGetRECloudSubsSucceedEvent(subscriptions, type, authType);
            return subscriptions;
        }
        catch (e) {
            this.analytics.sendGetRECloudSubsFailedEvent(e, type, authType);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async discoverSubscriptions(authDto, authType) {
        return [].concat(...await Promise.all([
            this.getSubscriptions(authDto, models_2.CloudSubscriptionType.Fixed, authType),
            this.getSubscriptions(authDto, models_2.CloudSubscriptionType.Flexible, authType),
        ]));
    }
    async discoverDatabases(authDto, dto, authType) {
        let result = [];
        try {
            this.logger.log('Discovering cloud databases from subscription(s)');
            const subscriptions = (0, lodash_1.uniqBy)(dto.subscriptions, ({ subscriptionId, subscriptionType }) => [subscriptionId, subscriptionType].join());
            await Promise.all(subscriptions.map(async (subscription) => {
                const databases = await this.cloudDatabaseCapiService.getDatabases(authDto, subscription);
                result = result.concat(databases);
            }));
            this.analytics.sendGetRECloudDbsSucceedEvent(result, authType);
            return result;
        }
        catch (e) {
            this.analytics.sendGetRECloudDbsFailedEvent(e, authType);
            throw (0, utils_1.wrapHttpError)(e);
        }
    }
    async addRedisCloudDatabases(authDto, addDatabasesDto) {
        this.logger.log('Adding Redis Cloud databases.');
        return Promise.all(addDatabasesDto.map(async (dto) => {
            let database;
            try {
                database = await this.cloudDatabaseCapiService.getDatabase(authDto, dto);
                const { publicEndpoint, name, password, status, } = database;
                if (status !== models_3.CloudDatabaseStatus.Active) {
                    const exception = new common_1.ServiceUnavailableException(error_messages_1.default.DATABASE_IS_INACTIVE);
                    return {
                        ...dto,
                        status: models_1.ActionStatus.Fail,
                        message: exception.message,
                        error: exception === null || exception === void 0 ? void 0 : exception.getResponse(),
                        databaseDetails: database,
                    };
                }
                const [host, port] = publicEndpoint.split(':');
                await this.databaseService.create({
                    host,
                    port: parseInt(port, 10),
                    name,
                    nameFromProvider: name,
                    password,
                    provider: database_entity_1.HostingProvider.RE_CLOUD,
                    cloudDetails: database === null || database === void 0 ? void 0 : database.cloudDetails,
                    timeout: cloudConfig.cloudDatabaseConnectionTimeout,
                });
                return {
                    ...dto,
                    status: models_1.ActionStatus.Success,
                    message: 'Added',
                    databaseDetails: database,
                };
            }
            catch (error) {
                return {
                    ...dto,
                    status: models_1.ActionStatus.Fail,
                    message: error.message,
                    error: error === null || error === void 0 ? void 0 : error.response,
                    databaseDetails: database,
                };
            }
        }));
    }
};
CloudAutodiscoveryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        cloud_subscription_capi_service_1.CloudSubscriptionCapiService,
        cloud_user_capi_service_1.CloudUserCapiService,
        cloud_database_capi_service_1.CloudDatabaseCapiService,
        cloud_autodiscovery_analytics_1.CloudAutodiscoveryAnalytics])
], CloudAutodiscoveryService);
exports.CloudAutodiscoveryService = CloudAutodiscoveryService;
