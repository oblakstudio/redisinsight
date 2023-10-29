"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostingProvider = void 0;
const constants_1 = require("../constants");
const database_entity_1 = require("../modules/database/entities/database.entity");
const getHostingProvider = (host) => {
    if (host === '0.0.0.0' || host === 'localhost') {
        return database_entity_1.HostingProvider.LOCALHOST;
    }
    if (constants_1.IP_ADDRESS_REGEX.test(host) && constants_1.PRIVATE_IP_ADDRESS_REGEX.test(host)) {
        return database_entity_1.HostingProvider.LOCALHOST;
    }
    if (host.endsWith('rlrcp.com') || host.endsWith('redislabs.com')) {
        return database_entity_1.HostingProvider.RE_CLOUD;
    }
    if (host.endsWith('cache.amazonaws.com')) {
        return database_entity_1.HostingProvider.AWS;
    }
    if (host.endsWith('cache.windows.net')) {
        return database_entity_1.HostingProvider.AZURE;
    }
    return database_entity_1.HostingProvider.UNKNOWN;
};
exports.getHostingProvider = getHostingProvider;
