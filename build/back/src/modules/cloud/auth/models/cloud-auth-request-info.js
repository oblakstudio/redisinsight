"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudAuthRequestInfo = void 0;
const swagger_1 = require("@nestjs/swagger");
const cloud_auth_request_1 = require("./cloud-auth-request");
class CloudAuthRequestInfo extends (0, swagger_1.PickType)(cloud_auth_request_1.CloudAuthRequest, [
    'idpType', 'action',
]) {
}
exports.CloudAuthRequestInfo = CloudAuthRequestInfo;
