"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudSubscriptionApiService = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../common/utils");
const cloud_capi_key_service_1 = require("../capi-key/cloud-capi-key.service");
const feature_service_1 = require("../../feature/feature.service");
const constants_1 = require("../../feature/constants");
const cloud_subscription_capi_service_1 = require("./cloud-subscription.capi.service");
const models_1 = require("./models");
const cloud_session_service_1 = require("../session/cloud-session.service");
const utils_2 = require("./utils");
const cloud_subscription_api_provider_1 = require("./providers/cloud-subscription.api.provider");
let CloudSubscriptionApiService = class CloudSubscriptionApiService {
    constructor(api, sessionService, cloudCapiKeyService, cloudSubscriptionCapiService, featureService) {
        this.api = api;
        this.sessionService = sessionService;
        this.cloudCapiKeyService = cloudCapiKeyService;
        this.cloudSubscriptionCapiService = cloudSubscriptionCapiService;
        this.featureService = featureService;
        this.logger = new common_1.Logger('CloudSubscriptionApiService');
    }
    async getSubscriptionPlans(sessionMetadata, utm) {
        try {
            const [fixedPlans, regions] = await Promise.all([
                this.cloudSubscriptionCapiService.getSubscriptionsPlans(await this.cloudCapiKeyService.getCapiCredentials(sessionMetadata, utm), models_1.CloudSubscriptionType.Fixed),
                this.getCloudRegions(await this.sessionService.getSession(sessionMetadata.sessionId)),
            ]);
            const cloudSsoFeature = await this.featureService.getByName(constants_1.KnownFeatures.CloudSso);
            const freePlans = (0, lodash_1.filter)(fixedPlans, (plan) => {
                var _a, _b, _c;
                if (plan.price !== 0) {
                    return false;
                }
                if (!((_b = (_a = cloudSsoFeature === null || cloudSsoFeature === void 0 ? void 0 : cloudSsoFeature.data) === null || _a === void 0 ? void 0 : _a.filterFreePlan) === null || _b === void 0 ? void 0 : _b.length)) {
                    return true;
                }
                return !!(((_c = cloudSsoFeature === null || cloudSsoFeature === void 0 ? void 0 : cloudSsoFeature.data) === null || _c === void 0 ? void 0 : _c.filterFreePlan).find((f) => f.expression
                    && (new RegExp(f.expression, f.options)).test(plan[f === null || f === void 0 ? void 0 : f.field])));
            });
            return freePlans.map((plan) => ({
                ...plan,
                details: (0, lodash_1.find)(regions, { regionId: plan.regionId }),
            }));
        }
        catch (e) {
            throw (0, utils_1.wrapHttpError)(await this.cloudCapiKeyService.handleCapiKeyUnauthorizedError(e, sessionMetadata));
        }
    }
    async getCloudRegions(credentials) {
        this.logger.log('Getting cloud regions.');
        try {
            const regions = await this.api.getCloudRegions(credentials);
            this.logger.log('Succeed to get cloud regions');
            return (0, utils_2.parseCloudSubscriptionsCloudRegionsApiResponse)(regions);
        }
        catch (error) {
            throw (0, utils_1.wrapHttpError)(error);
        }
    }
};
CloudSubscriptionApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloud_subscription_api_provider_1.CloudSubscriptionApiProvider,
        cloud_session_service_1.CloudSessionService,
        cloud_capi_key_service_1.CloudCapiKeyService,
        cloud_subscription_capi_service_1.CloudSubscriptionCapiService,
        feature_service_1.FeatureService])
], CloudSubscriptionApiService);
exports.CloudSubscriptionApiService = CloudSubscriptionApiService;
