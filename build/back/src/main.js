"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const bodyParser = require("body-parser");
const nest_winston_1 = require("nest-winston");
const global_exception_filter_1 = require("./exceptions/global-exception.filter");
const utils_1 = require("./utils");
const init_helper_1 = require("./init-helper");
const log_file_provider_1 = require("./modules/profiler/providers/log-file.provider");
const window_auth_adapter_1 = require("./modules/auth/window-auth/adapters/window-auth.adapter");
const app_module_1 = require("./app.module");
const swagger_2 = require("../config/swagger");
const logger_1 = require("../config/logger");
const createHttpOptions_1 = require("./utils/createHttpOptions");
const serverConfig = (0, utils_1.get)('server');
async function bootstrap(apiPort) {
    await (0, init_helper_1.migrateHomeFolder)();
    await (0, init_helper_1.removeGuidesFolder)();
    const { port, host } = serverConfig;
    const logger = nest_winston_1.WinstonModule.createLogger(logger_1.default);
    const options = {
        logger,
    };
    if (serverConfig.tlsCert && serverConfig.tlsKey) {
        options.httpsOptions = await (0, createHttpOptions_1.createHttpOptions)(serverConfig);
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, options);
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter(app.getHttpAdapter()));
    app.use(bodyParser.json({ limit: '512mb' }));
    app.use(bodyParser.urlencoded({ limit: '512mb', extended: true }));
    app.enableCors();
    app.setGlobalPrefix(serverConfig.globalPrefix);
    if (process.env.RI_APP_TYPE !== 'electron') {
        swagger_1.SwaggerModule.setup(serverConfig.docPrefix, app, swagger_1.SwaggerModule.createDocument(app, swagger_2.default), {
            swaggerOptions: {
                docExpansion: 'none',
                tagsSorter: 'alpha',
                operationsSorter: 'alpha',
            },
        });
    }
    else {
        app.useWebSocketAdapter(new window_auth_adapter_1.WindowsAuthAdapter(app));
    }
    const logFileProvider = app.get(log_file_provider_1.LogFileProvider);
    await app.listen(apiPort || port, host);
    logger.log({
        message: `Server is running on http(s)://${host}:${port}`,
        context: 'bootstrap',
    });
    const gracefulShutdown = (signal) => {
        try {
            logger.log(`Signal ${signal} received. Shutting down...`);
            logFileProvider.onModuleDestroy();
        }
        catch (e) {
        }
        process.exit(0);
    };
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
    return { app, gracefulShutdown };
}
exports.default = bootstrap;
if (process.env.RI_APP_TYPE !== 'electron') {
    bootstrap();
}
