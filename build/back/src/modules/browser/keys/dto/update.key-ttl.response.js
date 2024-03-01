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
exports.KeyTtlResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../../constants");
class KeyTtlResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The remaining time to live of a key that has a timeout. '
            + 'If value equals -2 then the key does not exist or has deleted. '
            + 'If value equals -1 then the key has no associated expire (No limit).',
        maximum: constants_1.MAX_TTL_NUMBER,
    }),
    __metadata("design:type", Number)
], KeyTtlResponse.prototype, "ttl", void 0);
exports.KeyTtlResponse = KeyTtlResponse;
