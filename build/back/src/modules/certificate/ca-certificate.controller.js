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
exports.CaCertificateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ca_certificate_1 = require("./models/ca-certificate");
const ca_certificate_service_1 = require("./ca-certificate.service");
let CaCertificateController = class CaCertificateController {
    constructor(service) {
        this.service = service;
    }
    async list() {
        return await this.service.list();
    }
    async delete(id) {
        await this.service.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ description: 'Get Ca Certificate list' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Ca Certificate list',
        isArray: true,
        type: ca_certificate_1.CaCertificate,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CaCertificateController.prototype, "list", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ description: 'Delete Ca Certificate by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CaCertificateController.prototype, "delete", null);
CaCertificateController = __decorate([
    (0, swagger_1.ApiTags)('TLS Certificates'),
    (0, common_1.Controller)('certificates/ca'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [ca_certificate_service_1.CaCertificateService])
], CaCertificateController);
exports.CaCertificateController = CaCertificateController;
