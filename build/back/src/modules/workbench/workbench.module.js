"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WorkbenchModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkbenchModule = void 0;
const common_1 = require("@nestjs/common");
const workbench_controller_1 = require("./workbench.controller");
const redis_connection_middleware_1 = require("../../middleware/redis-connection.middleware");
const nest_router_1 = require("nest-router");
const workbench_service_1 = require("./workbench.service");
const workbench_commands_executor_1 = require("./providers/workbench-commands.executor");
const command_execution_repository_1 = require("./repositories/command-execution.repository");
const plugin_state_repository_1 = require("./repositories/plugin-state.repository");
const commands_module_1 = require("../commands/commands.module");
const commands_service_1 = require("../commands/commands.service");
const commands_json_provider_1 = require("../commands/commands-json.provider");
const plugins_service_1 = require("./plugins.service");
const plugin_commands_whitelist_provider_1 = require("./providers/plugin-commands-whitelist.provider");
const plugins_controller_1 = require("./plugins.controller");
const local_plugin_state_repository_1 = require("./repositories/local-plugin-state.repository");
const local_command_execution_repository_1 = require("./repositories/local-command-execution.repository");
const config_1 = require("../../utils/config");
const workbench_analytics_service_1 = require("./services/workbench-analytics/workbench-analytics.service");
const COMMANDS_CONFIGS = config_1.default.get('commands');
let WorkbenchModule = WorkbenchModule_1 = class WorkbenchModule {
    static register(commandExecutionRepository = local_command_execution_repository_1.LocalCommandExecutionRepository, pluginStateRepository = local_plugin_state_repository_1.LocalPluginStateRepository) {
        return {
            module: WorkbenchModule_1,
            imports: [
                commands_module_1.CommandsModule,
            ],
            controllers: [
                workbench_controller_1.WorkbenchController,
                plugins_controller_1.PluginsController,
            ],
            providers: [
                workbench_service_1.WorkbenchService,
                workbench_commands_executor_1.WorkbenchCommandsExecutor,
                {
                    provide: command_execution_repository_1.CommandExecutionRepository,
                    useClass: commandExecutionRepository,
                },
                {
                    provide: plugin_state_repository_1.PluginStateRepository,
                    useClass: pluginStateRepository,
                },
                {
                    provide: commands_service_1.CommandsService,
                    useFactory: () => new commands_service_1.CommandsService(COMMANDS_CONFIGS.map(({ name, url }) => new commands_json_provider_1.CommandsJsonProvider(name, url))),
                },
                plugins_service_1.PluginsService,
                plugin_commands_whitelist_provider_1.PluginCommandsWhitelistProvider,
                workbench_analytics_service_1.WorkbenchAnalyticsService,
            ],
        };
    }
    configure(consumer) {
        consumer
            .apply(redis_connection_middleware_1.RedisConnectionMiddleware)
            .forRoutes(nest_router_1.RouterModule.resolvePath(workbench_controller_1.WorkbenchController));
    }
};
WorkbenchModule = WorkbenchModule_1 = __decorate([
    (0, common_1.Module)({})
], WorkbenchModule);
exports.WorkbenchModule = WorkbenchModule;
