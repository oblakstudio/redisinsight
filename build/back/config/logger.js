"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
require("winston-daily-rotate-file");
const nest_winston_1 = require("nest-winston");
const path_1 = require("path");
const config_1 = require("../src/utils/config");
const logsFormatter_1 = require("../src/utils/logsFormatter");
const PATH_CONFIG = config_1.default.get('dir_path');
const LOGGER_CONFIG = config_1.default.get('logger');
const transportsConfig = [];
if (LOGGER_CONFIG.stdout) {
    transportsConfig.push(new winston_1.transports.Console({
        format: winston_1.format.combine((0, logsFormatter_1.sensitiveDataFormatter)({ omitSensitiveData: LOGGER_CONFIG.omitSensitiveData }), winston_1.format.timestamp(), nest_winston_1.utilities.format.nestLike()),
    }));
}
if (LOGGER_CONFIG.files) {
    transportsConfig.push(new winston_1.transports.DailyRotateFile({
        dirname: (0, path_1.join)(PATH_CONFIG.logs),
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '7d',
        filename: 'redisinsight-errors-%DATE%.log',
        level: 'error',
        format: winston_1.format.combine((0, logsFormatter_1.sensitiveDataFormatter)({ omitSensitiveData: LOGGER_CONFIG.omitSensitiveData }), logsFormatter_1.prettyFormat),
    }));
    transportsConfig.push(new winston_1.transports.DailyRotateFile({
        dirname: (0, path_1.join)(PATH_CONFIG.logs),
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '7d',
        filename: 'redisinsight-%DATE%.log',
        format: winston_1.format.combine((0, logsFormatter_1.sensitiveDataFormatter)({ omitSensitiveData: LOGGER_CONFIG.omitSensitiveData }), logsFormatter_1.prettyFormat),
    }));
}
const logger = {
    format: winston_1.format.errors({ stack: true }),
    transports: transportsConfig,
    level: LOGGER_CONFIG.logLevel,
};
exports.default = logger;
