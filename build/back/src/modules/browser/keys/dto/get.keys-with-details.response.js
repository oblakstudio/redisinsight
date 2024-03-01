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
exports.GetKeysWithDetailsResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const get_keys_info_response_1 = require("./get.keys-info.response");
class GetKeysWithDetailsResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        default: 0,
        description: 'The new cursor to use in the next call.'
            + ' If the property has value of 0, then the iteration is completed.',
    }),
    __metadata("design:type", Number)
], GetKeysWithDetailsResponse.prototype, "cursor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of keys in the currently-selected database.',
    }),
    __metadata("design:type", Number)
], GetKeysWithDetailsResponse.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of keys we tried to scan. Be aware that '
            + 'scanned is sum of COUNT parameters from redis commands',
    }),
    __metadata("design:type", Number)
], GetKeysWithDetailsResponse.prototype, "scanned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => get_keys_info_response_1.GetKeyInfoResponse,
        description: 'Array of Keys.',
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => get_keys_info_response_1.GetKeyInfoResponse),
    __metadata("design:type", Array)
], GetKeysWithDetailsResponse.prototype, "keys", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'Node host. In case when we are working with cluster',
    }),
    __metadata("design:type", String)
], GetKeysWithDetailsResponse.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: 'Node port. In case when we are working with cluster',
    }),
    __metadata("design:type", Number)
], GetKeysWithDetailsResponse.prototype, "port", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: 'The maximum number of results.'
            + ' For RediSearch this number is a value from "FT.CONFIG GET maxsearchresults" command.',
    }),
    __metadata("design:type", Number)
], GetKeysWithDetailsResponse.prototype, "maxResults", void 0);
exports.GetKeysWithDetailsResponse = GetKeysWithDetailsResponse;
