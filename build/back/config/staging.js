"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const os = require("os");
const homedir = process.env.RI_APP_FOLDER_ABSOLUTE_PATH
    || ((0, path_1.join)(os.homedir(), process.env.RI_APP_FOLDER_NAME || '.redisinsight-app-stage'));
const prevHomedir = (0, path_1.join)(os.homedir(), '.redisinsight-v2-stage');
exports.default = {
    dir_path: {
        homedir,
        prevHomedir,
        logs: (0, path_1.join)(homedir, 'logs'),
        customPlugins: (0, path_1.join)(homedir, 'plugins'),
        customTutorials: (0, path_1.join)(homedir, 'custom-tutorials'),
        commands: (0, path_1.join)(homedir, 'commands'),
        guides: process.env.RI_GUIDES_PATH || (0, path_1.join)(homedir, 'guides'),
        tutorials: process.env.RI_TUTORIALS_PATH || (0, path_1.join)(homedir, 'tutorials'),
        content: process.env.RI_CONTENT_PATH || (0, path_1.join)(homedir, 'content'),
        caCertificates: (0, path_1.join)(homedir, 'ca_certificates'),
        clientCertificates: (0, path_1.join)(homedir, 'client_certificates'),
    },
    server: {
        env: 'staging',
    },
    analytics: {
        writeKey: process.env.RI_SEGMENT_WRITE_KEY || 'Ba1YuGnxzsQN9zjqTSvzPc6f3AvmH1mj',
    },
    db: {
        database: (0, path_1.join)(homedir, 'redisinsight.db'),
    },
    logger: {
        stdout: process.env.RI_STDOUT_LOGGER ? process.env.RI_STDOUT_LOGGER === 'true' : true,
        omitSensitiveData: process.env.RI_LOGGER_OMIT_DATA ? process.env.RI_LOGGER_OMIT_DATA === 'true' : false,
    },
};
