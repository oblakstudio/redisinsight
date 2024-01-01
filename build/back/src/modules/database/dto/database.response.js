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
exports.DatabaseResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const database_1 = require("../models/database");
const ssh_options_response_1 = require("../../ssh/dto/ssh-options.response");
const sentinel_master_response_dto_1 = require("../../redis-sentinel/dto/sentinel.master.response.dto");
const class_transformer_1 = require("class-transformer");
const hidden_field_decorator_1 = require("../../../common/decorators/hidden-field.decorator");
class DatabaseResponse extends (0, swagger_1.OmitType)(database_1.Database, ['password', 'sshOptions', 'sentinelMaster']) {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The database password flag (true if password was set)',
        type: Boolean,
    }),
    (0, class_transformer_1.Expose)(),
    (0, hidden_field_decorator_1.HiddenField)(true),
    __metadata("design:type", Boolean)
], DatabaseResponse.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Ssh options',
        type: ssh_options_response_1.SshOptionsResponse,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ssh_options_response_1.SshOptionsResponse),
    __metadata("design:type", ssh_options_response_1.SshOptionsResponse)
], DatabaseResponse.prototype, "sshOptions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sentinel master',
        type: sentinel_master_response_dto_1.SentinelMasterResponse,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => sentinel_master_response_dto_1.SentinelMasterResponse),
    __metadata("design:type", sentinel_master_response_dto_1.SentinelMasterResponse)
], DatabaseResponse.prototype, "sentinelMaster", void 0);
exports.DatabaseResponse = DatabaseResponse;
