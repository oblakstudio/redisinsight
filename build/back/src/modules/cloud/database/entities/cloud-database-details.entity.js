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
exports.CloudDatabaseDetailsEntity = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const database_entity_1 = require("../../../database/entities/database.entity");
let CloudDatabaseDetailsEntity = class CloudDatabaseDetailsEntity {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CloudDatabaseDetailsEntity.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CloudDatabaseDetailsEntity.prototype, "cloudId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], CloudDatabaseDetailsEntity.prototype, "subscriptionType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], CloudDatabaseDetailsEntity.prototype, "planMemoryLimit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], CloudDatabaseDetailsEntity.prototype, "memoryLimitMeasurementUnit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], CloudDatabaseDetailsEntity.prototype, "free", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => database_entity_1.DatabaseEntity, (database) => database.cloudDetails, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", database_entity_1.DatabaseEntity)
], CloudDatabaseDetailsEntity.prototype, "database", void 0);
CloudDatabaseDetailsEntity = __decorate([
    (0, typeorm_1.Entity)('database_cloud_details')
], CloudDatabaseDetailsEntity);
exports.CloudDatabaseDetailsEntity = CloudDatabaseDetailsEntity;
