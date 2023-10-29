"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudCapiProvider = void 0;
const axios_1 = require("axios");
const models_1 = require("../../subscription/models");
const config_1 = require("../../../../utils/config");
const cloudConfig = config_1.default.get('cloud');
const serverConfig = config_1.default.get('server');
class CloudCapiProvider {
    constructor() {
        this.api = axios_1.default.create({
            baseURL: cloudConfig.capiUrl,
        });
    }
    static getPrefix(type) {
        return `${type === models_1.CloudSubscriptionType.Fixed ? '/fixed' : ''}`;
    }
    static getHeaders(credentials) {
        return {
            headers: {
                'x-api-key': credentials === null || credentials === void 0 ? void 0 : credentials.capiKey,
                'x-api-secret-key': credentials === null || credentials === void 0 ? void 0 : credentials.capiSecret,
                'User-Agent': `RedisInsight/${serverConfig.version}`,
            },
        };
    }
}
exports.CloudCapiProvider = CloudCapiProvider;
