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
exports.SshOptionsResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const ssh_options_1 = require("../models/ssh-options");
const class_transformer_1 = require("class-transformer");
const hidden_field_decorator_1 = require("../../../common/decorators/hidden-field.decorator");
class SshOptionsResponse extends (0, swagger_1.OmitType)(ssh_options_1.SshOptions, ['password', 'passphrase', 'privateKey']) {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The SSH password flag (true if password was set)',
        type: Boolean,
    }),
    (0, class_transformer_1.Expose)(),
    (0, hidden_field_decorator_1.HiddenField)(true),
    __metadata("design:type", Boolean)
], SshOptionsResponse.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The SSH passphrase flag (true if password was set)',
        type: Boolean,
    }),
    (0, class_transformer_1.Expose)(),
    (0, hidden_field_decorator_1.HiddenField)(true),
    __metadata("design:type", Boolean)
], SshOptionsResponse.prototype, "passphrase", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The SSH private key',
        type: Boolean,
    }),
    (0, class_transformer_1.Expose)(),
    (0, hidden_field_decorator_1.HiddenField)(true),
    __metadata("design:type", Boolean)
], SshOptionsResponse.prototype, "privateKey", void 0);
exports.SshOptionsResponse = SshOptionsResponse;
