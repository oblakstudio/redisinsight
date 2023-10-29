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
exports.CreateCommandExecutionDto = exports.ResultsMode = exports.RunQueryMode = exports.ClusterNodeRole = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const cli_dto_1 = require("../../cli/dto/cli.dto");
var ClusterNodeRole;
(function (ClusterNodeRole) {
    ClusterNodeRole["All"] = "ALL";
    ClusterNodeRole["Master"] = "MASTER";
    ClusterNodeRole["Slave"] = "SLAVE";
})(ClusterNodeRole = exports.ClusterNodeRole || (exports.ClusterNodeRole = {}));
var RunQueryMode;
(function (RunQueryMode) {
    RunQueryMode["Raw"] = "RAW";
    RunQueryMode["ASCII"] = "ASCII";
})(RunQueryMode = exports.RunQueryMode || (exports.RunQueryMode = {}));
var ResultsMode;
(function (ResultsMode) {
    ResultsMode["Default"] = "DEFAULT";
    ResultsMode["GroupMode"] = "GROUP_MODE";
    ResultsMode["Silent"] = "SILENT";
})(ResultsMode = exports.ResultsMode || (exports.ResultsMode = {}));
class CreateCommandExecutionDto {
    constructor() {
        this.mode = RunQueryMode.ASCII;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Redis command',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCommandExecutionDto.prototype, "command", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Workbench mode',
        default: RunQueryMode.ASCII,
        enum: RunQueryMode,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(RunQueryMode, {
        message: `mode must be a valid enum value. Valid values: ${Object.values(RunQueryMode)}.`,
    }),
    __metadata("design:type", String)
], CreateCommandExecutionDto.prototype, "mode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Workbench group mode',
        default: ResultsMode.Default,
        enum: ResultsMode,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ResultsMode, {
        message: `resultsMode must be a valid enum value. Valid values: ${Object.values(ResultsMode)}.`,
    }),
    __metadata("design:type", String)
], CreateCommandExecutionDto.prototype, "resultsMode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Execute command for nodes with defined role',
        default: ClusterNodeRole.All,
        enum: ClusterNodeRole,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ClusterNodeRole, {
        message: `role must be a valid enum value. Valid values: ${Object.values(ClusterNodeRole)}.`,
    }),
    __metadata("design:type", String)
], CreateCommandExecutionDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Should be provided if only one node needs to execute the command.',
        type: cli_dto_1.ClusterSingleNodeOptions,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(() => cli_dto_1.ClusterSingleNodeOptions),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", cli_dto_1.ClusterSingleNodeOptions)
], CreateCommandExecutionDto.prototype, "nodeOptions", void 0);
exports.CreateCommandExecutionDto = CreateCommandExecutionDto;
