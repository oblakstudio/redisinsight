"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const fs = require("fs");
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const nest_router_1 = require("nest-router");
const path_1 = require("path");
const config_1 = require("./utils/config");
const plugin_module_1 = require("./modules/plugin/plugin.module");
const commands_module_1 = require("./modules/commands/commands.module");
const workbench_module_1 = require("./modules/workbench/workbench.module");
const slow_log_module_1 = require("./modules/slow-log/slow-log.module");
const pub_sub_module_1 = require("./modules/pub-sub/pub-sub.module");
const notification_module_1 = require("./modules/notification/notification.module");
const bulk_actions_module_1 = require("./modules/bulk-actions/bulk-actions.module");
const cluster_monitor_module_1 = require("./modules/cluster-monitor/cluster-monitor.module");
const database_analysis_module_1 = require("./modules/database-analysis/database-analysis.module");
const triggered_functions_module_1 = require("./modules/triggered-functions/triggered-functions.module");
const local_database_module_1 = require("./local-database.module");
const core_module_1 = require("./core.module");
const autodiscovery_module_1 = require("./modules/autodiscovery/autodiscovery.module");
const database_import_module_1 = require("./modules/database-import/database-import.module");
const single_user_auth_middleware_1 = require("./common/middlewares/single-user-auth.middleware");
const custom_tutorial_module_1 = require("./modules/custom-tutorial/custom-tutorial.module");
const cloud_module_1 = require("./modules/cloud/cloud.module");
const browser_module_1 = require("./modules/browser/browser.module");
const redis_enterprise_module_1 = require("./modules/redis-enterprise/redis-enterprise.module");
const redis_sentinel_module_1 = require("./modules/redis-sentinel/redis-sentinel.module");
const profiler_module_1 = require("./modules/profiler/profiler.module");
const cli_module_1 = require("./modules/cli/cli.module");
const statics_management_module_1 = require("./modules/statics-management/statics-management.module");
const exclude_route_middleware_1 = require("./middleware/exclude-route.middleware");
const app_routes_1 = require("./app.routes");
const SERVER_CONFIG = config_1.default.get('server');
const PATH_CONFIG = config_1.default.get('dir_path');
let AppModule = class AppModule {
    onModuleInit() {
        const foldersToCreate = [
            PATH_CONFIG.pluginsAssets,
            PATH_CONFIG.customPlugins,
        ];
        foldersToCreate.forEach((folder) => {
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
            }
        });
    }
    configure(consumer) {
        consumer
            .apply(single_user_auth_middleware_1.SingleUserAuthMiddleware)
            .exclude(...SERVER_CONFIG.excludeAuthRoutes)
            .forRoutes('*');
        consumer
            .apply(exclude_route_middleware_1.ExcludeRouteMiddleware)
            .forRoutes(...SERVER_CONFIG.excludeRoutes);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            local_database_module_1.LocalDatabaseModule,
            core_module_1.CoreModule,
            nest_router_1.RouterModule.forRoutes(app_routes_1.routes),
            autodiscovery_module_1.AutodiscoveryModule,
            redis_enterprise_module_1.RedisEnterpriseModule,
            cloud_module_1.CloudModule.register(),
            redis_sentinel_module_1.RedisSentinelModule,
            browser_module_1.BrowserModule,
            cli_module_1.CliModule,
            workbench_module_1.WorkbenchModule.register(),
            plugin_module_1.PluginModule,
            commands_module_1.CommandsModule,
            profiler_module_1.ProfilerModule,
            pub_sub_module_1.PubSubModule,
            slow_log_module_1.SlowLogModule,
            notification_module_1.NotificationModule,
            bulk_actions_module_1.BulkActionsModule,
            cluster_monitor_module_1.ClusterMonitorModule,
            custom_tutorial_module_1.CustomTutorialModule.register(),
            database_analysis_module_1.DatabaseAnalysisModule,
            database_import_module_1.DatabaseImportModule,
            triggered_functions_module_1.TriggeredFunctionsModule,
            cloud_module_1.CloudModule.register(),
            ...(SERVER_CONFIG.staticContent
                ? [
                    serve_static_1.ServeStaticModule.forRoot({
                        rootPath: (0, path_1.join)(__dirname, '..', '..', '..', 'ui', 'dist'),
                        exclude: ['/api/**', `${SERVER_CONFIG.customPluginsUri}/**`, `${SERVER_CONFIG.staticUri}/**`],
                    }),
                ]
                : []),
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: SERVER_CONFIG.customPluginsUri,
                rootPath: (0, path_1.join)(PATH_CONFIG.customPlugins),
                exclude: ['/api/**'],
                serveStaticOptions: {
                    fallthrough: false,
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: SERVER_CONFIG.staticUri,
                rootPath: (0, path_1.join)(PATH_CONFIG.staticDir),
                exclude: ['/api/**'],
                serveStaticOptions: {
                    fallthrough: false,
                },
            }),
            statics_management_module_1.StaticsManagementModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
