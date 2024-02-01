"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const lodash_1 = require("lodash");
const default_1 = require("../../config/default");
const development_1 = require("../../config/development");
const staging_1 = require("../../config/staging");
const test_1 = require("../../config/test");
const production_1 = require("../../config/production");
const stack_1 = require("../../config/stack");
const config = (0, lodash_1.cloneDeep)(default_1.default);
let envConfig;
switch (process.env.NODE_ENV) {
    case 'staging':
        envConfig = staging_1.default;
        break;
    case 'production':
        envConfig = production_1.default;
        break;
    case 'test':
        envConfig = test_1.default;
        break;
    default:
        envConfig = development_1.default;
        break;
}
let buildTypeConfig;
switch (process.env.RI_BUILD_TYPE) {
    case 'REDIS_STACK':
        buildTypeConfig = stack_1.default;
        break;
    default:
        buildTypeConfig = {};
        break;
}
(0, lodash_1.merge)(config, envConfig, buildTypeConfig);
const get = (key) => key ? config[key] : config;
exports.get = get;
exports.default = {
    get: exports.get,
};
