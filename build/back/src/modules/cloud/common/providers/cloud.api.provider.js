"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudApiProvider = void 0;
const axios_1 = require("axios");
const config_1 = require("../../../../utils/config");
const serverConfig = config_1.default.get('server');
const cloudConfig = config_1.default.get('cloud');
class CloudApiProvider {
    constructor() {
        this.api = axios_1.default.create({
            baseURL: cloudConfig.apiUrl,
        });
    }
    static generateUtmBody(utm) {
        return {
            utm_source: utm === null || utm === void 0 ? void 0 : utm.source,
            utm_medium: utm === null || utm === void 0 ? void 0 : utm.medium,
            utm_campaign: utm === null || utm === void 0 ? void 0 : utm.campaign,
        };
    }
    static getHeaders(credentials) {
        const headers = {
            'User-Agent': `RedisInsight/${serverConfig.version}`,
            'x-redisinsight-token': cloudConfig.apiToken,
        };
        if (credentials === null || credentials === void 0 ? void 0 : credentials.accessToken) {
            headers['authorization'] = `Bearer ${credentials.accessToken}`;
        }
        if (credentials === null || credentials === void 0 ? void 0 : credentials.apiSessionId) {
            headers['cookie'] = `JSESSIONID=${credentials.apiSessionId}`;
        }
        if (credentials === null || credentials === void 0 ? void 0 : credentials.csrf) {
            headers['x-csrf-token'] = credentials.csrf;
        }
        return {
            headers,
        };
    }
}
exports.CloudApiProvider = CloudApiProvider;
