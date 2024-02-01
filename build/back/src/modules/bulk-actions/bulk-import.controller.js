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
exports.BulkImportController = void 0;
const common_1 = require("@nestjs/common");
const Busboy = require("busboy");
const swagger_1 = require("@nestjs/swagger");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
const bulk_import_service_1 = require("./bulk-import.service");
const decorators_1 = require("../../common/decorators");
const models_1 = require("../../common/models");
const upload_import_file_by_path_dto_1 = require("./dto/upload-import-file-by-path.dto");
let BulkImportController = class BulkImportController {
    constructor(service) {
        this.service = service;
    }
    async import(req, clientMetadata) {
        return new Promise((res, rej) => {
            const busboy = Busboy({ headers: req.headers });
            busboy.on('file', (_fieldName, fileStream) => {
                this.service.import(clientMetadata, fileStream).then(res).catch(rej);
            });
            req.pipe(busboy);
        });
    }
    async uploadFromTutorial(dto, clientMetadata) {
        return this.service.uploadFromTutorial(clientMetadata, dto);
    }
};
__decorate([
    (0, common_1.Post)('import'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.HttpCode)(200),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Import data from file',
        responses: [
            {
                type: Object,
            },
        ],
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, decorators_1.ClientMetadataParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, models_1.ClientMetadata]),
    __metadata("design:returntype", Promise)
], BulkImportController.prototype, "import", null);
__decorate([
    (0, common_1.Post)('import/tutorial-data'),
    (0, common_1.HttpCode)(200),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Import data from tutorial by path',
        responses: [
            {
                type: Object,
            },
        ],
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.ClientMetadataParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_import_file_by_path_dto_1.UploadImportFileByPathDto,
        models_1.ClientMetadata]),
    __metadata("design:returntype", Promise)
], BulkImportController.prototype, "uploadFromTutorial", null);
BulkImportController = __decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, swagger_1.ApiTags)('Bulk Actions'),
    (0, common_1.Controller)('/bulk-actions'),
    __metadata("design:paramtypes", [bulk_import_service_1.BulkImportService])
], BulkImportController);
exports.BulkImportController = BulkImportController;
