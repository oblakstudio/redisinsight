"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BrowserHistoryModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const nest_router_1 = require("nest-router");
const browser_history_service_1 = require("./browser-history.service");
const browser_history_controller_1 = require("./browser-history.controller");
const browser_history_provider_1 = require("./providers/browser-history.provider");
let BrowserHistoryModule = BrowserHistoryModule_1 = class BrowserHistoryModule {
    static register({ route }) {
        return {
            module: BrowserHistoryModule_1,
            imports: [
                nest_router_1.RouterModule.forRoutes([{
                        path: route,
                        module: BrowserHistoryModule_1,
                    }]),
            ],
            controllers: [browser_history_controller_1.BrowserHistoryController],
            providers: [browser_history_service_1.BrowserHistoryService, browser_history_provider_1.BrowserHistoryProvider],
            exports: [browser_history_service_1.BrowserHistoryService, browser_history_provider_1.BrowserHistoryProvider],
        };
    }
};
BrowserHistoryModule = BrowserHistoryModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], BrowserHistoryModule);
exports.BrowserHistoryModule = BrowserHistoryModule;
