"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const os = require("os");
const homedir = process.env.RI_APP_FOLDER_ABSOLUTE_PATH
    || ((0, path_1.join)(os.homedir(), process.env.RI_APP_FOLDER_NAME || '.redisinsight-app'));
const prevHomedir = (0, path_1.join)(os.homedir(), '.redisinsight-v2');
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
        env: 'production',
    },
    analytics: {
        writeKey: process.env.RI_SEGMENT_WRITE_KEY || 'lK5MNZgHbxj6vQwFgqZxygA0BiDQb32n',
        flushInterval: parseInt(process.env.RI_ANALYTICS_FLUSH_INTERVAL, 10) || 10000,
    },
    db: {
        database: (0, path_1.join)(homedir, 'redisinsight.db'),
    },
    cloud: {
        cApiUrl: process.env.RI_CLOUD_CAPI_URL || 'https://api.redislabs.com/v1',
    },
};
