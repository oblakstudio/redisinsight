"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseClientCertificateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_certificate_1 = require("../models/client-certificate");
class UseClientCertificateDto extends (0, swagger_1.PickType)(client_certificate_1.ClientCertificate, ['id']) {
}
exports.UseClientCertificateDto = UseClientCertificateDto;
