"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudSsoFeatureFlag = exports.CloudSsoFeatureStrategy = void 0;
const server_1 = require("../server/models/server");
const config_1 = require("../../utils/config");
const constants_1 = require("../feature/constants");
const serverConfig = config_1.default.get('server');
var CloudSsoFeatureStrategy;
(function (CloudSsoFeatureStrategy) {
    CloudSsoFeatureStrategy["DeepLink"] = "deepLink";
    CloudSsoFeatureStrategy["Web"] = "web";
})(CloudSsoFeatureStrategy = exports.CloudSsoFeatureStrategy || (exports.CloudSsoFeatureStrategy = {}));
class CloudSsoFeatureFlag {
    static getFeature() {
        if (serverConfig.buildType === server_1.BuildType.Electron) {
            return {
                name: constants_1.KnownFeatures.CloudSso,
                flag: true,
                strategy: CloudSsoFeatureStrategy.DeepLink,
            };
        }
        return {
            name: constants_1.KnownFeatures.CloudSso,
            flag: false,
        };
    }
}
exports.CloudSsoFeatureFlag = CloudSsoFeatureFlag;
