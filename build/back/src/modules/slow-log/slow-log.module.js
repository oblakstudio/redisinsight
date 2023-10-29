"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlowLogModule = void 0;
const common_1 = require("@nestjs/common");
const slow_log_controller_1 = require("./slow-log.controller");
const slow_log_service_1 = require("./slow-log.service");
const slow_log_analytics_service_1 = require("./slow-log-analytics.service");
let SlowLogModule = class SlowLogModule {
};
SlowLogModule = __decorate([
    (0, common_1.Module)({
        providers: [slow_log_service_1.SlowLogService, slow_log_analytics_service_1.SlowLogAnalyticsService],
        controllers: [slow_log_controller_1.SlowLogController],
    })
], SlowLogModule);
exports.SlowLogModule = SlowLogModule;
