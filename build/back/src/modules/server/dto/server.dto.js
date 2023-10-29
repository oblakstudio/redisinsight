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
exports.GetServerInfoResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class GetServerInfoResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Server identifier.',
        type: String,
    }),
    __metadata("design:type", String)
], GetServerInfoResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Time of the first server launch.',
        type: String,
        format: 'date-time',
        example: '2021-01-06T12:44:39.000Z',
    }),
    __metadata("design:type", String)
], GetServerInfoResponse.prototype, "createDateTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Version of the application.',
        type: String,
        example: '2.0.0',
    }),
    __metadata("design:type", String)
], GetServerInfoResponse.prototype, "appVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The operating system platform.',
        type: String,
        example: 'linux',
    }),
    __metadata("design:type", String)
], GetServerInfoResponse.prototype, "osPlatform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Application build type.',
        type: String,
        example: 'ELECTRON',
    }),
    __metadata("design:type", String)
], GetServerInfoResponse.prototype, "buildType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fixed Redis database id.',
        type: String,
    }),
    __metadata("design:type", String)
], GetServerInfoResponse.prototype, "fixedDatabaseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of available encryption strategies',
        type: [String],
        example: ['PLAIN', 'KEYTAR'],
    }),
    __metadata("design:type", Array)
], GetServerInfoResponse.prototype, "encryptionStrategies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Server session id.',
        type: Number,
    }),
    __metadata("design:type", Number)
], GetServerInfoResponse.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Control number for A/B testing',
        type: Number,
    }),
    __metadata("design:type", Number)
], GetServerInfoResponse.prototype, "controlNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Control group (bucket)',
        type: String,
    }),
    __metadata("design:type", String)
], GetServerInfoResponse.prototype, "controlGroup", void 0);
exports.GetServerInfoResponse = GetServerInfoResponse;
