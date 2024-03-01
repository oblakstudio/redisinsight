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
exports.CommandExecutionEntity = void 0;
const typeorm_1 = require("typeorm");
const database_entity_1 = require("../../database/entities/database.entity");
const create_command_execution_dto_1 = require("../dto/create-command-execution.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let CommandExecutionEntity = class CommandExecutionEntity {
    constructor(entity) {
        this.mode = create_command_execution_dto_1.RunQueryMode.ASCII;
        this.role = null;
        this.resultsMode = create_command_execution_dto_1.ResultsMode.Default;
        this.nodeOptions = null;
        Object.assign(this, entity);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommandExecutionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommandExecutionEntity.prototype, "databaseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => database_entity_1.DatabaseEntity, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'databaseId' }),
    __metadata("design:type", database_entity_1.DatabaseEntity)
], CommandExecutionEntity.prototype, "database", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommandExecutionEntity.prototype, "command", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommandExecutionEntity.prototype, "mode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    (0, class_transformer_1.Transform)((object) => JSON.stringify(object), { toClassOnly: true }),
    (0, class_transformer_1.Transform)((string) => {
        try {
            return JSON.parse(string);
        }
        catch (e) {
            return undefined;
        }
    }, { toPlainOnly: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommandExecutionEntity.prototype, "result", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommandExecutionEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommandExecutionEntity.prototype, "resultsMode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Transform)((object) => JSON.stringify(object), { toClassOnly: true }),
    (0, class_transformer_1.Transform)((string) => {
        try {
            return JSON.parse(string);
        }
        catch (e) {
            return undefined;
        }
    }, { toPlainOnly: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommandExecutionEntity.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Transform)((object) => JSON.stringify(object), { toClassOnly: true }),
    (0, class_transformer_1.Transform)((string) => {
        try {
            return JSON.parse(string);
        }
        catch (e) {
            return undefined;
        }
    }, { toPlainOnly: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommandExecutionEntity.prototype, "nodeOptions", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CommandExecutionEntity.prototype, "encryption", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CommandExecutionEntity.prototype, "executionTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CommandExecutionEntity.prototype, "db", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, typeorm_1.Index)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CommandExecutionEntity.prototype, "createdAt", void 0);
CommandExecutionEntity = __decorate([
    (0, typeorm_1.Entity)('command_execution'),
    __metadata("design:paramtypes", [Object])
], CommandExecutionEntity);
exports.CommandExecutionEntity = CommandExecutionEntity;
