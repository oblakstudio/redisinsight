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
exports.PluginState = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class PluginState {
    constructor(partial = {}) {
        Object.assign(this, partial);
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Plugin visualization id. Should be unique per all plugins',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PluginState.prototype, "visualizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Command Execution id',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PluginState.prototype, "commandExecutionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'any',
        description: 'Stored state',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], PluginState.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of creation',
        type: Date,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], PluginState.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of updating',
        type: Date,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], PluginState.prototype, "updatedAt", void 0);
exports.PluginState = PluginState;
