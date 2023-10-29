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
var CertificateImportService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateImportService = void 0;
const common_1 = require("@nestjs/common");
const ca_certificate_1 = require("../certificate/models/ca-certificate");
const typeorm_1 = require("@nestjs/typeorm");
const ca_certificate_entity_1 = require("../certificate/entities/ca-certificate.entity");
const typeorm_2 = require("typeorm");
const encryption_service_1 = require("../encryption/encryption.service");
const model_encryptor_1 = require("../encryption/model.encryptor");
const client_certificate_1 = require("../certificate/models/client-certificate");
const client_certificate_entity_1 = require("../certificate/entities/client-certificate.entity");
const utils_1 = require("../../utils");
const utils_2 = require("../../common/utils");
const exceptions_1 = require("./exceptions");
let CertificateImportService = CertificateImportService_1 = class CertificateImportService {
    constructor(caCertRepository, clientCertRepository, encryptionService) {
        this.caCertRepository = caCertRepository;
        this.clientCertRepository = clientCertRepository;
        this.encryptionService = encryptionService;
        this.caCertEncryptor = new model_encryptor_1.ModelEncryptor(encryptionService, ['certificate']);
        this.clientCertEncryptor = new model_encryptor_1.ModelEncryptor(encryptionService, ['certificate', 'key']);
    }
    async processCaCertificate(cert) {
        let toImport = {
            certificate: null,
            name: cert.name,
        };
        if ((0, utils_2.isValidPemCertificate)(cert.certificate)) {
            toImport.certificate = cert.certificate;
        }
        else {
            try {
                toImport.certificate = (0, utils_2.getPemBodyFromFileSync)(cert.certificate);
                toImport.name = (0, utils_2.getCertNameFromFilename)(cert.certificate);
            }
            catch (e) {
                toImport = null;
            }
        }
        if (!(toImport === null || toImport === void 0 ? void 0 : toImport.certificate) || !(0, utils_2.isValidPemCertificate)(toImport.certificate)) {
            throw new exceptions_1.InvalidCaCertificateBodyException();
        }
        if (!(toImport === null || toImport === void 0 ? void 0 : toImport.name)) {
            throw new exceptions_1.InvalidCertificateNameException();
        }
        return this.prepareCaCertificateForImport(toImport);
    }
    async prepareCaCertificateForImport(cert) {
        const encryptedModel = await this.caCertEncryptor.encryptEntity(cert);
        const existing = await this.caCertRepository.createQueryBuilder('c')
            .select('c.id')
            .where({ certificate: cert.certificate })
            .orWhere({ certificate: encryptedModel.certificate })
            .getOne();
        if (existing) {
            return existing;
        }
        const name = await CertificateImportService_1.determineAvailableName(cert.name, this.caCertRepository);
        return (0, utils_1.classToClass)(ca_certificate_1.CaCertificate, {
            ...cert,
            name,
        });
    }
    async processClientCertificate(cert) {
        const toImport = {
            certificate: null,
            key: null,
            name: cert.name,
        };
        if ((0, utils_2.isValidPemCertificate)(cert.certificate)) {
            toImport.certificate = cert.certificate;
        }
        else {
            try {
                toImport.certificate = (0, utils_2.getPemBodyFromFileSync)(cert.certificate);
                toImport.name = (0, utils_2.getCertNameFromFilename)(cert.certificate);
            }
            catch (e) {
                toImport.certificate = null;
                toImport.name = null;
            }
        }
        if ((0, utils_2.isValidPemPrivateKey)(cert.key)) {
            toImport.key = cert.key;
        }
        else {
            try {
                toImport.key = (0, utils_2.getPemBodyFromFileSync)(cert.key);
            }
            catch (e) {
                toImport.key = null;
            }
        }
        if (!(toImport === null || toImport === void 0 ? void 0 : toImport.certificate) || !(0, utils_2.isValidPemCertificate)(toImport.certificate)) {
            throw new exceptions_1.InvalidClientCertificateBodyException();
        }
        if (!(toImport === null || toImport === void 0 ? void 0 : toImport.key) || !(0, utils_2.isValidPemPrivateKey)(toImport.key)) {
            throw new exceptions_1.InvalidClientPrivateKeyException();
        }
        if (!(toImport === null || toImport === void 0 ? void 0 : toImport.name)) {
            throw new exceptions_1.InvalidCertificateNameException();
        }
        return this.prepareClientCertificateForImport(toImport);
    }
    async prepareClientCertificateForImport(cert) {
        const encryptedModel = await this.clientCertEncryptor.encryptEntity(cert);
        const existing = await this.clientCertRepository.createQueryBuilder('c')
            .select('c.id')
            .where({
            certificate: cert.certificate,
            key: cert.key,
        })
            .orWhere({
            certificate: encryptedModel.certificate,
            key: encryptedModel.key,
        })
            .getOne();
        if (existing) {
            return existing;
        }
        const name = await CertificateImportService_1.determineAvailableName(cert.name, this.clientCertRepository);
        return (0, utils_1.classToClass)(client_certificate_1.ClientCertificate, {
            ...cert,
            name,
        });
    }
    static async determineAvailableName(originalName, repository) {
        let index = 0;
        while (true) {
            let name = originalName;
            if (index) {
                name = `${index}_${name}`;
            }
            if (!await repository
                .createQueryBuilder('c')
                .where({ name })
                .select(['c.id'])
                .getOne()) {
                return name;
            }
            index += 1;
        }
    }
};
CertificateImportService = CertificateImportService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ca_certificate_entity_1.CaCertificateEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(client_certificate_entity_1.ClientCertificateEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        encryption_service_1.EncryptionService])
], CertificateImportService);
exports.CertificateImportService = CertificateImportService;
