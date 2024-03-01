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
exports.CommandExecution = exports.ResultsSummary = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const command_execution_result_1 = require("./command-execution-result");
const create_command_execution_dto_1 = require("../dto/create-command-execution.dto");
const class_transformer_1 = require("class-transformer");
class ResultsSummary {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of commands executed',
        type: Number,
    }),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], ResultsSummary.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of successful commands executed',
        type: Number,
    }),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], ResultsSummary.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of failed commands executed',
        type: Number,
    }),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], ResultsSummary.prototype, "fail", void 0);
exports.ResultsSummary = ResultsSummary;
class CommandExecution {
    constructor(partial = {}) {
        this.mode = create_command_execution_dto_1.RunQueryMode.ASCII;
        this.resultsMode = create_command_execution_dto_1.ResultsMode.Default;
        Object.assign(this, partial);
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Command execution id',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommandExecution.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database id',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommandExecution.prototype, "databaseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Redis command executed',
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommandExecution.prototype, "command", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Workbench mode',
        default: create_command_execution_dto_1.RunQueryMode.ASCII,
        enum: create_command_execution_dto_1.RunQueryMode,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommandExecution.prototype, "mode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Workbench result mode',
        default: create_command_execution_dto_1.ResultsMode.Default,
        enum: create_command_execution_dto_1.ResultsMode,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommandExecution.prototype, "resultsMode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Workbench executions summary',
        type: () => ResultsSummary,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", ResultsSummary)
], CommandExecution.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Command execution result',
        type: () => command_execution_result_1.CommandExecutionResult,
        isArray: true,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], CommandExecution.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Result did not stored in db',
        type: Boolean,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], CommandExecution.prototype, "isNotStored", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of command execution',
        type: Date,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CommandExecution.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Workbench command execution time',
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CommandExecution.prototype, "executionTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Logical database number.',
        type: Number,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CommandExecution.prototype, "db", void 0);
exports.CommandExecution = CommandExecution;
