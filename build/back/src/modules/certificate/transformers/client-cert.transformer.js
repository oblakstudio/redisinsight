"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientCertTransformer = void 0;
const lodash_1 = require("lodash");
const use_client_certificate_dto_1 = require("../dto/use.client-certificate.dto");
const create_client_certificate_dto_1 = require("../dto/create.client-certificate.dto");
const clientCertTransformer = (data) => {
    if ((0, lodash_1.get)(data === null || data === void 0 ? void 0 : data.object, 'clientCert.id')) {
        return use_client_certificate_dto_1.UseClientCertificateDto;
    }
    return create_client_certificate_dto_1.CreateClientCertificateDto;
};
exports.clientCertTransformer = clientCertTransformer;
