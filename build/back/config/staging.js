"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const os = require("os");
const homedir = process.env.APP_FOLDER_ABSOLUTE_PATH
    || ((0, path_1.join)(os.homedir(), process.env.APP_FOLDER_NAME || '.redisinsight-v2-stage'));
const prevHomedir = (0, path_1.join)(os.homedir(), '.redisinsight-v2.0-stage');
exports.default = {
    dir_path: {
        homedir,
        prevHomedir,
        logs: (0, path_1.join)(homedir, 'logs'),
        customPlugins: (0, path_1.join)(homedir, 'plugins'),
        customTutorials: (0, path_1.join)(homedir, 'custom-tutorials'),
        commands: (0, path_1.join)(homedir, 'commands'),
        guides: process.env.GUIDES_DEV_PATH || (0, path_1.join)(homedir, 'guides'),
        tutorials: process.env.TUTORIALS_DEV_PATH || (0, path_1.join)(homedir, 'tutorials'),
        content: process.env.CONTENT_DEV_PATH || (0, path_1.join)(homedir, 'content'),
        caCertificates: (0, path_1.join)(homedir, 'ca_certificates'),
        clientCertificates: (0, path_1.join)(homedir, 'client_certificates'),
    },
    server: {
        env: 'staging',
    },
    analytics: {
        writeKey: process.env.SEGMENT_WRITE_KEY || 'Ba1YuGnxzsQN9zjqTSvzPc6f3AvmH1mj',
    },
    db: {
        database: (0, path_1.join)(homedir, 'redisinsight.db'),
    },
    logger: {
        stdout: process.env.STDOUT_LOGGER ? process.env.STDOUT_LOGGER === 'true' : true,
        omitSensitiveData: process.env.LOGGER_OMIT_DATA ? process.env.LOGGER_OMIT_DATA === 'true' : false,
    },
};
