"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ServerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerModule = void 0;
const common_1 = require("@nestjs/common");
const server_controller_1 = require("./server.controller");
const server_service_1 = require("./server.service");
const server_repository_1 = require("./repositories/server.repository");
const local_server_repository_1 = require("./repositories/local.server.repository");
const feature_module_1 = require("../feature/feature.module");
const health_controller_1 = require("./health.controller");
let ServerModule = ServerModule_1 = class ServerModule {
    static register(serverRepository = local_server_repository_1.LocalServerRepository) {
        return {
            module: ServerModule_1,
            controllers: [
                server_controller_1.ServerController,
                health_controller_1.HealthController,
            ],
            providers: [
                server_service_1.ServerService,
                {
                    provide: server_repository_1.ServerRepository,
                    useClass: serverRepository,
                },
            ],
            imports: [feature_module_1.FeatureModule],
            exports: [server_service_1.ServerService],
        };
    }
};
ServerModule = ServerModule_1 = __decorate([
    (0, common_1.Module)({})
], ServerModule);
exports.ServerModule = ServerModule;
