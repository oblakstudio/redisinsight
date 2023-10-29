"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caCertTransformer = void 0;
const lodash_1 = require("lodash");
const use_ca_certificate_dto_1 = require("../dto/use.ca-certificate.dto");
const create_ca_certificate_dto_1 = require("../dto/create.ca-certificate.dto");
const caCertTransformer = (data) => {
    if ((0, lodash_1.get)(data === null || data === void 0 ? void 0 : data.object, 'caCert.id')) {
        return use_ca_certificate_dto_1.UseCaCertificateDto;
    }
    return create_ca_certificate_dto_1.CreateCaCertificateDto;
};
exports.caCertTransformer = caCertTransformer;
