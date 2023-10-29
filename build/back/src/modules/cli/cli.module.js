"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliModule = void 0;
const common_1 = require("@nestjs/common");
const nest_router_1 = require("nest-router");
const redis_connection_middleware_1 = require("../../middleware/redis-connection.middleware");
const redis_tool_service_1 = require("../redis/redis-tool.service");
const redis_tool_factory_1 = require("../redis/redis-tool.factory");
const commands_module_1 = require("../commands/commands.module");
const commands_service_1 = require("../commands/commands.service");
const commands_json_provider_1 = require("../commands/commands-json.provider");
const models_1 = require("../../common/models");
const config_1 = require("../../utils/config");
const cli_controller_1 = require("./controllers/cli.controller");
const cli_business_service_1 = require("./services/cli-business/cli-business.service");
const cli_analytics_service_1 = require("./services/cli-analytics/cli-analytics.service");
const COMMANDS_CONFIGS = config_1.default.get('commands');
let CliModule = class CliModule {
    configure(consumer) {
        consumer
            .apply(redis_connection_middleware_1.RedisConnectionMiddleware)
            .forRoutes(nest_router_1.RouterModule.resolvePath(cli_controller_1.CliController));
    }
};
CliModule = __decorate([
    (0, common_1.Module)({
        imports: [commands_module_1.CommandsModule],
        controllers: [cli_controller_1.CliController],
        providers: [
            cli_business_service_1.CliBusinessService,
            cli_analytics_service_1.CliAnalyticsService,
            {
                provide: redis_tool_service_1.RedisToolService,
                useFactory: (redisToolFactory) => redisToolFactory.createRedisTool(models_1.ClientContext.CLI, { enableAutoConnection: false }),
                inject: [redis_tool_factory_1.RedisToolFactory],
            },
            {
                provide: commands_service_1.CommandsService,
                useFactory: () => new commands_service_1.CommandsService(COMMANDS_CONFIGS.map(({ name, url }) => new commands_json_provider_1.CommandsJsonProvider(name, url))),
            },
        ],
    })
], CliModule);
exports.CliModule = CliModule;
