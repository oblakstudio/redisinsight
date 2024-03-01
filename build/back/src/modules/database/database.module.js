"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const config_1 = require("../../utils/config");
const common_1 = require("@nestjs/common");
const database_service_1 = require("./database.service");
const database_controller_1 = require("./database.controller");
const database_repository_1 = require("./repositories/database.repository");
const local_database_repository_1 = require("./repositories/local.database.repository");
const database_analytics_1 = require("./database.analytics");
const database_connection_service_1 = require("./database-connection.service");
const database_factory_1 = require("./providers/database.factory");
const database_info_controller_1 = require("./database-info.controller");
const database_info_service_1 = require("./database-info.service");
const database_overview_provider_1 = require("./providers/database-overview.provider");
const stack_databases_repository_1 = require("./repositories/stack.databases.repository");
const database_client_factory_1 = require("./providers/database.client.factory");
const database_info_provider_1 = require("./providers/database-info.provider");
const connection_middleware_1 = require("./middleware/connection.middleware");
const SERVER_CONFIG = config_1.default.get('server');
let DatabaseModule = DatabaseModule_1 = class DatabaseModule {
    static register(databaseRepository = SERVER_CONFIG.buildType === 'REDIS_STACK' ? stack_databases_repository_1.StackDatabasesRepository : local_database_repository_1.LocalDatabaseRepository) {
        return {
            module: DatabaseModule_1,
            controllers: [
                database_controller_1.DatabaseController,
                database_info_controller_1.DatabaseInfoController,
            ],
            providers: [
                database_service_1.DatabaseService,
                database_connection_service_1.DatabaseConnectionService,
                database_client_factory_1.DatabaseClientFactory,
                database_info_provider_1.DatabaseInfoProvider,
                database_analytics_1.DatabaseAnalytics,
                database_factory_1.DatabaseFactory,
                database_info_service_1.DatabaseInfoService,
                database_overview_provider_1.DatabaseOverviewProvider,
                {
                    provide: database_repository_1.DatabaseRepository,
                    useClass: databaseRepository,
                },
            ],
            exports: [
                database_repository_1.DatabaseRepository,
                database_service_1.DatabaseService,
                database_connection_service_1.DatabaseConnectionService,
                database_client_factory_1.DatabaseClientFactory,
                database_factory_1.DatabaseFactory,
                database_info_service_1.DatabaseInfoService,
                database_info_provider_1.DatabaseInfoProvider,
            ],
        };
    }
    configure(consumer) {
        consumer
            .apply(connection_middleware_1.ConnectionMiddleware)
            .forRoutes({ path: 'databases', method: common_1.RequestMethod.POST }, { path: 'databases/test', method: common_1.RequestMethod.POST }, { path: 'databases/:id/connect', method: common_1.RequestMethod.GET });
    }
};
DatabaseModule = DatabaseModule_1 = __decorate([
    (0, common_1.Module)({})
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
