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
exports.FeaturesConfigEntity = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const decorators_1 = require("../../../common/decorators");
let FeaturesConfigEntity = class FeaturesConfigEntity {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FeaturesConfigEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'float' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], FeaturesConfigEntity.prototype, "controlNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, class_transformer_1.Expose)(),
    (0, decorators_1.DataAsJsonString)(),
    __metadata("design:type", String)
], FeaturesConfigEntity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], FeaturesConfigEntity.prototype, "updatedAt", void 0);
FeaturesConfigEntity = __decorate([
    (0, typeorm_1.Entity)('features_config')
], FeaturesConfigEntity);
exports.FeaturesConfigEntity = FeaturesConfigEntity;
