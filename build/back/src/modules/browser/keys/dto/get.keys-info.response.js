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
exports.GetKeyInfoResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../common/decorators");
class GetKeyInfoResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], GetKeyInfoResponse.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], GetKeyInfoResponse.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The remaining time to live of a key.'
            + ' If the property has value of -1, then the key has no expiration time (no limit).',
    }),
    __metadata("design:type", Number)
], GetKeyInfoResponse.prototype, "ttl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of bytes that a key and its value require to be stored in RAM.',
    }),
    __metadata("design:type", Number)
], GetKeyInfoResponse.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: 'The length of the value stored in a key.',
    }),
    __metadata("design:type", Number)
], GetKeyInfoResponse.prototype, "length", void 0);
exports.GetKeyInfoResponse = GetKeyInfoResponse;
