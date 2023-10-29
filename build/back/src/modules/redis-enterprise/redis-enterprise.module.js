"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisEnterpriseModule = void 0;
const common_1 = require("@nestjs/common");
const redis_enterprise_service_1 = require("./redis-enterprise.service");
const redis_enterprise_analytics_1 = require("./redis-enterprise.analytics");
const cluster_controller_1 = require("./controllers/cluster.controller");
let RedisEnterpriseModule = class RedisEnterpriseModule {
};
RedisEnterpriseModule = __decorate([
    (0, common_1.Module)({
        controllers: [cluster_controller_1.ClusterController],
        providers: [
            redis_enterprise_service_1.RedisEnterpriseService,
            redis_enterprise_analytics_1.RedisEnterpriseAnalytics,
        ],
    })
], RedisEnterpriseModule);
exports.RedisEnterpriseModule = RedisEnterpriseModule;
