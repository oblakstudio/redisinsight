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
exports.CustomTutorialController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const custom_tutorial_service_1 = require("./custom-tutorial.service");
const upload_custom_tutorial_dto_1 = require("./dto/upload.custom-tutorial.dto");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
const nestjs_form_data_1 = require("nestjs-form-data");
const create_ca_certificate_dto_1 = require("../certificate/dto/create.ca-certificate.dto");
const use_ca_certificate_dto_1 = require("../certificate/dto/use.ca-certificate.dto");
const create_client_certificate_dto_1 = require("../certificate/dto/create.client-certificate.dto");
const use_client_certificate_dto_1 = require("../certificate/dto/use.client-certificate.dto");
const create_basic_ssh_options_dto_1 = require("../ssh/dto/create.basic-ssh-options.dto");
const create_cert_ssh_options_dto_1 = require("../ssh/dto/create.cert-ssh-options.dto");
let CustomTutorialController = class CustomTutorialController {
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        return this.service.create(dto);
    }
    async getGlobalManifest() {
        return await this.service.getGlobalManifest();
    }
    async delete(id) {
        return this.service.delete(id);
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, nestjs_form_data_1.FormDataRequest)(),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Create new tutorial',
        statusCode: 201,
        responses: [
            {
                type: Object,
            },
        ],
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_custom_tutorial_dto_1.UploadCustomTutorialDto]),
    __metadata("design:returntype", Promise)
], CustomTutorialController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('manifest'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Get global manifest for custom tutorials',
        statusCode: 200,
        responses: [
            {
                type: Object,
            },
        ],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomTutorialController.prototype, "getGlobalManifest", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 200,
        description: 'Delete custom tutorial and its files',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomTutorialController.prototype, "delete", null);
CustomTutorialController = __decorate([
    (0, swagger_1.ApiExtraModels)(create_ca_certificate_dto_1.CreateCaCertificateDto, use_ca_certificate_dto_1.UseCaCertificateDto, create_client_certificate_dto_1.CreateClientCertificateDto, use_client_certificate_dto_1.UseClientCertificateDto, create_basic_ssh_options_dto_1.CreateBasicSshOptionsDto, create_cert_ssh_options_dto_1.CreateCertSshOptionsDto),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, swagger_1.ApiTags)('Tutorials'),
    (0, common_1.Controller)('/custom-tutorials'),
    __metadata("design:paramtypes", [custom_tutorial_service_1.CustomTutorialService])
], CustomTutorialController);
exports.CustomTutorialController = CustomTutorialController;
