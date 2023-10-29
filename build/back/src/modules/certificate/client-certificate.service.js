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
exports.ClientCertificateService = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../constants/error-messages");
const exceptions_1 = require("../encryption/exceptions");
const client_certificate_repository_1 = require("./repositories/client-certificate.repository");
const client_certificate_1 = require("./models/client-certificate");
const utils_1 = require("../../utils");
let ClientCertificateService = class ClientCertificateService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger('ClientCertificateService');
    }
    async get(id) {
        this.logger.log(`Getting client certificate with id: ${id}.`);
        const model = await this.repository.get(id);
        if (!model) {
            this.logger.error(`Unable to find client certificate with id: ${id}`);
            throw new common_1.BadRequestException(error_messages_1.default.INVALID_CERTIFICATE_ID);
        }
        return model;
    }
    async list() {
        this.logger.log('Getting client certificates list.');
        return this.repository.list();
    }
    async create(dto) {
        this.logger.log('Creating client certificate.');
        try {
            return await this.repository.create((0, utils_1.classToClass)(client_certificate_1.ClientCertificate, dto));
        }
        catch (error) {
            this.logger.error('Failed to create client certificate.', error);
            if (error instanceof exceptions_1.EncryptionServiceErrorException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async delete(id) {
        this.logger.log(`Deleting client certificate. id: ${id}`);
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
ClientCertificateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_certificate_repository_1.ClientCertificateRepository])
], ClientCertificateService);
exports.ClientCertificateService = ClientCertificateService;
