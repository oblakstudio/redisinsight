"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCloudDatabasesCapiResponse = exports.findReplicasForDatabase = exports.parseCloudDatabaseCapiResponse = exports.convertRECloudModuleName = void 0;
const lodash_1 = require("lodash");
const class_transformer_1 = require("class-transformer");
const models_1 = require("../models");
const constants_1 = require("../../../../constants");
function convertRECloudModuleName(name) {
    var _a;
    return (_a = constants_1.RE_CLOUD_MODULES_NAMES[name]) !== null && _a !== void 0 ? _a : name;
}
exports.convertRECloudModuleName = convertRECloudModuleName;
const parseCloudDatabaseCapiResponse = (database, subscriptionId, subscriptionType, free) => {
    const { databaseId, name, publicEndpoint, status, security, planMemoryLimit, memoryLimitMeasurementUnit, } = database;
    return (0, class_transformer_1.plainToClass)(models_1.CloudDatabase, {
        subscriptionId,
        subscriptionType,
        databaseId,
        name,
        publicEndpoint,
        status,
        password: security === null || security === void 0 ? void 0 : security.password,
        sslClientAuthentication: security.sslClientAuthentication,
        modules: database.modules
            .map((module) => convertRECloudModuleName(module.name)),
        options: {
            enabledDataPersistence: database.dataPersistence !== models_1.CloudDatabasePersistencePolicy.None,
            persistencePolicy: database.dataPersistence,
            enabledRedisFlash: database.memoryStorage === models_1.CloudDatabaseMemoryStorage.RamAndFlash,
            enabledReplication: database.replication,
            enabledBackup: !!database.periodicBackupPath,
            enabledClustering: database.clustering.numberOfShards > 1,
            isReplicaDestination: !!database.replicaOf,
        },
        cloudDetails: {
            cloudId: databaseId,
            subscriptionType,
            planMemoryLimit,
            memoryLimitMeasurementUnit,
            free,
        },
    }, { groups: ['security'] });
};
exports.parseCloudDatabaseCapiResponse = parseCloudDatabaseCapiResponse;
const findReplicasForDatabase = (databases, sourceDatabaseId) => {
    const sourceDatabase = (0, lodash_1.find)(databases, {
        databaseId: sourceDatabaseId,
    });
    if (!sourceDatabase) {
        return [];
    }
    return databases.filter((replica) => {
        const endpoints = (0, lodash_1.get)(replica, ['replicaOf', 'endpoints']);
        if (replica.databaseId === sourceDatabaseId
            || !endpoints
            || !endpoints.length) {
            return false;
        }
        return endpoints.some((endpoint) => (endpoint.includes(sourceDatabase.publicEndpoint)
            || endpoint.includes(sourceDatabase.privateEndpoint)));
    });
};
exports.findReplicasForDatabase = findReplicasForDatabase;
const parseCloudDatabasesCapiResponse = (response, subscriptionType, free) => {
    const subscription = (0, lodash_1.isArray)(response.subscription) ? response.subscription[0] : response.subscription;
    const { subscriptionId, databases } = subscription;
    let result = [];
    databases.forEach((database) => {
        if ([models_1.CloudDatabaseProtocol.Redis, models_1.CloudDatabaseProtocol.Stack].includes(database.protocol)) {
            result.push((0, exports.parseCloudDatabaseCapiResponse)(database, subscriptionId, subscriptionType, free));
        }
    });
    result = result.map((database) => ({
        ...database,
        subscriptionType,
        options: {
            ...database.options,
            isReplicaSource: !!(0, exports.findReplicasForDatabase)(databases, database.databaseId).length,
        },
    }));
    return result;
};
exports.parseCloudDatabasesCapiResponse = parseCloudDatabasesCapiResponse;
