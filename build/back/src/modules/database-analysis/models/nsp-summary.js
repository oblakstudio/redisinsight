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
exports.NspSummary = void 0;
const nsp_type_summary_1 = require("./nsp-type-summary");
const class_transformer_1 = require("class-transformer");
const decorators_1 = require("../../../common/decorators");
const swagger_1 = require("@nestjs/swagger");
class NspSummary {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Namespace',
        type: String,
        example: 'device',
    }),
    (0, decorators_1.RedisStringType)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], NspSummary.prototype, "nsp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total memory used by namespace in bytes',
        type: Number,
        example: 10000000,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], NspSummary.prototype, "memory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total keys inside namespace',
        type: Number,
        example: 10000,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], NspSummary.prototype, "keys", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Top namespaces by keys number',
        isArray: true,
        type: () => nsp_type_summary_1.NspTypeSummary,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => nsp_type_summary_1.NspTypeSummary),
    __metadata("design:type", Array)
], NspSummary.prototype, "types", void 0);
exports.NspSummary = NspSummary;
