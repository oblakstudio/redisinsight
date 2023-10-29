"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const os = require("os");
const homedir = process.env.APP_FOLDER_ABSOLUTE_PATH
    || ((0, path_1.join)(os.homedir(), process.env.APP_FOLDER_NAME || '.redisinsight-v2'));
const prevHomedir = (0, path_1.join)(os.homedir(), '.redisinsight-preview');
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
        env: 'production',
    },
    analytics: {
        writeKey: process.env.SEGMENT_WRITE_KEY || 'lK5MNZgHbxj6vQwFgqZxygA0BiDQb32n',
        flushInterval: parseInt(process.env.ANALYTICS_FLUSH_INTERVAL, 10) || 10000,
    },
    db: {
        database: (0, path_1.join)(homedir, 'redisinsight.db'),
    },
    cloud: {
        cApiUrl: process.env.RI_CLOUD_CAPI_URL || 'https://api.redislabs.com/v1',
    },
};
