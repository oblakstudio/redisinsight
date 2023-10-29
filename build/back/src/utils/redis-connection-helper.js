"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionNamespace = exports.getConnectionName = exports.generateRedisConnectionName = void 0;
const lodash_1 = require("lodash");
const constants_1 = require("../constants");
const generateRedisConnectionName = (namespace, id, separator = '-') => {
    try {
        return [constants_1.CONNECTION_NAME_GLOBAL_PREFIX, namespace, id.substr(0, 8)].join(separator).toLowerCase();
    }
    catch (e) {
        return constants_1.CONNECTION_NAME_GLOBAL_PREFIX;
    }
};
exports.generateRedisConnectionName = generateRedisConnectionName;
const getConnectionName = (client) => {
    try {
        if (client.isCluster) {
            return (0, lodash_1.get)(client, 'options.redisOptions.connectionName', constants_1.CONNECTION_NAME_GLOBAL_PREFIX);
        }
        return (0, lodash_1.get)(client, 'options.connectionName', constants_1.CONNECTION_NAME_GLOBAL_PREFIX);
    }
    catch (e) {
        return constants_1.CONNECTION_NAME_GLOBAL_PREFIX;
    }
};
exports.getConnectionName = getConnectionName;
const getConnectionNamespace = (client, separator = '-') => {
    try {
        const connectionName = (0, exports.getConnectionName)(client);
        return connectionName.split(separator)[1] || '';
    }
    catch (e) {
        return '';
    }
};
exports.getConnectionNamespace = getConnectionNamespace;
