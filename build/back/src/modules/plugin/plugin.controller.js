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
exports.PluginController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const plugin_service_1 = require("./plugin.service");
const plugin_response_1 = require("./plugin.response");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
let PluginController = class PluginController {
    constructor(pluginService) {
        this.pluginService = pluginService;
    }
    async getAll() {
        return this.pluginService.getAll();
    }
};
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 200,
        description: 'Get list of available plugins',
        responses: [
            {
                status: 200,
                type: plugin_response_1.PluginsResponse,
            },
        ],
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PluginController.prototype, "getAll", null);
PluginController = __decorate([
    (0, swagger_1.ApiTags)('Plugins'),
    (0, common_1.Controller)('/plugins'),
    __metadata("design:paramtypes", [plugin_service_1.PluginService])
], PluginController);
exports.PluginController = PluginController;
