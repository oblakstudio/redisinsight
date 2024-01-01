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
exports.SentinelMasterResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const sentinel_master_1 = require("../models/sentinel-master");
const class_transformer_1 = require("class-transformer");
const hidden_field_decorator_1 = require("../../../common/decorators/hidden-field.decorator");
class SentinelMasterResponse extends (0, swagger_1.OmitType)(sentinel_master_1.SentinelMaster, ['password']) {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The password for your Redis Sentinel master. '
            + 'If your master doesn’t require a password, leave this field empty.',
        type: Boolean,
    }),
    (0, class_transformer_1.Expose)(),
    (0, hidden_field_decorator_1.HiddenField)(true),
    __metadata("design:type", Boolean)
], SentinelMasterResponse.prototype, "password", void 0);
exports.SentinelMasterResponse = SentinelMasterResponse;
