"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CertificateModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateModule = void 0;
const common_1 = require("@nestjs/common");
const ca_certificate_controller_1 = require("./ca-certificate.controller");
const ca_certificate_service_1 = require("./ca-certificate.service");
const client_certificate_service_1 = require("./client-certificate.service");
const ca_certificate_repository_1 = require("./repositories/ca-certificate.repository");
const local_ca_certificate_repository_1 = require("./repositories/local.ca-certificate.repository");
const client_certificate_repository_1 = require("./repositories/client-certificate.repository");
const local_client_certificate_repository_1 = require("./repositories/local.client-certificate.repository");
const client_certificate_controller_1 = require("./client-certificate.controller");
let CertificateModule = CertificateModule_1 = class CertificateModule {
    static register(caCertificateRepository = local_ca_certificate_repository_1.LocalCaCertificateRepository, clientCertificateRepository = local_client_certificate_repository_1.LocalClientCertificateRepository) {
        return {
            module: CertificateModule_1,
            controllers: [
                ca_certificate_controller_1.CaCertificateController,
                client_certificate_controller_1.ClientCertificateController,
            ],
            providers: [
                ca_certificate_service_1.CaCertificateService,
                client_certificate_service_1.ClientCertificateService,
                {
                    provide: ca_certificate_repository_1.CaCertificateRepository,
                    useClass: caCertificateRepository,
                },
                {
                    provide: client_certificate_repository_1.ClientCertificateRepository,
                    useClass: clientCertificateRepository,
                },
            ],
            exports: [
                ca_certificate_service_1.CaCertificateService,
                client_certificate_service_1.ClientCertificateService,
                ca_certificate_repository_1.CaCertificateRepository,
                client_certificate_repository_1.ClientCertificateRepository,
            ],
        };
    }
};
CertificateModule = CertificateModule_1 = __decorate([
    (0, common_1.Module)({})
], CertificateModule);
exports.CertificateModule = CertificateModule;
