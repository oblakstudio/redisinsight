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
exports.CaCertificateService = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../constants/error-messages");
const exceptions_1 = require("../encryption/exceptions");
const ca_certificate_repository_1 = require("./repositories/ca-certificate.repository");
const ca_certificate_1 = require("./models/ca-certificate");
const utils_1 = require("../../utils");
let CaCertificateService = class CaCertificateService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger('CaCertificateService');
    }
    async get(id) {
        this.logger.log(`Getting CA certificate with id: ${id}.`);
        const model = await this.repository.get(id);
        if (!model) {
            this.logger.error(`Unable to find CA certificate with id: ${id}`);
            throw new common_1.BadRequestException(error_messages_1.default.INVALID_CERTIFICATE_ID);
        }
        return model;
    }
    async list() {
        this.logger.log('Getting CA certificate list.');
        return this.repository.list();
    }
    async create(dto) {
        this.logger.log('Creating certificate.');
        try {
            return await this.repository.create((0, utils_1.classToClass)(ca_certificate_1.CaCertificate, dto));
        }
        catch (error) {
            this.logger.error('Failed to create certificate.', error);
            if (error instanceof exceptions_1.EncryptionServiceErrorException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async delete(id) {
        this.logger.log(`Deleting certificate. id: ${id}`);
        try {
            await this.repository.delete(id);
        }
        catch (error) {
            this.logger.error(`Failed to delete certificate ${id}`, error);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException();
        }
    }
};
CaCertificateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ca_certificate_repository_1.CaCertificateRepository])
], CaCertificateService);
exports.CaCertificateService = CaCertificateService;
