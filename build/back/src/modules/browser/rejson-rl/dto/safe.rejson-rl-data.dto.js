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
exports.SafeRejsonRlDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
var RejsonRlDataType;
(function (RejsonRlDataType) {
    RejsonRlDataType["String"] = "string";
    RejsonRlDataType["Number"] = "number";
    RejsonRlDataType["Integer"] = "integer";
    RejsonRlDataType["Boolean"] = "boolean";
    RejsonRlDataType["Null"] = "null";
    RejsonRlDataType["Array"] = "array";
    RejsonRlDataType["Object"] = "object";
})(RejsonRlDataType || (RejsonRlDataType = {}));
class SafeRejsonRlDataDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Key inside json data',
    }),
    __metadata("design:type", String)
], SafeRejsonRlDataDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Path of the json field',
    }),
    __metadata("design:type", String)
], SafeRejsonRlDataDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: 'Number of properties/elements inside field (for object and arrays only)',
    }),
    __metadata("design:type", Number)
], SafeRejsonRlDataDto.prototype, "cardinality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: RejsonRlDataType,
        description: 'Type of the field',
    }),
    __metadata("design:type", String)
], SafeRejsonRlDataDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'Any value',
    }),
    __metadata("design:type", Object)
], SafeRejsonRlDataDto.prototype, "value", void 0);
exports.SafeRejsonRlDataDto = SafeRejsonRlDataDto;
