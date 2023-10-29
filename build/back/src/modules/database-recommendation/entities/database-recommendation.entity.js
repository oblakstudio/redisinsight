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
exports.DatabaseRecommendationEntity = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const decorators_1 = require("../../../common/decorators");
const database_entity_1 = require("../../database/entities/database.entity");
let DatabaseRecommendationEntity = class DatabaseRecommendationEntity {
    constructor(entity) {
        this.read = false;
        this.disabled = false;
        this.hide = false;
        Object.assign(this, entity);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatabaseRecommendationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, typeorm_1.Index)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatabaseRecommendationEntity.prototype, "databaseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => database_entity_1.DatabaseEntity, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'databaseId' }),
    __metadata("design:type", database_entity_1.DatabaseEntity)
], DatabaseRecommendationEntity.prototype, "database", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], DatabaseRecommendationEntity.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], DatabaseRecommendationEntity.prototype, "read", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], DatabaseRecommendationEntity.prototype, "disabled", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], DatabaseRecommendationEntity.prototype, "vote", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], DatabaseRecommendationEntity.prototype, "hide", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, typeorm_1.Index)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], DatabaseRecommendationEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'blob' }),
    (0, decorators_1.DataAsJsonString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatabaseRecommendationEntity.prototype, "params", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DatabaseRecommendationEntity.prototype, "encryption", void 0);
DatabaseRecommendationEntity = __decorate([
    (0, typeorm_1.Entity)('database_recommendations'),
    (0, typeorm_1.Unique)(['databaseId', 'name']),
    __metadata("design:paramtypes", [Object])
], DatabaseRecommendationEntity);
exports.DatabaseRecommendationEntity = DatabaseRecommendationEntity;
