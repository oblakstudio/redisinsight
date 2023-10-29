"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaCertificateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const ca_certificate_1 = require("../models/ca-certificate");
class UseCaCertificateDto extends (0, swagger_1.PickType)(ca_certificate_1.CaCertificate, ['id']) {
}
exports.UseCaCertificateDto = UseCaCertificateDto;
