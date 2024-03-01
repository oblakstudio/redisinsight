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
exports.CreateCommandExecutionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_command_execution_dto_1 = require("./create-command-execution.dto");
class CreateCommandExecutionsDto {
    constructor() {
        this.mode = create_command_execution_dto_1.RunQueryMode.ASCII;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        isArray: true,
        type: String,
        description: 'Redis commands',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateCommandExecutionsDto.prototype, "commands", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Workbench mode',
        default: create_command_execution_dto_1.RunQueryMode.ASCII,
        enum: create_command_execution_dto_1.RunQueryMode,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(create_command_execution_dto_1.RunQueryMode, {
        message: `mode must be a valid enum value. Valid values: ${Object.values(create_command_execution_dto_1.RunQueryMode)}.`,
    }),
    __metadata("design:type", String)
], CreateCommandExecutionsDto.prototype, "mode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(create_command_execution_dto_1.ResultsMode, {
        message: `resultsMode must be a valid enum value. Valid values: ${Object.values(create_command_execution_dto_1.ResultsMode)}.`,
    }),
    __metadata("design:type", String)
], CreateCommandExecutionsDto.prototype, "resultsMode", void 0);
exports.CreateCommandExecutionsDto = CreateCommandExecutionsDto;
