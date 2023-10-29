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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const log_file_provider_1 = require("./providers/log-file.provider");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
let ProfilerController = class ProfilerController {
    constructor(logFileProvider) {
        this.logFileProvider = logFileProvider;
    }
    async downloadLogsFile(res, id) {
        const { stream, filename } = await this.logFileProvider.getDownloadData(id);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment;filename="${filename}.txt"`);
        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
        stream
            .on('error', () => res.status(404).send())
            .pipe(res);
    }
};
__decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Endpoint do download profiler log file',
        statusCode: 200,
    }),
    (0, common_1.Get)('/logs/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProfilerController.prototype, "downloadLogsFile", null);
ProfilerController = __decorate([
    (0, swagger_1.ApiTags)('Profiler'),
    (0, common_1.Controller)('profiler'),
    __metadata("design:paramtypes", [log_file_provider_1.LogFileProvider])
], ProfilerController);
exports.ProfilerController = ProfilerController;
